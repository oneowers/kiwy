import React from 'react';
import { useParams } from 'react-router-dom';
import ViewProduct from '../components/ecommerce/components/product-overviews/with_image_gallery_and_expandable_details.jsx';
import Comments from '../components/ecommerce/components/reviews/with_summary_chart.jsx'
import Footer from '../components/marketing/sections/footers/4_column_with_company_mission.jsx';
import Header from './header/index.jsx'
import HeaderCategories from '../components/ecommerce/components/store-navigation/with_simple_menu_and_promo.jsx'

function Main() {

  return (
    <>
    <Header />
      <ViewProduct  productId={useParams()}/>
      <Comments  productId={useParams()} />
      <Footer/>
    </>
  );
}

export default Main;
