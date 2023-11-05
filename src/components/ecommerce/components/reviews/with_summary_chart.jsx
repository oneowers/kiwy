import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react'

const reviews_test = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { id: productId } = useParams();
  const [reviews, setRewiews] = useState(null);
  useEffect(() => {
  const apiUrl = `http://127.0.0.1:8000/api/reviews/?product=` + productId;
  
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
  return "NONE";
  }
  


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Отзывы клиентов</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      Math.round(reviews_test.average) > rating ? 'text-indigo-400' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews_test.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">Основано на {reviews_test.totalCount} отзывах</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews_test.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        className={classNames(
                          count.count > 0 ? 'text-indigo-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 rounded-full border border-indigo-400 bg-indigo-400"
                            style={{ width: `calc(${count.count} / ${reviews_test.totalCount} * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                    {Math.round((count.count / reviews_test.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Поделитесь своими мыслями</h3>
            <p className="mt-1 text-sm text-gray-600">
            Если вы пользовались этим продуктом, поделитесь своими мыслями с другими клиентами
            </p>

            <a
              href="#"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Написать отзыв
            </a>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <div className="">
                      <h4 className="text-sm font-bold text-gray-900">{review.name}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              Math.round(review.rating) > rating ? 'text-indigo-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>
                                
                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.info }}
                  />
                  
                  <div className="mt-4">
                    <img src={review.image} alt={`${review.name}.`} className="h-45 w-24 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
