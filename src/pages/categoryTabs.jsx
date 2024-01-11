import { Link} from 'react-router-dom'
import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function Cards({decodedData, tabs}) {
    return (
  <div className="max-w-7xl mx-auto overflow-hidden  sm:px-6 lg:px-2">
  <div className="my-4">
      <nav className="-mb-px flex space-x-2">
          <Link
            to="/products/"
              className={classNames(
                  decodedData == null
                      ? 'bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/50'
                      : decodedData.category_id == "" ? 'bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/50' :'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 ',
                  'px-4 select-none py-2 text-md rounded-md cursor-pointer rounded-md cursor-pointer relative  flex items-center text-md font-medium transition-colors duration-200 ease-out'
              )}
          >
              All
          </Link>
          {tabs.map((tab, index) => (
              <div
                    key={tab.name}
                    onClick={tab.onClick}
                  className={classNames(
                      tab.id === (decodedData != null ? decodedData.category_id : -1)
                          ? 'bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/50'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700',
                      'px-4 select-none py-2 text-md rounded-md cursor-pointer rounded-md cursor-pointer relative  flex items-center text-sm font-medium transition-colors duration-200 ease-out'
                  )}
              >
                  {tab.name}
              </div>
          ))}
      </nav>
  </div>
</div>
)
}

export default Cards;
