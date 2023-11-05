import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Filters from '../components/ecommerce/components/category-filters/with_inline_actions_and_expandable_sidebar_filters.jsx';
import Cards from '../components/Cards.jsx';
import Cards1 from '../components/ecommerce/components/product-lists/with_border_grid.jsx'

function HomePage() {
  return (
    <>
        <Routes>
            <Route element={<Filters />}>
                <Route index element={<Cards1 />} />
            </Route>
        </Routes>
    </>
  );
}

export default HomePage;
