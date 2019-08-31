import store from 'store';
import {queryOneUser, queryCustomList, queryOrderList, delClient, delOrder} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'userDetail',

    state: {
        loading: false,
        loadingCustom: false,
        loadingOrder: false,
        activeTabKey: store.get('userDetail/activeTabKey') || '1',
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
            const {pageNumber, pageSize} = payload;
            const data = yield call(queryCustomList, payload);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.totalElements;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSourceCustom: content,
                        paginationCustom: {total},
                        paramsCustom: {
                            pageNumber,
                            pageSize
                        }
                    }
                });
            } else {
                message.error('查询客户列表失败');
            }
        },

        /* 查询订单列表 */
        * queryOrderList({payload}, {put, call, select}) {
            console.log('queryList payload == ', payload);
            const {pageNumber, pageSize} = payload;
            const data = yield call(queryOrderList, payload);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.totalElements;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSourceOrder: content,
                        paginationOrder: {total},
                        paramsOrder: {
                            pageNumber,
                            pageSize
                        }
                    }
                });
            } else {
                message.error('查询订单列表失败');
            }
        },

        /* 删除 */
        * delete({payload}, {put, call, select}) {
            const {id, type, userId} = payload;

            if (type === 'client') {
                const data = yield call(delClient, {id});
                if (data.success) {
                    yield put({
                        type: 'queryCustomList',
                        payload: {
                            pageNumber: 1,
                            pageSize: 10,
                            userId
                        }
                    });

                    notification.success({
                        message: '提示',
                        description: '删除客户成功！'
                    });
                } else {
                    message.error(data.backMsg);
                }
            } else if (type === 'order') {
                const data = yield call(delOrder, {id});
                if (data.success) {
                    yield put({
                        type: 'queryOrderList',
                        payload: {
                            pageNumber: 1,
                            pageSize: 10,
                            userId
                        }
                    });

                    notification.success({
                        message: '提示',
                        description: '删除订单成功！'
                    });
                } else {
                    message.error(data.backMsg);
                }
            }
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
