import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
import {
  FaMapMarkerAlt,
  FaShoppingCart,
  FaChartBar,
  FaUtensils,
  FaTag,
} from "react-icons/fa";

const CardsHome = () => {
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    getTopFoods();
  }, []);

  const getTopFoods = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allFoods`
      );
      const sortedFoods = response.data
        .filter((food) => food.purchase > 0)
        .sort((a, b) => b.purchase - a.purchase)
        .slice(0, 6); // Take top 6 items
      setTopFoods(sortedFoods);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  return (
    <>
      <div className="p-4 md:p-0">
        <h1 className="text-3xl text-center font-bold my-4">Top 6 Foods</h1>
        {topFoods.length === 0 ? (
          <div className="text-center">
            {" "}
            <span className="loading loading-bars  loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topFoods.map((food, index) => (
              <Zoom>
                <div
                  key={index}
                  className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300"
                >
                  {/* Food Image */}
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                  />

                  {/* Food Name with Icon */}
                  <h2 className="mt-1 flex items-center text-xl font-semibold text-yellow-400">
                    <FaUtensils className="mr-2 text-yellow-400" />{" "}
                    {food.foodName}
                  </h2>
                  <p className="mt-1 flex  items-center">
                    <FaTag className="mr-2 text-yellow-200" /> Category:{" "}
                    <span className="text-yellow-200">{food.foodCategory}</span>
                  </p>

                  {/* Origin with Icon */}
                  <p className="mt-1 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-xl text-yellow-200" />{" "}
                    Origin:{" "}
                    <span className="text-yellow-200">{food.foodOrigin}</span>
                  </p>

                  {/* Purchase with Icon */}
                  <p className="mt-1 flex items-center">
                    <FaChartBar className="mr-2 text-xl text-yellow-200" />{" "}
                    Sold
                    Quantity:{" "}
                    <span className="text-yellow-200">{food.purchase}</span>
                  </p>
                  
                  {/* Sold Quantity with Icon */}
                  <p className="mt-1 flex items-center">
                    <FaShoppingCart className="mr-2 text-xl text-yellow-200" />Purchase:{" "}
                    <span className="text-yellow-200"> {food.soldQuantity}</span>
                  </p>


                  {/* View Details Button */}
                  <div className="mt-4 text-right">
                    <NavLink to={`/details/${food._id}`}>
                      <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                        View Details
                      </button>
                    </NavLink>
                  </div>
                </div>
              </Zoom>
            ))}
          </div>
        )}
        <div className="text-end">
          <button className=" my-6 mt-3 py-3 px-6 bg-[rgb(246,140,60)] text-white font-semibold rounded-lg shadow-md hover:bg-brow transition duration-300 ease-in-out">
            <NavLink to="/allFoods" className="block w-full h-full text-center">
              All Foods
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardsHome;
