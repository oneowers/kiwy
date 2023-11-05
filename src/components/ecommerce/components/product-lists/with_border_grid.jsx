import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
return classes.filter(Boolean).join(' ');
}

function formatPrice(price) {
// Преобразуем число в строку
const priceString = price.toString();

// Разбиваем строку на целую и десятичную части (если они есть)
const parts = priceString.split('.');

// Форматируем целую часть числа, добавляя пробелы
const formattedPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// Если есть десятичная часть, добавляем её обратно
if (parts[1]) {
return `${formattedPrice}.${parts[1]}`;
} else {
return formattedPrice;
}
}

export default function ProductList() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
// Fetch product data from the API
fetch('http://127.0.0.1:8000/api/products/')
.then((response) => response.json())
.then((data) => {
setProducts(data);
setLoading(false);
})
.catch((error) => {
console.error('Error fetching products:', error);
setLoading(false);
});
}, []);


return (
<div className="bg-white">
    <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-0">
        <h2 className="sr-only">Products</h2>

        {loading ? (
        <div className="text-center p-4">Loading...</div>
        ) : (
        <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
            <div key={product.id} className="group p-1 sm:p-2">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-90">
                    <a href={"product/" + product.id}>
                        <img src={product.image} alt={product.image}
                            className="h-full w-full object-cover object-center" />
                    </a>
                </div>
                <div className="pb-4 pt-5">
                    <h3 className="text-base text-gray-900">
                        <a href={"product/" + product.id}>
                            {product.name}
                        </a>
                    </h3>
                    <div className="flex items-center mt-2">
                        <StarIcon className={'text-yellow-400 h-4 w-4 flex-shrink-0'} aria-hidden="true" />
                        <p className="ml-1 text-sm text-gray-500">{product.rating} out of 5 stars</p>
                    </div>

                    <div className="mt-2">
                        <div className="flex flex-wrap items-center justify-between">
                            <div>
                                <del className="mt-1 text-sm text-gray-400 ">{formatPrice(product.price)} сум</del>
                                <h4 className="text-lg text-lg font-bold text-gray-700 ">
                                    {formatPrice(product.discount_price)} сум</h4>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <Link to={`/product/${product.id}`}
                                    className="right-0 bottom-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-900 hover:bg-gray-100">
                                <i className="fa fa-shopping-cart text-gray-600" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
</div>
);
}
