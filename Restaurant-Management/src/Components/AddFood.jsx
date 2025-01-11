import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider/AuthProvier";
import bgImage from '../assets/addItem.jpg';
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet";

const AddFood = () => {
  const axiosInstance = useAxiosSecure()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const foodName = form.foodName.value;
    const image = form.foodImage.value;
    const foodCategory = form.foodCategory.value;
    const quantity = parseInt(form.quantity.value);
    const price = form.price.value;
    const foodOrigin = form.foodOrigin.value;
    const description = form.description.value;
    const seller = user.email;
    const sellerName = user.displayName
    const purchase = 0
    const totalData = { foodName, image, foodCategory, quantity, price, foodOrigin, description, seller,sellerName ,purchase};
    try {
      axiosInstance.post(`/send`, totalData);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Added Data",
        showConfirmButton: false,
        timer: 1500
      });
      form.reset()
      navigate('/myFoods')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-gray-900 py-10 flex items-center justify-center min-h-screen"
    >
      <Helmet>
      <meta charSet="utf-8" />
      <title>Resturent || Add Food</title>
      </Helmet>
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md border border-yellow-400 rounded-xl px-8 pt-6 pb-8 w-full max-w-lg shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">Add Food Item</h2>
        <form onSubmit={handleSubmit}>
          {/* Food Name */}
          <div className="mb-4">
            <label className="block text-yellow-200 text-sm font-bold mb-2" htmlFor="foodName">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
