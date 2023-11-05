import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';

function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}

function formatDate(dateString) {
const options = {
year: 'numeric',
month: 'long',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
hour12: true,
};

const date = new Date(dateString);
return new Intl.DateTimeFormat('en-US', options).format(date);
}


export default function Example() {
const { id: productId } = useParams();


const [reviews, setRewiews] = useState(null);
useEffect(() => {
const apiUrl = `http://127.0.0.1:8000/api/reviews/`;

fetch(apiUrl)
.then((response) => {
if (!response.ok) throw new Error('Сетевая ошибка');
return response.json();
})
.then((data) => {
setRewiews(data);
})
.catch((error) => {console.error('!!! Ошибка');});
}, []);
if (!reviews) {
return [];
}


return (
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
    {reviews.map((review) => (
    <div
        className="mb-3 flex border border-gray-200 ring-gray-100 ring-1 rounded-md space-x-3 mx-auto max-w-2xl sm:px-6 sm:py-5 lg:max-w-7xl lg:py-6 lg:px-12">
        <div className="min-w-0 flex-1">
            <p className="text-2xl font-semibold text-gray-900 font-bold">
                {review.user}
            </p>

            <div className="flex items-center">
                <div className="flex flex-col">
                    <div className="flex  items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon key={rating} className={classNames( Math.round(review.rating)> rating ?
                            'text-yellow-400' :
                            'text-gray-200',
                            'h-4 w-4 flex-shrink-0'
                            )}
                            aria-hidden="true"
                            />
                            ))}

                            <p className="ml-1 text-sm text-gray-600">{formatDate(review.created_at)}</p>
                    </div>
                </div>
            </div>

            <p className="text-base text-1xl text-gray-900 ml-5  mt-2">
                {review.info}
            </p>
        </div>
        <div className="flex flex-shrink-0 self-center">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                <a href="#" className={classNames( active ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700' , 'flex px-4 py-2 text-sm' )}>
                                    <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Add to favorites</span>
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                <a href="#" className={classNames( active ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700' , 'flex px-4 py-2 text-sm' )}>
                                    <CodeBracketIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Embed</span>
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                <a href="#" className={classNames( active ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700' , 'flex px-4 py-2 text-sm' )}>
                                    <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Report content</span>
                                </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    </div>
    ))}
</div>
)
}
