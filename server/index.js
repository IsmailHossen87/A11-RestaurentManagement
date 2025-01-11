const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


app.use(cors({
  origin:['http://localhost:5174',
          'https://restaurent-management-61037.web.app',
          'https://restaurent-management-61037.firebaseapp.com'
        ],
  credentials:true
  }
))
app.use(cookieParser())
app.use(express.json())
const verifyToken = (req,res,next)=>{
  const token = req?.cookies?.Token
  if(!token){
    return res.status(401).send({message:'UnAuthorize1'})
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err){
      return res.status(401).send({message:'UnAuthorize2'})
    }
    req.user= decoded
    next()
  })
}
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hg2ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )

    const MainCollection = client.db('FoodCollection');
    const dataCollection = MainCollection.collection('seller')
    const buyerCollection = MainCollection.collection('buyer')
    const reviewCollection =MainCollection.collection('review')

    // Token Genarate 
    app.post('/jote',async(req,res)=>{
      const user = req.body
      const token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'1hr'})
      res
      .cookie('Token',token,{
        httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3600*1000,
      } )
      .send({sucess:true})
    })
    app.post('/logout',(req,res)=>{
      res.clearCookie('Token',{
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({sucess:true})
    })

    // data post 
    app.post('/send',async(req,res)=>{
      const data = req.body
      data.soldQuantity = 0
      const result = await dataCollection.insertOne(data)
      res.send(result)
    })

   app.get('/allFoods', async (req, res) => {
  const { search } = req.query; 
  const option = {};
  if (search) {
    option.foodName = { $regex: search, $options: 'i' }; 
  }
    const result = await dataCollection.find(option).toArray();
    res.send(result);
});
// -------------------------------------------verifyToken
        // add post data
        app.get('/foodsSeller/:email',verifyToken, async(req,res)=>{
          const email = req.params.email;
          if(req.user.email !== req.params.email){
            return res.status(403).send({message:'Forbidden Access'})
          }
          const query = {seller:email}
          const result = await dataCollection.find(query).toArray()
          res.send(result)
        })
        // ----------------------------------------verifyToken
        // my Order
        app.get('/order/:email',verifyToken,async(req,res)=>{
          const email = req.params.email 
          if(req.user.email !== req.params.email){
            return res.status(403).send({message:'Forbidden Access'})
          }
          const query = {Buyeremail:email }
          const result =await buyerCollection.find(query).toArray()
          res.send(result)
        })
        

        app.get('/details/:id',async(req,res)=>{
          const id = req.params.id
          const query = {_id: new ObjectId(id)}
          const result = await dataCollection.findOne(query)
          res.send(result)
        })

        app.get('/purchase/:id',verifyToken,async(req,res)=>{
          const id = req.params.id
          const query = {_id: new ObjectId(id)}
          const result = await dataCollection.findOne(query)
          res.send(result)
        })
        app.get('/update/:id',async(req,res)=>{
          const id = req.params.id
          const query = {_id: new ObjectId(id)}
          const result = await dataCollection.findOne(query)
          res.send(result)
        })
        app.put('/update-food/:id',async(req,res)=>{
          const id = req.params.id
          const update = req.body
          const query = {_id:new ObjectId(id)}
          const finallyUpdate ={
            $set:update
          }
          const result = await dataCollection.updateOne(query,finallyUpdate)
          res.send(result)
        })
        // buyer data post
        app.post('/buyer',async(req,res) =>{
          const data = req.body
          const filter = {_id:new ObjectId(data.sellerId)}
          const update={
            $inc:{
              purchase: data.foodquantity, 
              quantity: -data.foodquantity,
              soldQuantity:1
            } 
          }
          const updateCollection= await dataCollection.updateOne(filter,update)
          const result = await buyerCollection.insertOne(data)
          res.send(result)
        })
        
        // buyer post data delete
        app.delete('/delete/:id',async(req,res)=>{
          const id = req.params.id
          const filter = {_id:new ObjectId(id)}
          const result = await dataCollection.deleteOne(filter)
          res.send(result)
        })
        // DELETE: Remove order by ID
        app.delete('/order/:id', async (req, res) => {
          try {
            const { id } = req.params; // Get the order ID from the URL
            const result = await buyerCollection.deleteOne({ _id: new ObjectId(id) });
           if (result.deletedCount === 0) {
             return res.status(404).send({ message: 'Order not found' });
           }
            res.status(200).send({ message: 'Order deleted successfully' });
          } catch (error) {
            console.error('Error deleting order:', error);
           res.status(500).send({ message: 'Server error' });
          }});

          app.get('/review',async(req,res)=>{
            const data = req.body
            const result = await reviewCollection.find().toArray()
            res.send(result)
          })
          
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
 res.send("server is run")
})

app.listen(port, () => console.log(`Server running on port ${port}`))
