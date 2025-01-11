import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Components/Home";
import AllFoods from "../Pages/AllFoods";
import AddFood from "../Components/AddFood";
import PrivateRoute from "../Context/PrivateRoute/PrivateRoute";
import Gallery from "../Pages/Gallery";
import MyFood from "../Components/MyFood";
import Update from "../Pages/Update";
import Details from "../Components/Details";
import Purchase from "../Pages/Purchase";
import MyOrder from "../Components/MyOrder";
import Error from "../Components/Error";

const Routes =createBrowserRouter([
    {
        path:'/',
        element:<MainLayOut></MainLayOut>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/allFoods',
                element:<AllFoods></AllFoods>
            },
            {
                path:'/gallery',
                element:<Gallery></Gallery>
            },
            {
                path:'/update/:id',
                element:<Update></Update>
            },
            {
                path:'/details/:id',
                element:<Details></Details>
            },
            {
                path:'/addFood',
                element:<PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path:'/purchase/:id',
                element:<PrivateRoute><Purchase></Purchase></PrivateRoute>
            },
            {
                path:'/myFoods',
                element:<PrivateRoute><MyFood></MyFood></PrivateRoute>
            },
            {
                path:'/myOrders',
                element:<PrivateRoute><MyOrder></MyOrder></PrivateRoute>
            },
            
        
        ]
    }
])

export default Routes;