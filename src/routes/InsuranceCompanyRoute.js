import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Loadable from 'react-loadable';
import Loading from './loading';

import App from '../modules/App';

/* 保险公司管理 */
const InsuranceCompanyList = Loadable({
    loader: () => import("../modules/insurancecompany/component/insuranceCompanyList"),
    loading: Loading
});
const InsuranceCompanyEdit = Loadable({
    loader: () => import("../modules/insurancecompany/component/insuranceCompanyEdit"),
    loading: Loading
});
const InsuranceCompanyAdd = Loadable({
    loader: () => import("../modules/insurancecompany/component/insuranceCompanyAdd"),
    loading: Loading
});

module.exports = (
    <Route path="insurancecompany" component={App}>
        <IndexRoute component={InsuranceCompanyList}/>
        <Route path="list" component={InsuranceCompanyList}/>
        <Route path="add" component={InsuranceCompanyAdd}/>
        <Route path="list/edit/:id" component={InsuranceCompanyEdit}/>
    </Route>
);
