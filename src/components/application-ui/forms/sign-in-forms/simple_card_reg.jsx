import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
// Change this import
import Logo from '../../../../pages/header/kiwy_white.png';
// import { useHistory } from 'react-router-dom';

// To this import
import { useNavigate, Link } from 'react-router-dom';



export default function Example() {
const [phoneNumber, setPhoneNumber] = useState('');
const [password, setPassword] = useState('');
const [passwordRep, setPasswordRep] = useState('');
const [isValidPassword, setValidPassword] = useState(false);
const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
const [submitButtonActive, setSubmitButtonActive] = useState(false);
const [hasCoockie, SetHasCoockie] = useState(false);

const validatePassword = (password) => {
// Add your password validation rules here
// Example: minimum length of 8 characters, English letters only
const minLength = password.length >= 8;
return minLength;
};


const setPasswordMethod = (event) => {
const newPassword = event.target.value;
setValidPassword(validatePassword(newPassword) && validatePassword(password) && newPassword == password);
setPassword(newPassword);
setSubmitButtonActive(isValidPassword)
};

const setPasswordRepMethod = (event) => {
const newPasswordRep = event.target.value;
setValidPassword(validatePassword(newPasswordRep) && validatePassword(password) && newPasswordRep == password);
setPasswordRep(newPasswordRep);
setSubmitButtonActive(isValidPassword)
};


const formatPhoneNumber = (input) => {
const cleanedInput = input.replace(/\D/g, '');

let formattedNumber = '';
for (let i = 0; i < cleanedInput.length; i++) { if (i===2 || i===5 || i===7) { formattedNumber +='-' ; } formattedNumber
    +=cleanedInput[i]; } return formattedNumber;
};


const handlePhoneNumberChange=(event)=> {
    const input = event.target.value;
    const formattedNumber = formatPhoneNumber(input);

    setPhoneNumber(formattedNumber);

    // Check if the formatted number matches the correct pattern
    setIsValidPhoneNumber(/^\d{2}-\d{3}-\d{2}-\d{2}$/.test(formattedNumber));
};

const navigate = useNavigate();

const checkUserInCookie = () => {
    const userId = Cookies.get('user_id');

    if (userId) {
      if(!hasCoockie || toastOpen) toast.success(`User ID: ${userId} found in cookie`);
        SetHasCoockie(true);
        setToastOpen(false);

        setTimeout(() => {
        // Navigate back to the home page
        navigate('/');
      }, 3000);
    }
  };

  // Call this function when your component mounts or as needed
  useEffect(() => {
    checkUserInCookie();
  }, []);


  const [toastOpen, setToastOpen] = useState(true);

const handleSubmit = (e) => {
    e.preventDefault();

    const blog = {
      username: "+998" + phoneNumber.replace(/-/g, ''),
      password: password,
    };

    fetch(process.env.REACT_APP_API_BASE_URL + '/api/register/', {
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
          toast('User successfully registered, we will redirect you...');
        
          setTimeout(() => {
            // Navigate to the home page
            navigate('/');
          }, 1500);
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
    
    <ToastContainer autoClose={1500}/>


    {hasCoockie ? (<>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">User Already Registered</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Registration Successful
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
              Thank you for registering! You will be redirected to the home page shortly.
          </p>
        </div>
      </main>
    </>):(
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-10 w-auto"
                        src={Logo} alt="Your Company" />
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
                                            <option className="text-red-500">+998</option>
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
                                    Password:
                                </label>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password"
                                        autoComplete="current-password" required value={password}
                                        onChange={setPasswordMethod}
                                        className="focus:outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password_rep"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Repeat password:
                                </label>
                                <div className="mt-2">
                                    <input id="password_rep" name="password_rep" type="password"
                                        autoComplete="current-password" required value={passwordRep}
                                        onChange={setPasswordRepMethod} className={`${isValidPassword
                                        ? "focus:ring-indigo-600 ring-gray-300 ring-1"
                                        : "focus:ring-red-600 ring-red-600 ring-1" } focus:outline-none block w-full
                                        rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm
                                        sm:leading-6`} />
                                    {!isValidPassword && <p className="text-red-600 text-sm mt-1">Passwords do not match
                                    </p>}
                                </div>
                            </div>


                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                </div>

                                <div className="text-sm leading-6">
                                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Have an account?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                {isValidPassword ? (
                                <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
                                    Sign in
                                </button>
                                ):(
                                <button type="submit" disabled
                                    className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
                                    Sign in
                                </button>
                                )}
                            </div>
                        </form>
                    </div>

                </div>
            </div>)}
    </>
    )
    }
