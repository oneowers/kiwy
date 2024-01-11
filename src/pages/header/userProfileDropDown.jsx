import {Menu} from '@headlessui/react'
import {UserIcon} from '@heroicons/react/24/outline'
import { useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'



export default function Example({style}) {
    const [hasCookie, setHasCookie] = useState(false)
    const [user, setUser] = useState(null);
    
useEffect(() => {
    const cookieValue = Cookies.get('user_id');

    if (cookieValue !== undefined) {

        const apiUrl = `https://wauu.uz/api/user/` + cookieValue + "/";

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



const handleLogout = () => {
    // Remove the user_id cookie or perform any other logout actions
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // You may also want to redirect the user to the login page or perform additional cleanup

    // Refresh the page
    window.location.reload();
};

return (

<Menu as="div" className="relative inline-block text-left">
    <div>
        <Menu.Button
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-50">
            <UserIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
    </div>

    <Menu.Items
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="pb-1">
            {hasCookie ? (
            <>
                <Menu.Item>
                    <div className="pt-1 font-semibold bg-gray-100">
                        <p className='block px-4 py-2 text-sm'>
                            {user.user_profile.username}
                        </p>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                    <a href="#" className={`${ active ? 'bg-gray-100 text-gray-900' : 'text-gray-700' } block px-4
                        py-2 text-sm`}>
                        Cart
                    </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                    <a href="#" className={`${ active ? 'bg-gray-100 text-gray-900' : 'text-gray-700' } block px-4
                        py-2 text-sm`}>
                        Become a Seller
                    </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                    <a href="#" className={`${ active ? 'bg-gray-100 text-gray-900' : 'text-gray-700' } block px-4
                        py-2 text-sm`} onClick={handleLogout}>
                        Log out
                    </a>
                    )}
                </Menu.Item>
            </>
            ) : (
            <>
                <Menu.Item>
                    {({active}) => (
                    <Link to="/login" className={`${ active ? 'bg-gray-100 text-gray-900' : 'text-gray-700' } block
                        px-4 py-2 text-sm`}>
                    Log In
                    </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                    <Link to="/register" className={`${ active ? 'bg-gray-100 text-gray-900' : 'text-gray-700' } block
                        px-4 py-2 text-sm`}>
                    Sign In
                    </Link>
                    )}
                </Menu.Item>
            </>
            )}

        </div>
    </Menu.Items>
</Menu>
)
}
