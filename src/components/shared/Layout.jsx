import {Link, Outlet } from 'react-router-dom'

  export default function Layout() {
    return (
        <>
        <nav class="bg-blue-500 p-4">
            <div class="container mx-auto flex justify-between items-center">
                <div>
                <a href="#" class="text-white text-lg font-bold">Your Logo</a>
                </div>
                <div class="hidden md:flex space-x-4">
                <a href="#" class="text-white">Home</a>
                <a href="#" class="text-white">About</a>
                <a href="#" class="text-white">Services</a>
                <a href="#" class="text-white">Contact</a>
                </div>
                <div class="md:hidden">
                <button class="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                </div>
            </div>
        </nav>

        <Outlet/>
        </>
    )
  }