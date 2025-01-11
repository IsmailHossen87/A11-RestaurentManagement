import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bgImage from '../assets/addItem.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';

const Update = () => {
  const { id } = useParams(); // Get ID from the route
  const navigate = useNavigate(); // Navigation hook
  const [updateDATA, setUpdate] = useState(null); // State for the data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the current data for the food item
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/update/${id}`);
        setUpdate(data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch the data. Please try again.",
        });
        setLoading(false); // Stop loading even if there's an error
      }
    };
    getData();
  }, [id]);
  const {foodName,image,foodCategory,quantity,price,foodOrigin,description,} = updateDATA || {};

  // Handle the update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const foodName = form.foodName.value;
    const image = form.foodImage.value;
    const foodCategory = form.foodCategory.value;
    const quantity = parseInt(form.quantity.value);
    const price = form.price.value;
    const foodOrigin = form.foodOrigin.value;
    const description = form.description.value;

    const totalData = { foodName, image, foodCategory, quantity, price, foodOrigin, description };

    try {
      // Use PUT request to update the data
      await axios.put(`${import.meta.env.VITE_API_URL}/update-food/${id}`, totalData);
      setUpdate()
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Updated Data",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/myFoods'); // Redirect to 'myFoods' page after successful update
    } 
    catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update data. Please try again.",
      });
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-yellow-400 text-2xl">Loading...</p>
      </div>
    );
  }


  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-gray-900 py-10 flex items-center justify-center min-h-screen"
    >
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md border border-yellow-400 rounded-xl px-8 pt-6 pb-8 w-full max-w-lg shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Update Food Item
        </h2>
        <form onSubmit={handleUpdate}>
          {/* Food Name */}
          <div className="mb-4">
            <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="foodName">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              defaultValue={foodName}
              placeholder="Enter food name"
              className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Food Image */}
          <div className="mb-4">
            <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="foodImage">
              Food Image URL
            </label>
            <input
              type="text"
              name="foodImage"
              defaultValue={image}
              placeholder="Enter image URL"
              className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Food Category */}
          <div className="mb-4">
            <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="foodCategory">
              Food Category
            </label>
            <input
              type="text"
              name="foodCategory"
              defaultValue={foodCategory}
              placeholder="e.g., Starter, Dessert"
              className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="flex gap-2 justify-between">
            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={quantity}
                min="0"
                className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            {/* Price */}
            <div className="mb-4">
              <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="price">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                min="0"
                className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>
          {/* Food Origin */}
          <div className="mb-4">
            <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="foodOrigin">
              Food Origin (Country)
            </label>
            <input
              type="text"
              name="foodOrigin"
              defaultValue={foodOrigin}
              placeholder="e.g., Italy, India"
              className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="description">
              Short Description
            </label>
            <textarea
              name="description"
              defaultValue={description}
              placeholder="Enter ingredients, making procedure, etc."
              className="bg-gray-700 bg-opacity-50 backdrop-blur-md border border-yellow-400 rounded w-full py-2 px-3 text-yellow-200 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Add Item Button */}
          <div className="text-end">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;