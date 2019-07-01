import {routerRedux} from 'dva/router';
import {queryCustomList} from './service';
import {message} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'clientList',

    state: {
        loading: false,
        dataSource: [],
        pagination: {total: 0},
        params: {
            pageNumber: 1,
            pageSize: 10,
        },
        keyWords: ''
    },

    effects: {
        /* 查询所有客户列表 */
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
}
