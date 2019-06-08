import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Loadable from 'react-loadable';
import Loading from './loading';

import App from '../modules/App';

/* 客户管理 */
const ProductList = Loadable({
    loader: () => import("../modules/client/component/clientList"),
    loading: Loading
});
const ProductEdit = Loadable({
    loader: () => import("../modules/client/component/clientEdit"),
    loading: Loading
});
const ProductAdd = Loadable({
    loader: () => import("../modules/client/component/clientAdd"),
    loading: Loading
});

module.exports = (
    <Route path="client" component={App}>
        <IndexRoute component={ProductList}/>
        <Route path="list" component={ProductList}/>
        <Route path="add" component={ProductAdd}/>
        <Route path="list/edit/:id" component={ProductEdit}/>
    </Route>
);
