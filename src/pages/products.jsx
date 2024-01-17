import { useNavigate, Link} from 'react-router-dom'

import React from 'react'
import {StarIcon} from '@heroicons/react/20/solid'
import Modal from './test.jsx'
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton'

function classNames(...classes) {
return classes.filter(Boolean).join(' ')
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


export default function Cards({products}){
    const navigate = useNavigate();


  const handleCategoryClick = (categoryId) => {
    const category_id = categoryId != null ? categoryId : ''; // If categoryId is null, use an empty string
    navigate(`/products?data=${encodeURIComponent(JSON.stringify({ category_id }))}`);
};


return (
<>

    <div className="overflow-hidden lg:pb-5">
        <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-4 lg:grid-cols-5 space-x-3">
        {products ? products.map((product) => (product.is_published && product.characteristics[0] != null ? (
        <div key={product.id} className="relative group fade-in hover:shadow-lg rounded-lg duration-150 mb-4">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg hover:rounded-b-none  bg-gray-200">
                <Link to={"/product/" + product.id}>
                    {product.characteristics[0].images.length != 0 ? (
                <img src={product.characteristics[0].images[0].middle} className=" fade-in duration-150 hover:scale-105  w-full h-64 object-cover bg-center" />):
                (<div className="animate-pulse bg-gray-200 w-full h-64"></div>)}
                </Link>
            </div>
            <div className="px-3 pb-4 pt-3 h-44">
                <h3 className="text-sm/6 font-light text-gray-900">
                    <Link to={"/product/" + product.id}>
                    <div className=''>{product.name}</div>
                    <span className="placeholder col-6"></span>
                    </Link>
                </h3>

                <h4 className={classNames(
                    Cookies.get('user_id') != product.seller.user || true ? "text-sm/6 font-light text-blue-800" : "text-sm/6 font-light text-white bg-blue-800"
                    )
                    } >
                    <Link to={"/seller/" + product.seller.id}>
                    {product.seller.store_name}
                    </Link>
                </h4>
                
                {product.rating  && (<div className="flex items-center mt-1">
                    <StarIcon className={'text-yellow-400 h-4 w-4 flex-shrink-0'} aria-hidden="true" />
                    <p className="ml-1 text-xs font-light text-gray-500">{product.rating} out
                        of 5 stars</p>
                </div>)}

                <div>
                    <div className="absolute w-full bottom-0 flex flex-wrap items-center justify-between py-4">
                        <div>
                            {product.characteristics[0].discount_price != 0 ? (
                            <>
                                <del className="mt-1 text-xs font-light text-gray-400 ">{formatPrice(product.characteristics[0].price)}
                                    сум
                                </del>
                                <h4 className="text-md  font-medium text-gray-700 ">
                                    {formatPrice(product.characteristics[0].discount_price)} сум</h4>
                            </>
                            ) : (
                            <h4 className="text-md font-medium text-gray-700 ">
                                {formatPrice(product.characteristics[0].price)} сум</h4>
                            )}
                        </div>
                        <div className='absolute right-3 bottom-0 m-4 '>
                            <Modal product={product.characteristics} product_id={product.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (
        <></>
        )
        )
        ) : (
            [1, 2, 3, 4, 5].map(() => (
                <div className="aspect-h-1 m-2 aspect-w-1 overflow-hidden rounded-lg group-hover:opacity-90">
                    <div className=" animate-pulse h-96 w-full bg-gray-200"></div>
                </div>
            ))
        )}
        </div>
    </div>
</>
)
}
