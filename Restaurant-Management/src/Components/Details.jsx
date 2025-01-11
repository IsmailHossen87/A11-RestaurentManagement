import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";

const Details = () => {
  const {user}= useContext(AuthContext)
  const [details, setDetails] = useState();
  const [isdisable,setDisable] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    if(id){
      Details();
    }

  }, [id]);
  const Details = async () => {
    try{
     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/details/${id}`)
      setDetails(data)
      if(parseInt(data.quantity) === 0){
        Swal.fire("Not avaiable")
        setDisable(true)
      } else if (data.seller === user.email) {
        Swal.fire(`${data.sellerName || ''} you cannot purchase your own listed food item`)
        setDisable(true);
      }
    }catch(error){
      console.log(error)
    }
  };
  const {foodName,image,foodCategory,quantity,price,foodOrigin,description,
    purchase,_id,soldQuantity} = details || ""


  return (
    <div className="w-full max-w-xl mx-auto my-10 border border-gray-300 shadow-xl rounded-lg overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row p-6">
        {/* Image Section */}
        <div className="flex-none md:w-90 md:h-90  mb-5 lg:mb-0 lg:w-1/3">
          <img 
            src={image}
            alt={foodName}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="flex-grow lg:ml-6">
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">{foodName}</h1>
          <p className="text-lg text-orange-500 font-semibold mb-2">{foodCategory}</p>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="mt-5 space-y-2">
            <p className="text-lg font-semibold text-gray-700">Price: <span className="text-xl text-orange-600">${price}</span></p>
            <p className="text-sm text-gray-500">Origin: {foodOrigin}</p>
            <p className="text-sm text-gray-500">Available Quantity: {quantity}</p>
            <p className="text-sm text-gray-500">Sold Quantiry: {purchase}</p> 
            <p className="text-sm text-gray-500">Purchase: {soldQuantity}</p> 
          </div>

          {/* Purchase Button */}
          <div className="mt-6">
            <NavLink to={`/purchase/${_id}`}>
            <button 
            disabled={isdisable}
              className="w-full bg-orange-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Purchase Now
            </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
