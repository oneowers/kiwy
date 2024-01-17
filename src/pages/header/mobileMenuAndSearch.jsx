import {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Order from '../../components/ecommerce/components/shopping-carts/modal.jsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CompanyLogo from './logo.jsx'
import MegaMenus from './megaMenus.jsx'
import UserProfileDropDown from "./userProfileDropDown.jsx"
import SearchDefaultMenu from "./defaultMenu.jsx"
import MenuBar from './menuBar.jsx'
import Cookies from 'js-cookie';


export default function Example({style}) {

const cookieValue = Cookies.get('user_id');

const [subCategories, setCategories] = useState(false)
useEffect(() => {
const apiUrl = `http://localhost:3000/api/categories/`;

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



return (
<>

    <header className="relative">
        <nav aria-label="Top">
            {cookieValue == undefined && (
            <div className="bg-indigo-900">
                <div className="mx-auto max-w-7xl lg:px-4 flex h-10  items-center justify-between">
                    {/* Currency selector */}
                    <form className="hidden lg:block lg:flex-1">
                        <div className="flex">
                            <label htmlFor="desktop-currency" className="sr-only">
                                Currency
                            </label>
                            <div
                                className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                                <select id="desktop-currency" name="currency"
                                    className="flex items-center rounded-md border-transparent bg-indigo-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100">
                                    <option>UZ</option>
                                    <option>RU</option>
                                    <option>EN</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
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
                        <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                        <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
                        Log in
                        </Link>
                    </div>
                </div>
            </div>
            )}

            {/* Secondary navigation */}
            <div className="bg-white mt-1">
                <div className="mx-auto max-w-7xl lg:px-4">
                    <div className="flex h-12 items-center justify-between">
                        <CompanyLogo style="small" />

                        <div className="hidden h-full lg:flex">
                            <MegaMenus />
                        </div>

                        <div className="flex flex-1 items-center lg:hidden">


                            {subCategories && (<MenuBar />)}

                            {/* Search */}
                            <SearchDefaultMenu style="small" />

                        </div>

                        <CompanyLogo style="large" />

                        <div className="flex flex-1 items-center justify-end">
                            <div className="flex items-center mt-2 mr-2">
                                <div className="flex">
                                    <SearchDefaultMenu style="large" />
                                    <UserProfileDropDown />
                                </div>
                                <span className="mx-6 h-6 w-px bg-gray-200 lg:ml-3" aria-hidden="true" />
                                <Order />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</>
)
}
