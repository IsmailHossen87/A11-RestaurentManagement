import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import { Fade, Zoom } from "react-awesome-reveal";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import axios from "axios";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setFoods] = useState([]);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      getMyFoods();
    }
  }, [user]);

  const getMyFoods = async () => {
    try {
      const response = await axiosInstance.get(`/foodsSeller/${user?.email}`);
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };
  // delete
  const handleDelete =(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
        setFoods((food)=> food.filter((server)=> server._id !== id))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className="p-6  ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Resturent || My Food</title>
      </Helmet>
      {myFoods.length === 0 ? (
        ""
      ) : (
        <h1 className="text-3xl font-semibold  mb-4">
          My Fods ({myFoods.length})
        </h1>
      )}
      {myFoods.length === 0 ? (
        <div className="text-center flex justify-center items-center h-64">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500">
            <h2 className="text-xl font-semibold text-yellow-400">
              Not Found
            </h2>
            <p className="mt-2 text-yellow-200">
            I see you haven't added any items. Please add them.
            </p>
            <Link to={"/addFood"}>
              {" "}
              <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                Add Food
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myFoods.map((myfood) => (
            <Zoom>
              <Fade>
                <div
                  key={myfood._id}
                  className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={myfood.image}
                    alt={myfood.foodName}
                    className="w-full h-32 object-cover rounded-t-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-yellow-400">
                    {myfood.foodName}
                  </h2>
                  <p className="mt-2">
                    Category:{" "}
                    <span className="text-yellow-200">
                      {myfood.foodCategory}
                    </span>
                  </p>
                  <p className="mt-1">
                    Origin:{" "}
                    <span className="text-yellow-200">{myfood.foodOrigin}</span>
                  </p>
                  <p className="mt-1">
                    Price:{" "}
                    <span className="text-yellow-200">${myfood.price}</span>
                  </p>
                  <p className="mt-1">
                    Quantity:{" "}
                    <span className="text-yellow-200">{myfood.quantity}</span>
                  </p>
                  <p className="mt-1">
                    Purchase:{" "}
                    <span className="text-yellow-200">
                      {myfood.soldQuantity}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <div className="mt-4 text-right">
                      <NavLink>
                        <button onClick={()=>handleDelete((myfood._id))} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                          delete
                        </button>
                      </NavLink>
                    </div>
                    <div className="mt-4 text-right">
                      <NavLink to={`/update/${myfood._id}`}>
                        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                          Update
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Fade>
            </Zoom>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFood;
