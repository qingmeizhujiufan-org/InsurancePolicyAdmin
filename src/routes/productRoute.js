import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Loadable from 'react-loadable';
import Loading from './loading';

import App from '../modules/App';

/* 用户管理 */
const ProductList = Loadable({
    loader: () => import("../modules/product/component/productList"),
    loading: Loading
});
const ProductDetail = Loadable({
    loader: () => import("../modules/product/component/productDetail"),
    loading: Loading
});
const ProductEdit = Loadable({
    loader: () => import("../modules/product/component/productEdit"),
    loading: Loading
});
const ProductAdd = Loadable({
    loader: () => import("../modules/product/component/productAdd"),
    loading: Loading
});

module.exports = (
    <Route path="product" component={App}>
        <IndexRoute component={ProductList}/>
        <Route path="list" component={ProductList}/>
        <Route path="add" component={ProductAdd}/>
        <Route path="list/detail/:id" component={ProductDetail}/>
        <Route path="list/edit/:id" component={ProductEdit}/>
    </Route>
);
