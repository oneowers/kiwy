import {Link, useNavigate} from 'react-router-dom'
import {Popover, Transition} from '@headlessui/react'
import {Fragment, useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Example({style}) {
    const [subCategories, setSubCategories] = useState(false)

    useEffect(() => {
    const apiUrl = `http://wauu.uz/api/parent_categories/`;
    
    fetch(apiUrl)
    .then((response) => {
    if (!response.ok) throw new Error('Сетевая ошибка');
    return response.json();
    })
    .then((data) => {
        setSubCategories(data);
        console.log(data)
    })
    .catch((error) => {
    console.error('!!! Ошибка');
    });
    }, []);

    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        const category_id = categoryId != null ? categoryId : ''; // If categoryId is null, use an empty string
        navigate(`/products?data=${encodeURIComponent(JSON.stringify({ category_id }))}`);
    };
    

    if (!subCategories ) {
        return (
            <>
            <div className='animate-pulse m-3 justify-center bg-gray-200  h-7 rounded-lg items-center px-4 sm:px-6 lg:px-8'></div>
            <div className='animate-pulse m-3 justify-center bg-gray-200  h-7 rounded-lg items-center px-4 sm:px-6 lg:px-8'></div>
            <div className='animate-pulse m-3 justify-center bg-gray-200  h-7 rounded-lg items-center px-4 sm:px-6 lg:px-8'></div>
            </ >
        );
    }
  
    // Updated handleCategoryClick
    const handleParentCategoryClick = (parent_categoryId) => {
        const parent_category_id = parent_categoryId != null ? parent_categoryId : ''; // If categoryId is null, use an empty string
        return (`/category?data=${encodeURIComponent(JSON.stringify({ parent_category_id }))}`);
    };

return (
<Popover.Group className="ml-8">
    <div className="flex h-full justify-center space-x-3">
        {subCategories.map((category, categoryIdx) => (
        <Popover key={category.name} className="flex">
            {({open}) => (
            <>
                <div className="relative flex py-2">
                    <Popover.Button className={classNames( open ? 'bg-indigo-700 text-white font-medium'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-700'
                        , 'focus:outline-none px-6 text-sm rounded-md cursor-pointer relative  flex items-center text-sm font-medium transition-colors duration-200 ease-out'
                        )}>
                        {category.name}
                    </Popover.Button>
                </div>

                <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0"
                    enterTo="opacity-100" leave="transition ease-in duration-150" leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Popover.Panel className="z-50 absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                        {/* Presentational element used to render the bottom shadow, if
                        we
                        put the shadow on the actual panel it pokes out the top, so we
                        use
                        this shorter element to hide the top of the shadow */}
                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                        <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                        <div>
                                            <p id={`desktop-featured-heading-${categoryIdx}`}
                                                className="font-medium text-gray-900">
                                                Categories
                                            </p>
                                            <ul role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-1 sm:mt-4 sm:space-y-2">
                                                {subCategories.map((item) => (
                                                    <li key={item.name} className="flex">
                                                        <Link 
                                                        to={handleParentCategoryClick(item.id)} // Pass null or any identifier for "All"
                                                        className={classNames(category.name == item.name ? 'bg-indigo-700 text-white font-medium'
                                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-700'
                                                        , 'focus:outline-none px-6 py-1 w-1/3 text-sm rounded-md cursor-pointer relative  flex items-center text-sm font-medium transition-colors duration-200 ease-out' )}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p id="desktop-categories-heading" className="font-medium text-gray-900">
                                                Categories
                                            </p>
                                            <ul role="list" aria-labelledby="desktop-categories-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                {category.categories.map((item) => (
                                                    <li key={item.name} className="flex">
                                                        <div onClick={() => handleCategoryClick(category.id)} className="cursor-pointer hover:text-gray-800">
                                                            {item.name}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                        <div>
                                            <p id="desktop-collection-heading" className="font-medium text-gray-900">
                                                Collection
                                            </p>
                                            <ul role="list" aria-labelledby="desktop-collection-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                {/* {category.collection.map((item) => (
                                                <li key={item.name} className="flex">
                                                    <Link to={item.href} className="hover:text-gray-800">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                                ))} */}
                                            </ul>
                                        </div>

                                        <div>
                                            <p id="desktop-brand-heading" className="font-medium text-gray-900">
                                                Brands
                                            </p>
                                            <ul role="list" aria-labelledby="desktop-brand-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                {/* {category.brands.map((item) => (
                                                <li key={item.name} className="flex">
                                                    <Link to={item.href} className="hover:text-gray-800">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                                ))} */}
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
    </div>
</Popover.Group>
)

}
