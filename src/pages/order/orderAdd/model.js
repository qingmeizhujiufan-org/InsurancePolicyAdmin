import {routerRedux} from 'dva/router';
import {queryInsuranceCompanyList, queryChannelList, queryClientList, add} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'orderAdd',

    state: {
        userId: null,
        dataSource_company: [],
        dataSource_channel: [],
        dataSource_client: [],
        submitLoading: false
    },

    effects: {
        /* 查询保险公司列表 */
        * queryInsuranceCompanyList({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryInsuranceCompanyList, payload);
            yield put({
                type: 'setState',
                payload: {loading: false}
            });
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;

                yield put({
                    type: 'setState',
                    payload: {
                        dataSource_company: content
                    }
                });
            } else {
                message.error('查询客户列表失败');
            }
        },

        /* 查询渠道列表 */
        * queryChannelList({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryChannelList, payload);
            yield put({
                type: 'setState',
                payload: {loading: false}
            });
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;

                yield put({
                    type: 'setState',
                    payload: {
                        dataSource_channel: content
                    }
                });
            } else {
                message.error('查询客户列表失败');
            }
        },

        /* 查询指定业务员下客户列表 */
        * queryClientList({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryClientList, payload);
            yield put({
                type: 'setState',
                payload: {loading: false}
            });
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;

                yield put({
                    type: 'setState',
                    payload: {
                        dataSource_client: content
                    }
                });
            } else {
                message.error('查询客户列表失败');
            }
        },

        /* 新增订单 */
        * add({payload}, {put, call, select}) {
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(add, payload);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: '新增订单成功！'
                });

                yield put(routerRedux.goBack());
            } else {
                message.error(data.backMsg);
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
