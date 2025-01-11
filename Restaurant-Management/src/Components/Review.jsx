import React from "react";
import { Bounce, Fade, Hinge, Roll } from "react-awesome-reveal";

const Review = () => {
  const customerReviews = [
    {
      id: 1,
      name: "John Doe",
      review: "The food was delicious and the service was fantastic!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Loved the ambiance and the variety of dishes offered.",
      rating: 4,
    },
    {
      id: 3,
      name: "Alex Brown",
      review: "Good food, but delivery took longer than expected.",
      rating: 3,
    },
    // New reviews
    {
      id: 4,
      name: "Emily Johnson",
      review: "The pizza was amazing! Will definitely order again.",
      rating: 5,
    },
    {
      id: 5,
      name: "Michael Lee",
      review: "Nice place, but the food was a bit too salty for my taste.",
      rating: 3,
    },
    {
      id: 6,
      name: "Sophia Davis",
      review: "Great experience, friendly staff, and fast service.",
      rating: 4,
    },
];

  return (
    <div className="  p-4 md:p-0">
              <h1 className="text-4xl text-center font-bold my-8">Review</h1>
      {/* Customer Reviews Section */}
      <section className="mb-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerReviews.map((review) => (
           <Fade fraction={0.6} delay={200}>
             <div
              key={review.id}
              className="bg-gray-900 p-6 rounded-lg shadow-md border border-yellow-500"
            >
              <h3 className="text-xl font-semibold text-yellow-400">
                {review.name}
              </h3>
              <p className="mt-2 text-yellow-200">"{review.review}"</p>
           <Bounce>  <p className="mt-4">Rating: {"⭐".repeat(review.rating)}</p></Bounce>
            </div>
           </Fade>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Review;
