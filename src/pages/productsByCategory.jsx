import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Products from './products.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
  }

function HomePage({category_id}) {
  const [products, setProducts] = useState(0);
  
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL + '/api/products/?category_id=' + category_id;

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
    if(categoryId != null){
      const category_id = categoryId != null ? categoryId : ''; // If categoryId is null, use an empty string
      navigate(`/products?data=${encodeURIComponent(JSON.stringify({ category_id }))}`);
    }
};

  if(products.length != 0) return (
    <div className='mx-auto max-w-7xl lg:px-4'>
        {console.log({"lg_isnot_zero" : products.length != 0, "length" : products.length})}
        <div className="pt-7 px-4 pb-3 sm:pt-7">
          <div className="flex justify-between space-x-4 items-center">
            <h2 className={classNames("text-3xl font-medium text-gray-900", !products.length != 0 && "animate-pulse bg-gray-200 px-14 py-5 rounded-lg" )}>{products ? products[0].category.name : ""}</h2>
            <p onClick={() => handleCategoryClick(products.length != 0 ? products[0].category.id : null)} 
            className={classNames("cursor-pointer whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500", !products && "px-14 py-5 animate-pulse bg-indigo-500 rounded-lg" )}>
              {products ?  "View all" : ""}
              {products ? (<span aria-hidden="true"> &rarr;</span>) : ""}
            </p>
          </div>
        </div>

          <Products products={products} />
    </div>
  );
}

export default HomePage;
