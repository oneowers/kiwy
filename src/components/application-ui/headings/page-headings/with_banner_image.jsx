import { EnvelopeIcon, PhoneIcon, FolderPlusIcon} from '@heroicons/react/20/solid'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import AddProduct from '../../../../pages/seller/addProduct.jsx'




const HeaderSeller = ({ seller }) => {
    const [open, setOpen] = useState(false)



return (
<div className='mb-5'>
    <div>
        
    {seller && seller.background ? (
        <img className="h-32 w-full object-cover lg:h-48 opacity-100" src={seller.background} alt="" />
        ): <div className="h-32 w-full object-cover lg:h-48 opacity-100 animate-pulse bg-gray-200"
         ></div>}   
    </div>
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
                {seller && seller.avatarka ? (
                <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-black"
                    src={seller.avatarka} />
                ): <div className="h-24 w-24 animate-pulse rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-gray-200"
                 ></div>}         
                </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                    {seller && seller.store_name?(
                        <h1 className="truncate text-2xl font-bold text-gray-900">
                        {seller.store_name}
                        </h1>
                    ):
                    <h1 className="truncate text-2xl font-bold text-gray-900">
                    <span className='px-15'></span>
                    </h1>}
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <button type="button"
                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Message</span>
                    </button>
                    <button type="button"
                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Call</span>
                    </button>
                    

                    {seller && Cookies.get('user_id') == seller.user ? (
                    <AddProduct />
                    ):(<></>)}
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default HeaderSeller;
