import {routerRedux} from 'dva/router';
import {queryOneUser, queryCustomList, queryOrderList} from './service';
import {message} from "antd";
import {pathMatchRegexp} from 'utils/util';
import {queryList} from "../userList/service";

export default {
    namespace: 'userDetail',

    state: {
        loading: false,
        userInfo: {},
        dataSourceCustom: [],
        dataSourceOrder: [],
        paginationCustom: {total: 0},
        paginationOrder: {total: 0},
        paramsCustom: {
            pageNumber: 1,
            pageSize: 10,
        },
        paramsOrder: {
            pageNumber: 1,
            pageSize: 10,
        },
    },

    effects: {
        /* 查询业务员详情 */
        * queryOneUser({payload, callback}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryOneUser, payload);
            yield put({
                type: 'setState',
                payload: {loading: false}
            });
            if (data.success) {
                const backData = data.backData;
                yield put({
                    type: 'setState',
                    payload: {
                        userInfo: backData,
                    }
                });

                if (callback && typeof callback === 'function') callback(backData);
            } else {
                message.error('查询失败');
            }
        },

        /* 查询客户列表 */
        * queryCustomList({payload}, {put, call, select}) {
            console.log('queryList payload == ', payload);
            const data = yield call(queryCustomList, payload);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.length;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSourceCustom: content,
                        paginationCustom: {total}
                    }
                });
            } else {
                message.error('查询客户列表失败');
            }
        },

        /* 查询订单列表 */
        * queryOrderList({payload}, {put, call, select}) {
            console.log('queryList payload == ', payload);
            const data = yield call(queryOrderList, payload);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.length;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSourceOrder: content,
                        paginationOrder: {total}
                    }
                });
            } else {
                message.error('查询订单列表失败');
            }
        },

        /* 搜索 */
        * onSearch({payload}, {put, call, select}) {
            const {keyWords} = payload;

            yield put({
                type: 'setState',
                payload: {
                    params: {
                        pageNumber: 1,
                        pageSize: 10,
                    },
                    keyWords
                }
            });
            yield put({
                type: 'queryList',
                payload: {
                    pageNumber: 1,
                    pageSize: 10,
                    keyWords
                }
            });
        },
    },

    reducers: {
        setState(state, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
    },

    subscriptions: {
        setup({dispatch, history}) {
            // history.listen(({pathname}) => {
            //             //     if (
            //             //         pathMatchRegexp('/user', pathname) ||
            //             //         pathMatchRegexp('/user/list', pathname)
            //             //     ) {
            //             //         dispatch({type: 'queryList'});
            //             //     }
            //             // })
        },
    },
}
