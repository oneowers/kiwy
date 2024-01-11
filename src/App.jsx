import { Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './App.css';

import Payment from "./components/ecommerce/page-examples/checkout-pages/single_step_with_order_summary.jsx";
import AdminPayment from "./components/application-ui/page-examples/home-screens/stacked.jsx";
import Test1 from './components/application-ui/forms/comboboxes/with_status_indicator.jsx';
import Register from "./components/application-ui/forms/sign-in-forms/simple_card_reg.jsx";
import Login from "./components/application-ui/forms/sign-in-forms/simple_card.jsx";
import AdminConf from './pages/admin.jsx';
import Seller from './pages/seller.jsx';
import HomePage from './pages/home';
import Search from './pages/search';
import View from './pages/view.jsx';
import Test from './pages/test.jsx';
import React from "react";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/" element={<Search />} />
        <Route path="/category/" element={<Search />} />
        <Route path="/product/:id" index element={<View />} />
        <Route path="/seller/:id" index element={<Seller />} />
        <Route path="/payment" index element={<Payment />} />
        <Route path="/register" index element={<Register />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/test1"  element={<Test1 />} />
        <Route path="/test"  element={<Test />} />
        <Route path="/admin/" index element={<AdminPayment />} />
      </Routes>
      <AdminConf />
    </>
  );
}
