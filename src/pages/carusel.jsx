import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  const slides = [
    {
      "link": "https://uzum.uz/pepsi",
      "image": "https://images.uzum.uz/cm5fhf1s99ouqbfosb4g/main_page_banner.jpg",
      "alt": "Акции, подборки товаров и новости Uzum"
    },
    {
      "link": "https://uzum.uz/ru/category/smartfony-12690",
      "image": "https://images.uzum.uz/cm56qt1s99ouqbfoq3g0/main_page_banner.jpg",
      "alt": "Акции, подборки товаров и новости Uzum"
    },
    // Add more objects for each slide
  ]
  

  return (
    <Slider {...settings} className="z-0 mx-auto max-w-7xl px-3 mt-4 overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div key={index} className="relative max-h-md">
          <a href={slide.link} className="block w-full h-full">
            <img
              src={slide.image}
              alt={slide.alt}
              className="object-cover w-full h-full rounded-lg"
            />
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
