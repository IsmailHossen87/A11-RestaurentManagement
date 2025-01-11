import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const CardReview = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    getAllReview();
  }, []);

  const getAllReview = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/review`);
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="mb-5">
      {/* Heading */}
      <div className="my-6 text-center px-5 mx-auto">
        <h3 className="text-3xl font-bold my-2">What Our Foodies Say</h3>
        <p>Stories from happy cooks and culinary enthusiasts</p>
      </div>

      {/* Card Marquee */}
      <div className="gap-7">
        <Marquee pauseOnHover={true} speed={200}>
          {review?.map((data, index) => (
            <div
              key={index}
              className="md:w-80 w-72 bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300 mx-5"
            >
              {/* Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 mx-auto">
                <img
                  src={data.image}
                  alt="Review"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h2 className="mt-3 text-2xl font-bold text-center text-yellow-400">
                {data.name}
              </h2>

              {/* Title */}
              <p className="mt-1 text-center font-semibold">
                <span className="text-white">{data.title}</span>
              </p>

              {/* Review */}
              <p className="my-3 text-center">
                <span className="text-white">{data.foodReview}</span>
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default CardReview;
