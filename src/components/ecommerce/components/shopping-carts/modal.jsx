import Cookies from 'js-cookie';
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';



export default function Example() {
const [open, setOpen] = useState(false)
const [products, setProducts] = useState([])
const [hasCookie, setHasCookie] = useState(false)

useEffect(() => {
    const cookieValue = Cookies.get('user_id');

    if (cookieValue !== undefined) {

        const apiUrl = `http://wauu.uz/api/user/` + cookieValue + "/cartitems/";

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) throw new Error('Сетевая ошибка');
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setHasCookie(true)
            })
            .catch((error) => {
                console.error('!!! Ошибка');
            });
    }
}, []); // Empty dependency array ensures the effect runs only once on mount



return (
<>
    <div className="flow-root">
        <button type="button" className="relative  text-gray-400 hover:text-gray-500" onClick={()=> setOpen(true)}>
            <ShoppingCartIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true" />
            {products.length != 0 ? (
            <span className="animate-ping absolute px-1 -right-3 -top-2 rounded-full bg-rose-200 text-sm text-white text-center">
0
            </span>): 
            (<></>)}
            <span className="absolute px-1 -right-3 -top-2 rounded-full bg-rose-500 text-sm text-white text-center">
                {products.length}
            </span>
        </button>
    </div>

    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div
                    className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-105"
                        enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-105">
                        <Dialog.Panel
                            className="flex w-full max-w-3xl transform text-left text-base transition sm:my-8">
                            <form
                                className="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
                                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={()=>
                                        setOpen(false)}>
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <section aria-labelledby="cart-heading">
                                    <h2 id="cart-heading" className="sr-only">
                                        Items in your shopping cart
                                    </h2>
                                        

                                    <ul role="list" className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                                        {hasCookie && products.length != 0 ?
                                        products.map((product, productIdx) => (
                                        <li key={product.id} className="flex py-8 text-sm sm:items-center">
                                            <img src={product.image} alt={product.image}
                                                className="object-cover bg-center h-24 w-24 flex-none rounded-lg border border-gray-200 sm:h-32 sm:w-32" />
                                            <div
                                                className="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                                                <div className="row-end-1 flex-auto sm:pr-6">
                                                    <h3 className="font-medium text-gray-900">
                                                        <Link to={"/product/" + product.id}>{product.name}</Link>
                                                    </h3>
                                                    <p className="mt-1 text-gray-500">{product.value }</p>
                                                </div>
                                                <p
                                                    className="row-span-2 row-end-2 font-medium text-gray-900 sm:order-1 sm:ml-6 sm:w-1/3 sm:flex-none sm:text-right">
                                                    {product.price}
                                                </p>
                                                <div className="flex items-center sm:block sm:flex-none sm:text-center">
                                                    <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                                        Quantity, {product.name}
                                                    </label>
                                                    <select id={`quantity-${productIdx}`}
                                                        name={`quantity-${productIdx}`}
                                                        className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                        <option value={6}>6</option>
                                                        <option value={7}>7</option>
                                                        <option value={8}>8</option>
                                                    </select>

                                                    <button type="button"
                                                        className="ml-4 font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-2">
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                        ))
                                        :
                                        <></>
                                        }
                                    </ul>
                                </section>

                                <section aria-labelledby="summary-heading" className="mt-auto sm:px-6 lg:px-8">
                                    <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                                        <h2 id="summary-heading" className="sr-only">
                                            Order summary
                                        </h2>

                                        <div className="flow-root">
                                            <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                                <div className="flex items-center justify-between py-4">
                                                    <dt className="text-gray-600">Subtotal</dt>
                                                    <dd className="font-medium text-gray-900">$262.00</dd>
                                                </div>
                                                <div className="flex items-center justify-between py-4">
                                                    <dt className="text-gray-600">Shipping</dt>
                                                    <dd className="font-medium text-gray-900">$5.00</dd>
                                                </div>
                                                <div className="flex items-center justify-between py-4">
                                                    <dt className="text-gray-600">Tax</dt>
                                                    <dd className="font-medium text-gray-900">$53.40</dd>
                                                </div>
                                                <div className="flex items-center justify-between py-4">
                                                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                                                    <dd className="text-base font-medium text-gray-900">$320.40</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </section>

                                <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                                    <Link to="/payment" onClick={()=>setOpen(false)}
                                        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                        Continue to Payment
                                    </Link>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
</>
)
}
