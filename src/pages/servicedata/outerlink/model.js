import {queryDetail, update} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'outerLink',

    state: {
        data: {},
        loading: false,
        submitLoading: false
    },

    effects: {
        /* 查询链接 */
        * queryDetail({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryDetail, payload);
            yield put({
                type: 'setState',
                payload: {loading: false}
            });
            if (data.success) {

                yield put({
                    type: 'setState',
                    payload: {
                        data: data.backData
                    }
                });
            } else {
                message.error('查询失败');
            }
        },

        /* 更新链接信息 */
        * update({payload}, {put, call, select}) {
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(update, payload);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: '更新成功！'
                });
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
