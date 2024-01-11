import React, {useState, useEffect} from 'react';
import {StarIcon} from '@heroicons/react/20/solid';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function formatPrice(price) {
    if (price == null) return 0
    const priceString = price.toString();
    const parts = priceString.split('.');
    const formattedPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    if (parts[1]) {
        return `${formattedPrice}.${parts[1]}`;
    } else {
        return formattedPrice;
    }
}

const ProductList = ({}) => {
    const [coins, setCoins] = useState(0);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const apiUrl = `https://wauu.uz/api/products`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, []);

    const handleAddToCart = async (product_id) => {
        
        const user_id = Cookies.get('user_id');

        if (user_id !== undefined) {
        try {
          const response = await axios.post(`https://wauu.uz/api/user/${user_id}/cartitems/`, {
            quantity: 1,
            product: {id: product_id}   ,
          });
    
          // Обработка успешного добавления в корзину
          console.log('Product added to cart:', response.data);
        } catch (error) {
          // Обработка ошибок
          console.error('Error adding product to cart:', error);
        }
        }
      };



    const myArray = [1, 2, 3, 4];

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-0">
                <h2 className="sr-only">Products</h2>

                {loading ? (
                    <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                        {myArray.map(() => (
                            <div
                                className="aspect-h-1 m-3 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-90">
                                <Skeleton className="h-80 w-52"/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                        {products.results.map((product) => (product.is_published ? (
                            <div key={product.id} className="group p-1 sm:p-2 fade-in">
                                <div
                                    className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200
                                    ">
                                    <Link to={"/product/" + product.id}>
                                        <img src={product.image} alt={product.image}
                                                className="w-full h-90 object-cover bg-center"/>
                                    </Link>
                                </div>
                                <div className="pb-4 pt-5">
                                    <h3 className="text-base text-gray-900">
                                        <Link to={"/product/" + product.id}>
                                            {product.name}
                                            <span className="placeholder col-6"></span>
                                        </Link>
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        <StarIcon className={'text-yellow-400 h-4 w-4 flex-shrink-0'}
                                                  aria-hidden="true"/>
                                        <p className="ml-1 text-sm text-gray-500">{product.rating} out of 5 stars</p>
                                    </div>

                                    <div className="mt-2">
                                        <div className="flex flex-wrap items-center justify-between">
                                            <div>
                                                {product.discount_price != 0 ? (
                                                    <>
                                                        <del
                                                            className="mt-1 text-sm text-gray-400 ">{formatPrice(product.price)}
                                                            сум
                                                        </del>
                                                        <h4 className="text-lg text-lg font-bold text-gray-700 ">
                                                            {formatPrice(product.discount_price)} сум</h4>
                                                    </>
                                                ) : (
                                                    <h4 className="text-lg text-lg font-bold text-gray-700 ">
                                                        {formatPrice(product.price)} сум</h4>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <button onClick={() => handleAddToCart(product.id)}
                                                        className="right-0 bottom-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-900 hover:bg-gray-100">
                                                    <i className="fa fa-shopping-cart text-gray-600"
                                                       aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="aspect-h-1 m-2 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-90">
                                <Skeleton className="h-80 w-52"/>
                            </div>
                        )))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
