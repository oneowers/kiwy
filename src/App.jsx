import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { Route, Link, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import HomePage from './pages/home'; 
import Footer from './components/marketing/sections/footers/4_column_with_company_mission.jsx';
import HeaderCategories from './components/ecommerce/components/store-navigation/with_simple_menu_and_promo.jsx'
import View from './pages/view.jsx'

function App() {
  return (
    <>
      <HeaderCategories />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" index element={<View />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
