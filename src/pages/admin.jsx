import React from 'react';
import AdminOutlet from "../pages/admin/admin_outlet"
import { Route, Link, Routes } from 'react-router-dom';


import Details from "../pages/admin/detals"
import ProductList from "../pages/admin/product_list"

function Main() {

return (
<>

<Routes>
    <Route element={<AdminOutlet />}>
        <Route path="/admin/activity" index element={<ProductList />} />
        <Route path="/admin/details" element={<Details />} />
    </Route>
</Routes>
</>
);
}

export default Main;
