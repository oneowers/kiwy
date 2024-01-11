import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Example() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const formatPhoneNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, '');

    let formattedNumber = '';
    for (let i = 0; i < cleanedInput.length; i++) {
      if (i === 2 || i === 5 || i === 7) {
        formattedNumber += '-';
      }
      formattedNumber += cleanedInput[i];
    }
    return formattedNumber;
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const formattedNumber = formatPhoneNumber(input);

    setPhoneNumber(formattedNumber);

    // Check if the formatted number matches the correct pattern
    setIsValidPhoneNumber(/^\d{2}-\d{3}-\d{2}-\d{2}$/.test(formattedNumber));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = {
      username: "+998" + phoneNumber.replace(/-/g, ''),
      password: password,
    };

    fetch('https://wauu.uz/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to register user');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User registered successfully:', data);

        if (data.token) {
          const decodedToken = decodeJwtToken(data.token);
          Cookies.set('user_id', decodedToken.user_id, { expires: 7 });
          toast.success('User successfully registered, we will redirect you...');

          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error('Error registering user');
      });
  };

  // Function to decode JWT token
  const decodeJwtToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const inputBorderColor = isValidPhoneNumber ? 'border-indigo-300' : 'border-red-500';

  return (
    <>
      <ToastContainer autoClose={3000} />
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone number
                                </label>
                                <div className={`relative mt-2 rounded-md shadow-sm ${inputBorderColor}`}>
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country" className="sr-only">
                                            Country
                                        </label>
                                        <select id="country" name="country" autoComplete="country"
                                            className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-1 text-gray-500 focus:outline-none sm:text-sm">
                                            <option>+998</option>
                                        </select>
                                    </div>
                                    <input id="text" name="text" type="text" autoComplete="text" required
                                        value={phoneNumber} onChange={handlePhoneNumberChange}
                                        className={`focus:outline-none focus:ring block w-full rounded-md border-0
                                        py-1.5 pl-20 text-gray-900 ring-1 ring-inset ring-gray-300
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                                        sm:text-sm sm:leading-6 ${ isValidPhoneNumber
                                        ? 'focus:ring-indigo-500 ring-indigo-500' : 'focus:ring-red-500 ring-red-500' }
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                                        sm:text-sm sm:leading-6`} />
                                    {!isValidPhoneNumber && (
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 30 20">
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path
                                                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                                            </g>
                                        </svg>
                                    </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password"
                                        autoComplete="current-password" required
                                        value={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </>
    )
    }
