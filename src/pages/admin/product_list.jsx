import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import {Menu, Transition} from '@headlessui/react'
import {
    ArchiveBoxIcon,
    ArrowRightCircleIcon,
    ChevronDownIcon,
    CheckIcon,
    NoSymbolIcon,
    HeartIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
} from '@heroicons/react/20/solid'

const statuses = {Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10'}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Example() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setDeleting] = useState(false);
    const handleUpdateProduct = (productId) => {
        fetch(`http://wauu.uz/api/product/${productId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({is_published: !products.find((product) => product.id === productId).is_published}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update');
                }
// Update the local state without reloading the page
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === productId ? {...product, is_published: !product.is_published} : product
                    )
                );
                console.log('Product updated successfully');
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };
    const handleDelete = (item_id) => {
        setDeleting(true);

        fetch(`http://wauu.uz/api/product/${item_id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                console.log('Product deleted successfully');
// Optionally, you can provide feedback to the user here
// Reload the page after successful deletion
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
// Optionally, you can handle the error and provide feedback to the user
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    const handleDragStart = (event, item) => {
        // Set the dragged data
        event.dataTransfer.setData('text/plain', JSON.stringify(item));
    };

    const handleDrop = (event) => {
        // Prevent the default behavior to allow drop
        event.preventDefault();

        // Get the dragged data
        const droppedItem = JSON.parse(event.dataTransfer.getData('text/plain'));
        console.log('Dropped item:', droppedItem);
        // Handle the dropped item as needed
    };

    const handleDragOver = (event) => {
        // Prevent the default behavior to allow drop
        event.preventDefault();
    };


    useEffect(() => {
        const apiUrl = 'http://wauu.uz/api/products/?page=1';

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
                console.error('Error fetching products:', error);
            });
    }, []);


    const myArray = [1, 2, 3, 4];
    let indexProducts = 0;
    return (
        <SkeletonTheme baseColor="#111827" highlightColor="#1E2B45">
            <div
                className="px-10 pt-6 -mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
            >
                <div
                    className="rounded-lg border-dashed border-2 border-indigo-500 py-7 text-center font-bold text-base text-indigo-500"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    none
                </div>
            </div>

            <div className="bg-gray-900 pt-10 pb-96">
                <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
                <table className="mt-6 w-full whitespace-nowrap text-left">
                    <colgroup>
                        <col className="w-full sm:w-4/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                    </colgroup>
                    <thead className="border-b border-white/10 text-sm leading-6 text-white">
                    <tr>
                        <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            Product
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-8 font-semibold sm:table-cell">
                            Category
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-4 font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                            Price
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                            Duration
                        </th>
                        <th scope="col" className=" py-2 pl-0 pr-4 font-semibold sm:pr-8 sm:text-left lg:pr-20">
                            Status
                        </th>
                        <th scope="col"
                            className="py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                            Edit
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                    {loading ? myArray.map((arr) => (
                            <tr key={arr}>
                                <td>
                                    <div className='items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-4 lg:pl-8'>
                                        <div className="animate-pulse bg-gray-800 h-8"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className='items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-1 lg:pl-0'>
                                        <div className="animate-pulse bg-gray-800 h-8"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className='items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-1 lg:pl-0'>
                                        <div className="animate-pulse bg-gray-800 h-8"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className='items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-1 lg:pl-0'>
                                        <div className="animate-pulse bg-gray-800 h-8"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className='items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-1 lg:pl-0'>
                                        <div className="animate-pulse bg-gray-800 h-8"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className='items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-1 lg:pl-0'>
                                        <div className="animate-pulse bg-gray-800 h-8"></div>
                                    </div>
                                </td>
                            </tr>
                        )
                    ) : products.map((item) => (
                            <>
                                <tr key={item.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, { id: item.id, content: item.name })}>
                                    <td>
                                        <Link to={"/product/" + item.id}
                                              className="flex items-center gap-x-4 py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            {/* <img src={item.characteristics[0].images[0].middle} className="h-8 w-8 rounded-full bg-gray-800"/> */}
                                            <div
                                                className="truncate text-sm font-medium leading-6 text-white">{item.name}</div>
                                        </Link>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                        <div className="flex gap-x-3">
                                            <div
                                                className="font-mono text-sm leading-6 text-gray-400">{item.category.name}</div>
                                            <div
                                                className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                                                {item.category.parent}{/* {item.category} */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-8 leading-6 md:table-cell lg:pr-20">
                                        {console.log(item.characteristics[0])}
                                        {item.characteristics[0].discount_price != 0 ? (
                                            <>
                                                <del className='text-xs text-gray-600'>{item.characteristics[0].price} сум</del>
                                                <br/>
                                                <div className='text-sm text-gray-400'>{item.characteristics[0].discount_price} сум</div>
                                            </>
                                        ) : (
                                            <div className='text-sm text-gray-400'>{item.characteristics[0].price} сум</div>
                                        )}
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                        <time title={item.updated_at}>{moment(item.updated_at).fromNow()}</time>
                                    </td>
                                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                            <time className="text-gray-400 sm:hidden" dateTime={item.dateTime}>
                                                {item.date}
                                            </time>
                                            <div className={classNames(item.is_published ? statuses['Completed'] :
                                                statuses['Error'], 'flex-none rounded-full p-1')}>
                                                <div className="h-1.5 w-1.5 rounded-full bg-current"/>
                                            </div>
                                            <div
                                                className="hidden text-white sm:block">{item.is_published ? 'Active' : 'Notactive'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                        <Menu as="div" className="relative inline-block">
                                            <div>
                                                <Menu.Button
                                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-3 text-sm font-semibold text-white-900 shadow-sm">
                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"/>
                                                </Menu.Button>
                                            </div>

                                            <Transition as={Fragment} enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95">
                                                <Menu.Items
                                                    className="rounded-md bg-gray-800 ring-gray-700 ring-1 filter drop-shadow-lg absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-700">
                                                    <div className="text-white">
                                                        <Menu.Item>
                                                            <div onClick={() => handleUpdateProduct(item.id)}
                                                                 className="cursor-pointer group flex items-center px-4 py-2 text-sm hover:bg-gray-700"
                                                            >
                                                                {item.is_published ? (
                                                                        <NoSymbolIcon className="mr-3 h-5 w-5 text-gray-white"
                                                                                      aria-hidden="true"/>
                                                                    ) :
                                                                    (
                                                                        <CheckIcon className="mr-3 h-5 w-5 text-gray-white"
                                                                                   aria-hidden="true"/>
                                                                    )}
                                                                {item.is_published ? 'Reject' : 'Allow'}
                                                            </div>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <div onClick={() => handleDelete(item.id)}
                                                                 className={`cursor-pointer group flex items-center px-4 py-2 text-sm
                                                    hover:bg-gray-700 ${isDeleting ? 'opacity-50' : ''}`}
                                                            >
                                                                <TrashIcon className="mr-3 h-5 w-5 text-gray-white"
                                                                           aria-hidden="true"/>
                                                                Delete
                                                            </div>
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </td>
                                </tr>
                                <div className="hidden">{indexProducts++}</div>

                            </>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </SkeletonTheme>
    )

}
