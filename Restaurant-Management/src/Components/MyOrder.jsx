import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import { Zoom } from "react-awesome-reveal";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure();
  const [purchase, setPurchase] = useState([]);

  // Fetch user's orders when user email is available
  useEffect(() => {
    if (user?.email) {
      getMyFoods();
    }
  }, [user]);

  // Fetch orders for the logged-in user
  const getMyFoods = async () => {
    try {
      const response = await axiosInstance.get(`/order/${user?.email}`);
      setPurchase(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Delete order function with SweetAlert confirmation
  const deleteOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make DELETE request to backend to delete the order
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/order/${orderId}`
          );

          // Remove the deleted order from local state
          setPurchase((prev) => prev.filter((order) => order._id !== orderId));
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting your order.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Resturent || My Order</title>
      </Helmet>
      {purchase.length === 0 ? (
        ""
      ) : (
        <h1 className="text-3xl font-semibold  mb-4">
          My Orders ({purchase.length})
        </h1>
      )}
      {purchase.length === 0 ? (
        <div className="text-center flex justify-center items-center h-64">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500">
            <h2 className="text-xl font-semibold text-yellow-400">
              No Purchases Found
            </h2>
            <p className="mt-2 text-yellow-200">
              It looks like you haven't purchased anything yet. Start exploring
              and make your first order!
            </p>
            <Link to={"/allFoods"}>
              {" "}
              <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                Browse Foods
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {purchase.map((order) => (
            <Zoom>
              <div
                key={order._id}
                className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={order.image}
                  alt={order.foodName}
                  className="w-full h-32 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-yellow-400">
                  {order.foodName}
                </h2>
                <p className="mt-2">
                  Sold Quantity:{" "}
                  <span className="text-yellow-200">{order.foodquantity}</span>
                </p>
              <div>
                <div></div>
                <div></div>
              </div>

                <p className="mt-1">
                  Price: <span className="text-yellow-200">${order.price}</span>
                </p>
                <p className="mt-1">
                  Bought on:{" "}
                  <span className="text-yellow-200">
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}
                  </span>
                </p>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </Zoom>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
