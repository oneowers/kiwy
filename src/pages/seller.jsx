import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';


import Filters from '../components/ecommerce/components/category-filters/with_inline_actions_and_expandable_sidebar_filters.jsx';
import HeaderSeller from '../components/application-ui/headings/page-headings/with_banner_image.jsx';
import Cards1 from '../components/ecommerce/components/product-lists/with_border_grid.jsx'
import Footer from '../components/marketing/sections/footers/4_column_with_company_mission.jsx';
import HeaderCategories from '../components/ecommerce/components/store-navigation/with_simple_menu_and_promo.jsx'
import Header from './header/index.jsx'
import Products from './products.jsx'

function HomePage() {
    const { id: sellerId } = useParams();
    const [seller, setSeller] = useState(null);
    const [products, setProducts] = useState(null);

  useEffect(() => {
    // Define the API URL with the productId
    const apiUrl = `http://wauu.uz/api/seller/${sellerId}/`;

    // Fetch the data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeller(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [sellerId]);


  useEffect(() => {
    // Define the API URL with the productId
    const apiUrl = `http://wauu.uz/api/products/?seller=${sellerId}`;

    // Fetch the data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  



  return (
    <>
    
    <Header />
        <HeaderSeller seller={seller}/>
        <Products products={products} />
      <Footer/>

    </>
  );
}

export default HomePage;
