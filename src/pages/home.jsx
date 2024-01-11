import { Routes, Route, useNavigate } from 'react-router-dom';
import React, {Fragment, useState, useEffect} from 'react'
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CategoryTabs from './categoryTabs.jsx'
import Products from './products.jsx'
import ProductsByCategory from './productsByCategory.jsx'

import Cards from './Cards.jsx';
import Footer from '../components/marketing/sections/footers/4_column_with_company_mission.jsx';
import Header from './header/index.jsx';
  import Carusel from './carusel.jsx';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
  }

function HomePage() {
  return (
    <>
        <Header/>
          <Carusel/>
          <ProductsByCategory category_id={1}/>
          <ProductsByCategory category_id={2}/>
        <Footer/>
    </>
  );
}

export default HomePage;
