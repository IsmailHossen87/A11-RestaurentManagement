import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PageTittle from "../Components/PageTittle";
import { Helmet } from "react-helmet";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images
  const images = [
    { src: "https://i.ibb.co.com/Lg32Fks/istockphoto-159248709-612x612.webp", title: "Burger" },
    { src: "https://i.ibb.co.com/L9WgqB6/istockphoto-2179542684-1024x1024.jpg", title: "Pizza" },
    { src: "https://i.ibb.co.com/6nKpg3x/istockphoto-623524610-612x612.webp", title: "Fruit Smoothies" },
    { src: "https://i.ibb.co.com/S0G9PTB/istockphoto-2096477812-612x612.webp", title: "Chiken" },
    { src: "https://i.ibb.co.com/xmWJ7h8/istockphoto-1144823591-1024x1024.jpg", title: "Spaghetti with Basil Sauce" },
    { src: "https://i.ibb.co.com/ctZqLrk/istockphoto-1906293569-612x612.webp", title: "Noodlse" },
    { src: "https://i.ibb.co.com/KGvKkxF/istockphoto-1473452859-612x612.webp", title: "Burger" },
    { src: "https://i.ibb.co.com/zrwnP9v/photo-1601924287811-e34de5d17476.jpg", title: "Fruit Smoothies (Green and Purple)" },
    { src: "https://i.ibb.co.com/8BZQHpk/photo-1534308983496-4fabb1a015ee.jpg", title: "Pepperoni Pizza" },
    { src: "https://i.ibb.co.com/NSknnzp/premium-photo-1695239201630-283170b42c69.jpg.jpg", title: "French Toast with Butter" },
    { src: "https://i.ibb.co.com/MNnrn1r/premium-photo-1664478272084-532c1bfebd25.jpg", title: "BBQ Ribs with Fries" },
    { src: "https://i.ibb.co.com/0283Szq/istockphoto-184938052-612x612.webp", title: " Caesar Salad" },
  ];

  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Resturent || Gallery</title>
      </Helmet>
      <PageTittle title="Gallery"></PageTittle>
      <div className="grid grid-cols-2 md:grid-cols-3 mx-2 text-center gap-3 md:gap-5 my-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group"
            onClick={() => {
              setCurrentIndex(index);
              setOpen(true);
            }}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.title}
              className="w-full md:h-72 h-28 rounded cursor-pointer shadow-md hover:shadow-lg transition transform group-hover:scale-105"
            />
            {/* Title Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition transform group-hover:scale-105">
              <p className="text-white text-lg w-3/4 mx-auto font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((image) => ({ src: image.src }))}
          currentIndex={currentIndex}
          on={{
            viewChange: (newIndex) => setCurrentIndex(newIndex),
          }}
        />
      )}
    </div>
  );
};

export default Gallery;
