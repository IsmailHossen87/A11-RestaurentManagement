import React from 'react';
import Image from '../assets/imageTittle.webp'

const PageTittle = ({title}) => {
    return (
        <div
            className="hero h-[220px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${Image})`
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-white">
                  {title}
                </h1>
                {/* <p className="mb-5 text-white">
                 {slide.sort}
                </p> */}
              </div>
            </div>
          </div>
    );
};

export default PageTittle;