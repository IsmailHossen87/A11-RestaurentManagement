import React, { useEffect, useState } from "react";
import PageTittle from "../Components/PageTittle";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Bounce, Fade, Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
import { FaTag, FaMapMarkerAlt, FaDollarSign, FaBoxes, FaChartBar, FaShoppingCart } from "react-icons/fa";


const AllFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllFoods();
  }, [search]);

  const getAllFoods = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allFoods?search=${search}`
      );
      setAllFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  return (
    <>
      <PageTittle title="All Foods" />
      <div className="p-6 bg-gray-800 text-white">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Resturent || All Foods</title>
        </Helmet>

        {/* Search Start */}
        <div className="md:w-3/5 mx-auto my-4">
          <form>
            <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-400 transition duration-200">
              <input
                className="w-full py-2 px-4 bg-transparent text-white placeholder-gray-400 outline-none rounded-lg focus:ring-2 focus:ring-yellow-500"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Search for foods..."
                aria-label="Search for foods"
              />
            </div>
          </form>
        </div>
        {/* Search End */}
        {allFoods.length === 0 ? (
          <div className="text-center">
            {" "}
            <span className="loading loading-bars  loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allFoods.map((allfood) => (
              <Zoom>
                <div
                  key={allfood._id}
                  className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={allfood.image}
                    alt={allfood.foodName}
                    className="w-full h-32 object-cover rounded-t-lg mb-4"
                  />
                  <Bounce direction="bottom " delay={300}>
                    {" "}
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                      {allfood.foodName}
                    </h2>
                  </Bounce>
                  <p className="mt-1 flex items-center">
                    <FaTag className="mr-2 text-yellow-200" /> Category:{" "}
                    <span className="text-yellow-200">
                      {allfood.foodCategory}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-yellow-200" /> Origin:{" "}
                    <span className="text-yellow-200">
                      {allfood.foodOrigin}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center">
                    <FaDollarSign className="mr-2 text-yellow-200" /> Price:{" "}
                    <span className="text-yellow-200">${allfood.price}</span>
                  </p>
                  <p className="mt-1 flex items-center">
                    <FaBoxes className="mr-2 text-yellow-200" /> Quantity:{" "}
                    <span className="text-yellow-200">{allfood.quantity}</span>
                  </p>
                  <p className="mt-1 flex items-center">
                    <FaChartBar className="mr-2 text-yellow-200" /> Sold
                    Quantity:{" "}
                    <span className="text-yellow-200">{allfood.purchase}</span>
                  </p>
                  <p className="mt-1 flex items-center">
                    <FaShoppingCart className="mr-2 text-yellow-200" />{" "}
                    Purchased:{" "}
                    <span className="text-yellow-200">
                      {allfood.soldQuantity}
                    </span>
                  </p>

                  {/* delete and update  */}
                  <div>
                    <div className="mt-4 text-right">
                      <NavLink to={`/details/${allfood._id}`}>
                        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                          View Details
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Zoom>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllFoods;
