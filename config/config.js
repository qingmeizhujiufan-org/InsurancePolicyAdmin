/* created by zhongzheng at 2019/6/8 */

import {resolve} from 'path';
import customTheme from '../src/utils/customTheme';

export default {
    base: './',
    publicPath: './',
    history: 'hash',
    treeShaking: true,
    // 路由配置
    routes: [
        {
            path: '/',
            component: '../layouts/BlankLayout',
            routes: [{
                path: '/login',
                component: './login',
            }, {
                path: '/',
                component: '../layouts/FrameLayout',
                Routes: ['src/pages/Authorized'],
                routes: [{
                    path: '/user',
                    name: 'user',
                    routes: [{
                        name: 'list',
                        path: '/user/list',
                        component: './user/userList',
                    }, {
                        name: 'userDetail',
                        path: '/user/list/detail/:id',
                        component: './user/$userDetail',
                    }, {
                        name: 'userEdit',
                        path: '/user/edit/:id',
                        component: './user/$userEdit',
                    }]
                }, {
                    path: '/client',
                    name: 'client',
                    routes: [{
                        name: 'list',
                        path: '/client/list',
                        component: './client/clientList',
                    }, {
                        name: 'clientEdit',
                        path: '/client/edit/:id',
                        component: './client/$clientEdit',
                    }, {
                        name: 'add',
                        path: '/client/add',
                        component: './client/clientAdd',
                    }]
                }, {
                    path: '/insurancecompany',
                    name: 'insurancecompany',
                    routes: [{
                        name: 'list',
                        path: '/insurancecompany/list',
                        component: './client/clientList',
                    }, {
                        name: 'insurancecompanyEdit',
                        path: '/insurancecompany/edit/:id',
                        component: './insurancecompany/$insurancecompanyEdit',
                    }, {
                        name: 'add',
                        path: '/insurancecompany/add',
                        component: './insurancecompany/insurancecompanyAdd',
                    }]
                }]
            }]
        }
    ],
    theme: customTheme,
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: {
                    immer: true,
                },
                locale: {
                    enable: true,
                    default: 'zh-CN',
                    baseNavigator: true,
                },
                dynamicImport: {
                    loadingComponent: './components/PageLoading/index',
                    webpackChunkName: true,
                    level: 3,
                },
                dll: {
                    include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
                },
            },
        ],
    ],
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    disableRedirectHoist: true,
    cssLoaderOptions: {
        modules: true,
        getLocalIdent: (
            context,
            localIdentName,
            localName,
        ) => localName,
    },
    alias: {
        zui: resolve(__dirname, '../src/components/zui'),
        utils: resolve(__dirname, '../src/utils'),
        Comps: resolve(__dirname, '../src/components/'),
        host: resolve(__dirname, '../src/actions/RestUrl'),
        Img: resolve(__dirname, '../src/assets/img/'),
    },
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'lodash',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lodash',
        ],
    ],
    // proxy: {
    //   '/api/': {
    //     target: 'http://127.0.0.1:7001/',
    //     changeOrigin: true
    //   },
    // },
};
