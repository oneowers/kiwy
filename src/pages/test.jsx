import Cookies from 'js-cookie';
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';




export default function Modal({ product , product_id}) {
  const [open, setOpen] = useState(false);
  // const [toastOpen, setToastOpen] = useState(true);

  const [loading, setLoading] = useState(false);



 
const addToCart = async (product_id, characteristicId, quantity) => {
  const cookieValue = Cookies.get('user_id');

  if (cookieValue !== undefined) {
    const userId = cookieValue;

    const cartItem = {
      characteristic_id: characteristicId,
      quantity: parseInt(quantity, 10),
    };
    // setToastOpen(true);

    try {
      const response = await fetch(`https://wauu.uz/api/user/${userId}/add-to-cart/${product_id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        toast.success('Product added to cart successfully!');
      } else {
        toast.error('Failed to add product to cart. Please try again.');
      }
      // setToastOpen(false);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
};
  
  return (
    <>
    

      <div className="ml-4 flex-shrink-0">
        <button
          className="right-0 bottom-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-900 hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <i className="fa fa-shopping-cart text-gray-600" aria-hidden="true"></i>
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div
              className={`hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity ${
                loading ? 'opacity-50 pointer-events-none' : '' // Adjust the styling based on your needs
              }`}
            />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className={`flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8 ${
                loading ? 'opacity-50 pointer-events-none' : '' // Adjust the styling based on your needs
              }`}
            >
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-105"
                enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-105">
                <Dialog.Panel
                  className="flex w-full max-w-3xl transform text-left text-base transition sm:my-8"
                >
                  <form
                    className="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8"
                  >
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                      <h2 className="text-lg font-medium text-gray-900">Product Characteristics</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <section aria-labelledby="characteristics-heading">
                      <h2 id="characteristics-heading" className="sr-only">
                        Product Characteristics
                      </h2>

                      <ul role="list" className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                        {product?.map((characteristic) => (
                          <li key={characteristic.characteristic_id} className="flex py-8 text-sm sm:items-center">
                            <div className="flex-none mr-4">
                              {characteristic.images.length != 0 ? (<img
                                key={characteristic.characteristic_id}
                                src={characteristic.images[0].middle}
                                // src={characteristic.images[0].middle}
                                className="w-16 h-16 object-cover bg-center rounded-lg border border-gray-200 sm:h-24 sm:w-24"
                                alt={characteristic.name}
                              />):(
                                <div
                                className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg border border-gray-200 sm:h-24 sm:w-24"
                                ></div>
                                )}
                            </div>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex-auto sm:pr-6">
                                <h3 className="font-medium text-gray-900">{characteristic.name}</h3>
                                <p className="mt-1 text-gray-500">{characteristic.value}</p>
                              </div>
                              <div className="flex-none flex items-center">
                                <label htmlFor={`quantity-${characteristic.characteristic_id}`} className="sr-only">
                                  {/* Quantity, {characteristic.name} */}
                                </label>
                                <select
                                  id={`quantity-${characteristic.characteristic_id}`}
                                  name={`quantity-${characteristic.characteristic_id}`}
                                  className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                >
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  {/* Add more quantity options as needed */}
                                </select>

                                <button
                                  type="button"
                                  className="ml-4 bg-indigo-600 px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                  onClick={(e) =>
                                    addToCart(product_id, characteristic.characteristic_id, e.target.previousElementSibling.value)
                                  }
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
