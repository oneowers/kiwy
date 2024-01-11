import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function WithImageGalleryAndExpandableDetails() {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { id: productId } = useParams();

  useEffect(() => {
    // Define the API URL with the productId
    const apiUrl = `https://wauu.uz/api/product/${productId}/`;

    // Fetch the data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedColor(data.characteristics); // Set the default selected color
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        {product && selectedColor && selectedColor[0] != null && selectedColor[0].images != null ?(
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
              {selectedColor[0].images.length != 0 ? (
                selectedColor.map((characteristics) =>
                  characteristics.images.map((img) => (
                    <Tab
                      key={img.middle}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover-bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">
                            {selectedColor[0].value}
                          </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={img.middle}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))
                )
                ):(<>
                {
                  [1, 2, 3, 4].map((img) => (
                    <Tab
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover-bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <div
                            className="animate-pulse bg-gray-200 h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                    </Tab>
                  )
                )}
                </>)}
                
              </Tab.List>
            </div>


            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {selectedColor.map((characteristics) =>
                characteristics.images.map((img) => (
                  <Tab.Panel key={img.original}>
                    <img
                      src={img.original}
                      alt={img.original}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))
              )}
            </Tab.Panels>
          </Tab.Group>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            
            <a href={`https://localhost:3000/seller/` + product.seller} className="tracking-tight text-blue-900">
              {product.seller_name}
            </a>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <del className="text-1xl tracking-tight text-gray-600">
                {selectedColor.length != 0 ? selectedColor[0].discount_price : 0 } UZS
              </del>
              <p className="text-3xl tracking-tight text-gray-900 font-bold">
                {selectedColor.length != 0 ? selectedColor[0].price : 0 } UZS
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-indigo-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <div className="flex items-center">
                  {selectedColor.map((characteristics, index) => (
                    <>
                      <span
                        key={characteristics.id}
                        className="flex-shrink-0 pr-3 pt-2 border-gray-200"
                      >
                          <>
                            <h3 className="text-base text-gray-600">
                              {characteristics.name}:
                              {characteristics.images.length != 0 ? (
                              <img src={characteristics.images[0].middle}
                              className="w-18 h-24 mt-2 object-cover object-center border border-gray-200  hover:ring-2 hover:border-indigo-600 sm:rounded-lg"/>
                              ):(
                              <div className="animate-pulse bg-gray-200 w-18 h-24 mt-2 border border-gray-200  hover:ring-2 hover:border-indigo-600 sm:rounded-lg"></div>
                              )}
                            </h3>
                          </>
                      </span>
                    </>
                  ))}
                </div>
              </div>

              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        ):
        (
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {[1, 2].map((characteristics) =>
                  [1, 2].map((img) => (
                    <Tab
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover-bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <div
                            className="animate-pulse bg-gray-200 h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                    </Tab>
                  ))
                )}
              </Tab.List>
            </div>

            <div
              className="animate-pulse size-full h-96 y-2 bg-gray-200 sm:rounded-lg"
            ></div>
          </Tab.Group>

          
        </div>
        )}

      </div>
    </div>
  );
}

export default WithImageGalleryAndExpandableDetails;
