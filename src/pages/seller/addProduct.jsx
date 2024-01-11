import Cookies from 'js-cookie';
import { Fragment, useState, useEffect } from 'react'
import { Dialog,Menu,  Transition } from '@headlessui/react'
import { EnvelopeIcon, ChevronDownIcon, FolderPlusIcon} from '@heroicons/react/20/solid'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


export default function Example() {
    const [open, setOpen] = useState(false)
    const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [parentCat, setParentCat] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Отправляем данные на сервер
      const response = await axios.post('https://wauu.uz/api/products/', {
        name: productName,
        price: parseFloat(productPrice), // Преобразуем в число, если необходимо
      });

      toast.success('Продукт успешно добавлен', response.data);

      // Очищаем форму после успешного добавления
      setProductName('');
      setProductPrice('');
    } catch (error) {
        toast.error('Ошибка при добавлении продукта', error);
    }
  };


  const [data, setData] = useState([
    { id: 1, content: 'Row 1' },
    // ... другие строки таблицы
  ]);

  const addRow = () => {
    const newIndex = data.length + 1;
    const newRow = { id: newIndex, content: `Row ${newIndex}` };
    setData([...data, newRow]);
  };

  
  useEffect(() => {
    // Define the API URL with the productId
    const apiUrl = `https://wauu.uz/api/parent_categories/`;

    // Fetch the data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setParentCat(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);


return (
<>
<ToastContainer autoClose={500} />
    <div className="flow-root">
        <button type="button"  onClick={()=> setOpen(true)}
            className="inline-flex justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-600">
            <FolderPlusIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true" />
            <span>Add Product</span>
        </button>
    </div>

    <Transition.Root show={open} as={Fragment} className="w-full">
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div
                    className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
                    <Transition.Child as={Fragment} enter="ease-out duration-300 " enterFrom="opacity-0 scale-105"
                        enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-105">
                        <Dialog.Panel
                            className="flex w-full max-w-3xl transform text-left text-base transition sm:my-8">
                            <form
                                className="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
                                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                                    <h2 className="fade-in text-lg font-medium text-gray-900">Shopping Cart</h2>
                                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={()=>
                                        setOpen(false)}>
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                
                                <section aria-labelledby="cart-heading" className='fade-in px-4 sm:px-6 lg:px-8'>
                                    <form className=' divide-y'>
                                    <div className='border-b-1  px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                        <label htmlFor="price" className="ml-5 block text-sm font-medium leading-6 text-gray-900">
                                            Name:
                                        </label>
                                        <div className="w-96 rounded-md shadow-sm">
                                            <input
                                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            type="text"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='border-b-1  px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                        <label htmlFor="price" className="ml-5 block text-sm font-medium leading-6 text-gray-900">
                                            Price:
                                        </label>
                                        <div className="relative rounded-md shadow-sm w-96">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                            value={productPrice} 
                                            onChange={(e) => setProductPrice(e.target.value)}
                                            type="text"
                                            name="price"
                                            id="price" 
                                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center">
                                            <select
                                                id="currency"
                                                name="currency"
                                                className="h-full mr-2 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm"
                                            >
                                                <option>UZS</option>
                                                <option>USD</option>
                                                <option>EUR</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='border-b-1  px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                    <label htmlFor="price" className="ml-5 block text-sm font-medium leading-6 text-gray-900">
                                            Category:
                                        </label>

                                        <div className="rounded-md shadow-sm">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Categories 
                                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </Menu.Button>
                                        </div>

                                        <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                        >
                                        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {parentCat && parentCat.map((parentCats) => 
                                                    parentCats.categories.map((cat) => (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                            <p
                                                                className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {cat.name}
                                                            </p>
                                                            )}
                                                        </Menu.Item>
                                                    ))
                                                )}
                                            </div>
                                        </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    </div>
                                    </div>
                                    <br/>

                                    <div className=''>
                                    <div className=''>
                                        <div>
                                        {data.map((row) => (
                                            <div key={row.id} className='fade-in flex flex-row mb-2 border-gray-300 border p-2 rounded-lg '>
                                            <div className='basis-1/4'>
                                                <div className=''>Product {row.id}</div>
                                                <input
                                                type="text"
                                                name="price"
                                                id="price" 
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="value"
                                                />
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    <button type="button"
                                    className='hover:bg-indigo-50 transition ease-in-out border-2 border-dashed border-indigo-500 rounded px-3 py-2 text-indigo-500 w-full' onClick={addRow}>+</button>
                                    </div>

                                    <br />
                                    <button type="button"
                                    className='bg-indigo-500 hover:bg-indigo-600 rounded px-3 py-2 text-white'
                                    onClick={handleFormSubmit}>Добавить продукт</button>
                                    </form>
                                </section>
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
