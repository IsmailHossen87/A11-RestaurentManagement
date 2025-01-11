
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BgImage from "../assets/happy.jpeg";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Purchase = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const axiosInstance = useAxiosSecure()
  const [foods, setFoods] = useState(null);

  useEffect(() => {
    if(id){
      Details();
    }

  }, [id]);

  const Details = async () => {
    try {
      const { data } = await axiosInstance.get(`/purchase/${id}`);
      setFoods(data);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    const foodquantity = parseInt(e.target.quantity.value, 10);

    // Validate that the quantity is a valid number and within the available limit
    if (isNaN(foodquantity) || foodquantity <= 0) {
      Swal.fire("Error", "Please enter a valid quantity.", "error");
      return;
    }

    if (foodquantity > 20 || foodquantity > foods.quantity) {
      Swal.fire(
        "Error",
        `You cannot purchase more than the available quantity (${foods.quantity}).`,
        "error"
      );
      return;
    }

    const Buyeremail = user.email;
    const BuyerName = user.displayName;
    const BuyerData = {foodquantity,BuyerName,Buyeremail,startDate, seller: foods.seller,image: foods.image,foodCategory: foods.foodCategory,price: foods.price,foodName: foods.foodName,sellerId:foods._id
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/buyer`, BuyerData);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully purchased!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/myOrders");
    } catch (error) {
      console.error("Error during purchase:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const { quantity, foodName, price } = foods || {};


  return (
   <div>
    <Helmet>
    <meta charSet="utf-8" />
    <title> Resturent || Purchase</title>
    </Helmet>
     <div
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex justify-center items-center min-h-[calc(100vh-306px)] py-4 md:py-11"
    >
      <section className="p-6 mx-auto bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-md shadow-lg w-4/5 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Purchase Item
        </h2>

        {quantity === 0 ? (
          <div className="text-red-500 font-bold text-center">
            This item is not available for purchase.
          </div>
        ) : (
          <form onSubmit={handlePurchase}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {/* Food Name */}
              <div>
                <label className="text-yellow-200 font-semibold" htmlFor="food_name">
                  Food Name
                </label>
                <input
                  id="food_name"
                  defaultValue={foodName}
                  name="foodName"
                  readOnly
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-yellow-200 bg-gray-700 bg-opacity-50 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-opacity-40"
                />
              </div>
               {/* Price */}
               <div>

                <label className="text-yellow-200 font-semibold" htmlFor="price">
                  Price ($)
                </label>
                <input
                  id="price"
                  defaultValue={price}
                  readOnly
                  name="price"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-yellow-200 bg-gray-700 bg-opacity-50 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-opacity-40"
                />
              </div>
               {/* Buyer Name */}
               <div>
                <label className="text-yellow-200 font-semibold" htmlFor="food_name">
                  Buyer Name
                </label>
                <input
                  defaultValue={user.displayName}
                  name="BUYERnAme"
                  readOnly
                  type="TEXT"
                  className="block w-full px-4 py-2 mt-2 text-yellow-200 bg-gray-700 bg-opacity-50 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-opacity-40"
                />
              </div>
              {/* Buyer email */}
              <div>
                <label className="text-yellow-200 font-semibold" htmlFor="food_name">
                  Buyer Email
                </label>
                <input
                  defaultValue={user.email}
                  name="buyerEmail"
                  readOnly
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-yellow-200 bg-gray-700 bg-opacity-50 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-opacity-40"
                />
              </div>
        
              {/* Deadline */}
              <div className="flex flex-col gap-2">
                <label className="text-yellow-200 font-semibold">Deadline</label>
                <input
                  type="text"
                  value={new Date().toLocaleString()} // Show current time
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 bg-opacity-50 border border-yellow-400 rounded-md text-yellow-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-opacity-40"
                />
              </div>

              {/* Quantity */}
             <div>
                <label className="text-yellow-200 font-semibold" htmlFor="quantity">
                 Sold Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  defaultValue={0}
                  max={quantity}
                  placeholder={`Enter quantity (Max: ${quantity})`}
                  className="block w-full px-4 py-2 mt-2 text-yellow-200 bg-gray-700 bg-opacity-50 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:ring-opacity-40"
                />
              </div>
            </div>

           <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={quantity === 0}
                className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Purchase
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
   </div>
  );
};

export default Purchase;
