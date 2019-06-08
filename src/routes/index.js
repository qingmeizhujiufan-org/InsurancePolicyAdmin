import React from 'react';
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import Loadable from 'react-loadable';
import Loading from './loading';

/* 引入模块路由 */

import UserRoute from './userRoute';
import productRoute from './productRoute';

const App = Loadable({
    loader: () => import('../modules/App'),
    loading: Loading
});
const Frame = Loadable({
    loader: () => import('../modules/Frame'),
    loading: Loading
});

/* 登录 */
const Login = Loadable({
    loader: () => import('../modules/login/component/index'),
    loading: Loading
});

/* 个人设置 */
const SettingList = Loadable({
    loader: () => import("../modules/setting/component/userCenter"),
    loading: Loading
});

const requireAuth = (nextState, replace) => {
    // if (!sessionStorage.expireDate || new Date(sessionStorage.expireDate).getTime() <= new Date().getTime()) {
    //     replace({pathname: '/'})
    // }
}

class PageRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {

    }

    componentDidMount = () => {
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Login}/>
                    <Route path="login" component={Login}/>
                    <Route path="frame(/*)" component={Frame} onEnter={requireAuth}>
                        {/* <IndexRoute component={UserRoute}/> */}
                        {UserRoute}
                        {productRoute}
                        <Route path="setting" component={App}>
                            <IndexRoute component={SettingList}/>
                            <Route path="list" component={SettingList}/>
                        </Route>
                    </Route>
                </Route>
            </Router>
        )
    }
}

export default PageRouter;
