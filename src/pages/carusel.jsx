import React, { useState, useEffect} from 'react'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import caruselImage1 from'./car1.jpg';
import caruselImage2 from'./car2.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const [slides, setSlides] = useState(null);
  
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL + '/api/banners/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSlides(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, []);
  

  return (
    <Slider {...settings} className="z-0 mx-auto max-w-7xl lg:px-4 mt-3 overflow-hidden rounded-lg">
      {slides?.map((slide, index) => (
        <div key={index} className="relative max-h-md">
          <a href={slide.link} className="block w-full h-full">
            <img
              src={slide.image}
              alt={slide.name}
              className="object-cover w-full h-full rounded-lg"
            />
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
