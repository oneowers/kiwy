import React from 'react';
import { useParams } from 'react-router-dom';
import ViewProduct from '../components/ecommerce/components/product-overviews/with_image_gallery_and_expandable_details.jsx';
import Comments from '../components/ecommerce/components/reviews/with_summary_chart.jsx'

function Main() {

  return (
    <>
      <ViewProduct  productId={useParams()}/>
      <Comments />
    </>
  );
}

export default Main;
