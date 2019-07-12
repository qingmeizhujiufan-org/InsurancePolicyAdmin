import {routerRedux} from 'dva/router';
import {queryUserList, add} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'clientAdd',

    state: {
        dataSource: [],
        submitLoading: false
    },

    effects: {
        /* 查询业务员列表 */
        * queryUserList({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryUserList, payload);
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
                        dataSource: content
                    }
                });
            } else {
                message.error('查询列表失败');
            }
        },

        /* 新增保险公司 */
        * add({payload}, {put, call, select}) {
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(add, payload);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: '新增客户成功！'
                });

                yield put(routerRedux.push('/client/list'));
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
