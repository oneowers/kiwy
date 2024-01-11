import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Products from './products.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
  }

function HomePage({category_id}) {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    const apiUrl = 'https://wauu.uz/api/products/?category_id=' + category_id;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setProducts(data);
        })
        .catch((error) => {
            console.error('Error fetching product:', error);
        });
  }, [window.location.search]);

  const navigate = useNavigate();


  const handleCategoryClick = (categoryId) => {
    const category_id = categoryId != null ? categoryId : ''; // If categoryId is null, use an empty string
    navigate(`/products?data=${encodeURIComponent(JSON.stringify({ category_id }))}`);
};


  return (
    <>
    
<div className="mx-auto max-w-2xl px-4 pt-7 pb-3 sm:pt-7 lg:max-w-7xl lg:px-3">
          <div className="flex justify-between space-x-4 items-center">
            <h2 className={classNames("text-3xl font-medium text-gray-900", !products && "animate-pulse bg-gray-200 px-14 py-5 rounded-lg" )}>{products && products[0].category.name}</h2>
            <p onClick={() => handleCategoryClick(products[0].category.id)} className=" cursor-pointer whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
              <span aria-hidden="true"> &rarr;</span>
            </p>
          </div>
        </div>

          <Products products={products} />
    </>
  );
}

export default HomePage;
