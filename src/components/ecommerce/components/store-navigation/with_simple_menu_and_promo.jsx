import {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {Dialog, Popover, Menu, Tab, Transition} from '@headlessui/react'
import {Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Order from '../../../../components/ecommerce/components/shopping-carts/modal.jsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
    categories: [
        {
            name: 'Women',
            featured: [
                {name: 'Sleep', href: '#'},
                {name: 'Swimwear', href: '#'},
                {name: 'Underwear', href: '#'},
            ],
            collection: [
                {name: 'Everything', href: '#'},
                {name: 'Core', href: '#'},
                {name: 'New Arrivals', href: '#'},
                {name: 'Sale', href: '#'},
            ],
            categories: [
                {name: 'Basic Tees', href: '#'},
                {name: 'Artwork Tees', href: '#'},
                {name: 'Bottoms', href: '#'},
                {name: 'Underwear', href: '#'},
                {name: 'Accessories', href: '#'},
            ],
            brands: [
                {name: 'Full Nelson', href: '#'},
                {name: 'My Way', href: '#'},
                {name: 'Re-Arranged', href: '#'},
                {name: 'Counterfeit', href: '#'},
                {name: 'Significant Other', href: '#'},
            ],
        },
        {
            name: 'Men',
            featured: [
                {name: 'Casual', href: '#'},
                {name: 'Boxers', href: '#'},
                {name: 'Outdoor', href: '#'},
            ],
            collection: [
                {name: 'Everything', href: '#'},
                {name: 'Core', href: '#'},
                {name: 'New Arrivals', href: '#'},
                {name: 'Sale', href: '#'},
            ],
            categories: [
                {name: 'Artwork Tees', href: '#'},
                {name: 'Pants', href: '#'},
                {name: 'Accessories', href: '#'},
                {name: 'Boxers', href: '#'},
                {name: 'Basic Tees', href: '#'},
            ],
            brands: [
                {name: 'Significant Other', href: '#'},
                {name: 'My Way', href: '#'},
                {name: 'Counterfeit', href: '#'},
                {name: 'Re-Arranged', href: '#'},
                {name: 'Full Nelson', href: '#'},
            ],
        },
    ],
    pages: [
        {name: 'Company', href: '#'},
        {name: 'Stores', href: '#'},
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [open, setOpen] = useState(false)
    const [subCategories, setCategories] = useState(false)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [hasCookie, setHasCookie] = useState(false)

    const [user, setUser] = useState(null);

    useEffect(() => {
        const cookieValue = Cookies.get('user_id');

        if (cookieValue !== undefined) {

            const apiUrl = `https://wauu.uz/api/user/` + cookieValue;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) throw new Error('Сетевая ошибка');
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                    setHasCookie(true)
                })
                .catch((error) => {
                    console.error('!!! Ошибка');
                });
        }
    }, []); // Empty dependency array ensures the effect runs only once on mount


    useEffect(() => {
        const apiUrl = `https://wauu.uz/api/categories/`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) throw new Error('Сетевая ошибка');
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error('!!! Ошибка');
            });
    }, []);


    if (!subCategories) {
        return <Skeleton className='mx-auto flex h-10 w-full items-center justify-between px-4 sm:px-6 lg:px-8'/>;
    }


    const handleLogout = () => {
        // Remove the user_id cookie or perform any other logout actions
        document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // You may also want to redirect the user to the login page or perform additional cleanup

        // Refresh the page
        window.location.reload();
    };


    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel
                                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 "
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({selected}) =>
                                                        classNames(
                                                            selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category, categoryIdx) => (
                                            <Tab.Panel key={category.name} className="space-y-12 px-4 pb-6 pt-10">
                                                <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                                                        <div>
                                                            <p id={`mobile-featured-heading-${categoryIdx}`}
                                                               className="font-medium text-gray-900">
                                                                Featured
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                                                className="mt-6 space-y-6"
                                                            >
                                                                {category.featured.map((item) => (
                                                                    <li key={item.name} className="flex">
                                                                        <a href={item.href} className="text-gray-500">
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <p id="mobile-categories-heading"
                                                               className="font-medium text-gray-900">
                                                                Categories
                                                            </p>
                                                            <ul role="list" aria-labelledby="mobile-categories-heading"
                                                                className="mt-6 space-y-6">
                                                                {category.categories.map((item) => (
                                                                    <li key={item.name} className="flex">
                                                                        <a href={item.href} className="text-gray-500">
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                                                        <div>
                                                            <p id="mobile-collection-heading"
                                                               className="font-medium text-gray-900">
                                                                Collection
                                                            </p>
                                                            <ul role="list" aria-labelledby="mobile-collection-heading"
                                                                className="mt-6 space-y-6">
                                                                {category.collection.map((item) => (
                                                                    <li key={item.name} className="flex">
                                                                        <a href={item.href} className="text-gray-500">
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <p id="mobile-brand-heading"
                                                               className="font-medium text-gray-900">
                                                                Brands
                                                            </p>
                                                            <ul role="list" aria-labelledby="mobile-brand-heading"
                                                                className="mt-6 space-y-6">
                                                                {category.brands.map((item) => (
                                                                    <li key={item.name} className="flex">
                                                                        <a href={item.href} className="text-gray-500">
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <Link to="/register" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create an account
                                        </Link>
                                    </div>
                                    <div className="flow-root">
                                        <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                            Log in
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {/* Currency selector */}
                                    <form>
                                        <div className="inline-block">
                                            <label htmlFor="mobile-currency" className="sr-only">
                                                Currency
                                            </label>
                                            <div
                                                className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                                <select
                                                    id="mobile-currency"
                                                    name="currency"
                                                    className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                                                >
                                                    {currencies.map((currency) => (
                                                        <option key={currency}>{currency}</option>
                                                    ))}
                                                </select>
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500"
                                                                     aria-hidden="true"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top">

                    {/* Top navigation */}

                    {!hasCookie ? (
                        <div className="bg-indigo-900">
                            <div
                                className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                                {/* Currency selector */}
                                <form className="hidden lg:block lg:flex-1">
                                    <div className="flex">
                                        <label htmlFor="desktop-currency" className="sr-only">
                                            Currency
                                        </label>
                                        <div
                                            className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                                            <select
                                                id="desktop-currency"
                                                name="currency"
                                                className="flex items-center rounded-md border-transparent bg-indigo-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                                            >
                                                <option>UZ</option>
                                                <option>RU</option>
                                                <option>EN</option>
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                                    Get free delivery on orders over $100
                                </p>

                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link to="/register" className="text-sm font-medium text-white hover:text-gray-100">
                                        Create an account
                                    </Link>
                                    <span className="h-6 w-px bg-gray-600" aria-hidden="true"/>
                                    <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* Secondary navigation */}
                    <div className="bg-white mt-1">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="">
                                <div className="flex h-12 items-center justify-between">
                                    {/* Logo (lg+) */}
                                    <div className="hidden lg:flex lg:items-center">
                                        <a href="https://localhost:3000">
                                            <span className="sr-only">Your Company</span>
                                            <img
                                                className="h-12 w-auto"
                                                src="https://avatars.mds.yandex.net/i?id=3726ddc5c0c55bafbbd851eaaa071b07d495d22d-8191391-images-thumbs&ref=rim&n=33&w=162&h=200"
                                                alt=""
                                            />
                                        </a>
                                    </div>

                                    <div className="hidden h-full lg:flex">
                                        {/* Mega menus */}
                                        <Popover.Group className="ml-8">
                                            <div className="flex h-full justify-center space-x-3">
                                                {navigation.categories.map((category, categoryIdx) => (
                                                    <Popover key={category.name} className="flex">
                                                        {({open}) => (
                                                            <>
                                                                <div className="relative flex py-2">
                                                                    <Popover.Button
                                                                        className={classNames(
                                                                            open
                                                                                ? 'bg-indigo-700 text-white font-medium'
                                                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-700',
                                                                            'focus:outline-none px-6 text-sm rounded-md cursor-pointer relative  flex items-center text-sm font-medium transition-colors duration-200 ease-out'
                                                                        )}
                                                                    >
                                                                        {category.name}
                                                                    </Popover.Button>
                                                                </div>

                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-200"
                                                                    enterFrom="opacity-0"
                                                                    enterTo="opacity-100"
                                                                    leave="transition ease-in duration-150"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Popover.Panel
                                                                        className="z-50 absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                        <div
                                                                            className="absolute inset-0 top-1/2 bg-white shadow"
                                                                            aria-hidden="true"/>

                                                                        <div className="relative bg-white">
                                                                            <div className="mx-auto max-w-7xl px-8">
                                                                                <div
                                                                                    className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                                                                    <div
                                                                                        className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                        <div>
                                                                                            <p
                                                                                                id={`desktop-featured-heading-${categoryIdx}`}
                                                                                                className="font-medium text-gray-900"
                                                                                            >
                                                                                                Featured
                                                                                            </p>
                                                                                            <ul
                                                                                                role="list"
                                                                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                            >
                                                                                                {category.featured.map((item) => (
                                                                                                    <li key={item.name}
                                                                                                        className="flex">
                                                                                                        <a href={item.href}
                                                                                                           className="hover:text-gray-800">
                                                                                                            {item.name}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div>
                                                                                            <p id="desktop-categories-heading"
                                                                                               className="font-medium text-gray-900">
                                                                                                Categories
                                                                                            </p>
                                                                                            <ul
                                                                                                role="list"
                                                                                                aria-labelledby="desktop-categories-heading"
                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                            >
                                                                                                {category.categories.map((item) => (
                                                                                                    <li key={item.name}
                                                                                                        className="flex">
                                                                                                        <a href={item.href}
                                                                                                           className="hover:text-gray-800">
                                                                                                            {item.name}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                        <div>
                                                                                            <p id="desktop-collection-heading"
                                                                                               className="font-medium text-gray-900">
                                                                                                Collection
                                                                                            </p>
                                                                                            <ul
                                                                                                role="list"
                                                                                                aria-labelledby="desktop-collection-heading"
                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                            >
                                                                                                {category.collection.map((item) => (
                                                                                                    <li key={item.name}
                                                                                                        className="flex">
                                                                                                        <a href={item.href}
                                                                                                           className="hover:text-gray-800">
                                                                                                            {item.name}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>

                                                                                        <div>
                                                                                            <p id="desktop-brand-heading"
                                                                                               className="font-medium text-gray-900">
                                                                                                Brands
                                                                                            </p>
                                                                                            <ul
                                                                                                role="list"
                                                                                                aria-labelledby="desktop-brand-heading"
                                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                            >
                                                                                                {category.brands.map((item) => (
                                                                                                    <li key={item.name}
                                                                                                        className="flex">
                                                                                                        <a href={item.href}
                                                                                                           className="hover:text-gray-800">
                                                                                                            {item.name}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Popover.Panel>
                                                                </Transition>
                                                            </>
                                                        )}
                                                    </Popover>
                                                ))}

                                                {navigation.pages.map((page) => (
                                                    <a
                                                        key={page.name}
                                                        href={page.href}
                                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                                    >
                                                        {page.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </Popover.Group>
                                    </div>

                                    {/* Mobile menu and search (lg-) */}
                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button
                                            type="button"
                                            className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setOpen(true)}
                                        >
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                                        </button>

                                        {/* Search */}
                                        <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true"/>
                                        </a>
                                    </div>

                                    {/* Logo (lg-) */}
                                    <a href="" className="lg:hidden">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            src="https://cdn1.ozone.ru/s3/multimedia-b/6272402075.jpg"
                                            alt=""
                                            className="h-8 w-auto"
                                        />
                                    </a>

                                    <div className="flex flex-1 items-center justify-end">
                                        <div className="flex items-center lg:ml-8">
                                            <div className="flex space-x-8">
                                                <div className="hidden lg:flex">
                                                    <div
                                                        className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                                        <div className="w-full max-w-lg lg:max-w-xs">
                                                            <label htmlFor="search" className="sr-only">
                                                                Search
                                                            </label>
                                                            <div className="relative">
                                                                <div
                                                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                    <MagnifyingGlassIcon
                                                                        className="h-5 w-5 text-gray-400"
                                                                        aria-hidden="true"/>
                                                                </div>
                                                                <input
                                                                    id="search"
                                                                    name="search"
                                                                    className="focus:ring-indigo-700  focus:outline-none
                                                                    block w-full rounded-md border-0 bg-white
                                                                    py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset
                                                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2
                                                                    sm:text-sm
                                                                    sm:leading-6"
                                                                    placeholder="Search"
                                                                    type="search"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <Menu.Button
                                                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-50">
                                                            <UserIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </Menu.Button>
                                                    </div>

                                                    <Menu.Items
                                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="pb-1">
                                                            {hasCookie ? (
                                                                <>
                                                                    <Menu.Item>
                                                                        <div className="pt-1 font-semibold bg-gray-100">
                                                                            <p
                                                                                className='block px-4 py-2 text-sm'
                                                                            >
                                                                                {user.user_profile.username}
                                                                            </p>
                                                                        </div>
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <a
                                                                                href="#"
                                                                                className={`${
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                } block px-4 py-2 text-sm`}
                                                                            >
                                                                                Cart
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <a
                                                                                href="#"
                                                                                className={`${
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                } block px-4 py-2 text-sm`}
                                                                            >
                                                                                Become a Seller
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <a
                                                                                href="#"
                                                                                className={`${
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                } block px-4 py-2 text-sm`}
                                                                                onClick={handleLogout}
                                                                            >
                                                                                Log out
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <Link to="/login"
                                                                                  className={`${
                                                                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                  } block px-4 py-2 text-sm`}
                                                                            >
                                                                                Log In
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <Link to="/register"
                                                                                  className={`${
                                                                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                  } block px-4 py-2 text-sm`}
                                                                            >
                                                                                Sign In
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                </>
                                                            )}

                                                        </div>
                                                    </Menu.Items>
                                                </Menu>


                                            </div>

                                            <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true"/>

                                            <Order/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

