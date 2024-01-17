import { Routes, Route, useNavigate } from 'react-router-dom';
import React, {Fragment, useState, useEffect} from 'react'
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CategoryTabs from './categoryTabs.jsx'
import Products from './products.jsx'



import Filters from '../components/ecommerce/components/category-filters/with_inline_actions_and_expandable_sidebar_filters.jsx';
import Cards from './Cards.jsx';
import Footer from '../components/marketing/sections/footers/4_column_with_company_mission.jsx';
import Header from './header/index.jsx'

export default function HomePage() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subCategories, setCategories] = useState(null);
  const [tabs, setTabs] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);
  const rawData = searchParams.get('data');
  const decodedData = JSON.parse(decodeURIComponent(rawData));

  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/categories/`;

      fetch(apiUrl)
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Сетевая ошибка');
              }
              return response.json();
          })
          .then((data) => {
              setCategories(data);
          })
          .catch((error) => {
              console.error('!!! Ошибка', error);
          });
  }, []);

  useEffect(() => {
      if (subCategories) {
          const categoryTabs = subCategories.map((category) => ({
              id: category.id,
              name: category.name,
              onClick: () => handleCategoryClick(category.id),
              current: category.id === currentCategoryId,
          }));
          setTabs(categoryTabs);
      }
  }, [subCategories, currentCategoryId]);

  
  // Updated handleCategoryClick
  const handleCategoryClick = (categoryId) => {
      const category_id = categoryId != null ? categoryId : ''; // If categoryId is null, use an empty string
      navigate(`/products?data=${encodeURIComponent(JSON.stringify({ category_id }))}`);
      fetchProducts(categoryId);
      setCurrentCategoryId(categoryId);
  };

// Updated fetchProducts
const fetchProducts = (categoryId) => {
const apiUrl = categoryId
  ? `${process.env.REACT_APP_API_BASE_URL}/api/products/?category_id=${categoryId}`
  : process.env.REACT_APP_API_BASE_URL + '/api/products/';

fetch(apiUrl)
  .then((response) => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then((data) => {
      setProducts(data.results);
      setLoading(false);
  })
  .catch((error) => {
      console.error('Error fetching product:', error);
      setLoading(false);
  });
};


  useEffect(() => {
    const apiUrl = decodedData != null
    ? 
      decodedData.category_id ? `${process.env.REACT_APP_API_BASE_URL}/api/products/?category_id=${decodedData.category_id}`
      : `${process.env.REACT_APP_API_BASE_URL}/api/products/?category_id=${decodedData.parent_category_id}`
        : process.env.REACT_APP_API_BASE_URL + '/api/products/';
  
  
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setProducts(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching product:', error);
            setLoading(false);
        });
  }, [window.location.search]);
  return (
    <>
    
    <Header />
    <Routes>
        <Route element={<Filters />} >
          <Route index element={[
            <CategoryTabs decodedData={decodedData} tabs={tabs}/>,
            <Products products={products} />]
          }/>
        </Route >
    </Routes>
    <Footer />

    </>
  );
}
