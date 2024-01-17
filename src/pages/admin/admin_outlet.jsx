import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
ChartBarSquareIcon,
Cog6ToothIcon,
FolderIcon,
GlobeAltIcon,
ServerIcon,
SignalIcon,
XMarkIcon,
} from '@heroicons/react/24/outline'
import { useNavigate, Link, Outlet } from 'react-router-dom'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';


const teams = [
{ id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
{ id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
{ id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]




function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}

export default function Example() {
const [navigation, setNavigation] = useState([
{ 'id': 0, name: 'Projects', href: '#', icon: FolderIcon, current: false },
{ 'id': 1, name: 'Deployments', href: '#', icon: ServerIcon, current: false },
{ 'id': 2, name: 'Activity', href: '/admin/activity', icon: SignalIcon, current: false },
{ 'id': 3, name: 'Products', href: '#', icon: GlobeAltIcon, current: false },
{ 'id': 4, name: 'Usages', href: '#', icon: ChartBarSquareIcon, current: false },
{ 'id': 5, name: 'Settings', href: '/admin/details', icon: Cog6ToothIcon, current: true },
]);
const [sidebarOpen, setSidebarOpen] = useState(false)

const handleItemClick = (id) => {
const updatedNavigation = navigation.map((item) => ({
...item,
current: item.id === id,
}));

setNavigation(updatedNavigation);
};

const [query, setQuery] = useState('');
const [selectedProduct, setSelectedProduct] = useState(null);
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const apiUrl = process.env.REACT_APP_API_BASE_URL + '/api/products/?page=1';

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

const filteredProducts =
query === ''
? products
: products.filter((product) => {
return product.name.toLowerCase().includes(query.toLowerCase());
});

const navigate = useNavigate();
return (
<>
    <div className='pb-80 bg-gray-900'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
                <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0"
                    enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full" enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full">
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0"
                                enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={()=>
                                        setSidebarOpen(false)}>
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div
                                className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company" />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <Link to={item.href} className={classNames( item.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                        , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}>
                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                    {item.name}
                                                    </Link>
                                                </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="text-xs font-semibold leading-6 text-gray-400">Your
                                                teams
                                            </div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {teams.map((team) => (
                                                <li key={team.name}>
                                                    <a href={team.href} className={classNames( team.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                        , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}>
                                                        <span
                                                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                            {team.initial}
                                                        </span>
                                                        <span className="truncate">{team.name}</span>
                                                    </a>
                                                </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="-mx-6 mt-auto">
                                            <a href="#"
                                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                                                <img className="h-8 w-8 rounded-full bg-gray-800"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt="" />
                                                <span className="sr-only">Your profile</span>
                                                <span aria-hidden="true">Tom Cook</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/5">
                <div className="flex h-16 shrink-0 items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company" />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                <li key={item.id}>
                                    <Link to={item.href} className={classNames( item.current ? 'bg-indigo-800 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' )}
                                        onClick={()=> handleItemClick(item.id)}
                                    >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {teams.map((team) => (
                                <li key={team.name}>
                                    <a href={team.href} className={classNames( team.current ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' )}>
                                        <span
                                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                            {team.initial}
                                        </span>
                                        <span className="truncate">{team.name}</span>
                                    </a>
                                </li>
                                ))}
                            </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                            <a href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                                <img className="h-8 w-8 rounded-full bg-gray-800"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="" />
                                <span className="sr-only">Your profile</span>
                                <span aria-hidden="true">Tom Cook</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div className="xl:pl-72">
            {/* Sticky search header */}
            <div className="px-10">
                <Combobox as="div" value={selectedProduct} onChange={setSelectedProduct}>
                    <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to
                    </Combobox.Label>
                    <div className="relative mt-2">
                        <Combobox.Input
                            autocomplete="off" 
                            className="w-full rounded-md text-white border-0 bg-gray-900 py-3 pl-6 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-700  focus:outline-none sm:text-lg sm:leading-6"
                            onChange={(event)=> setQuery(event.target.value)}
                            displayValue={(product) => product?.name}
                            placeholder='Search..'
                            />
                            <Combobox.Button
                                className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Combobox.Button>

                            {filteredProducts.length > 0 && (
                            <Combobox.Options
                                className="divide-y divide-white/5 absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-gray-800 shadow-lg ring-1 ring-gray-700 focus:outline-none sm:text-lg">
                                {filteredProducts.map((product) => (
                                <Combobox.Option key={product.id} value={product} className={({ active })=>
                                    classNames(
                                    'relative text-white cursor-default select-none py-2 pl-3 pr-9',
                                    active ? 'bg-gray-700 text-white' : 'text-gray-900'
                                    )
                                    }
                                    >
                                    {({ active, selected }) => (
                                    <>
                                        <div className="flex items-center cursor-pointer">
                                            <Link to={"/product/"+product.id} className='ml-1 truncate'>
                                                <span
                                                    className={classNames( 'inline-block h-3 w-3 flex-shrink-0 rounded-full'
                                                    , product.is_published ? 'bg-green-400' : 'bg-red-400' )}
                                                    aria-hidden="true" />
                                                <span className='ml-2'>{product.name}</span>
                                                <span className="sr-only"> is {product.is_published ? 'online' :
                                                    'offline'}</span>
                                            </Link>
                                        </div>
                                    </>
                                    )}
                                </Combobox.Option>
                                ))}
                            </Combobox.Options>
                            )}
                    </div>
                </Combobox>
            </div>

            <div className='container mx-auto'>
                <Outlet />
            </div>
        </div>

    </div>
</>
)
}
