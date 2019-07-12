import {queryDetail, update} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'insuranceCompanyEdit',

    state: {
        loading: false,
        submitLoading: false,
        data: {}
    },

    effects: {
        /* 查询保险详情 */
        * queryDetail({payload, callback}, {put, call, select}) {
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
                const backData = data.backData;
                yield put({
                    type: 'setState',
                    payload: {
                        data: backData,
                    }
                });

                if (callback && typeof callback === 'function') callback(backData);
            } else {
                message.error('查询失败');
            }
        },

        /* 更新保险公司 */
        * update({payload}, {put, call, select}) {
            console.log('queryList payload == ', payload);
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(update, payload);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: '更新保险公司信息成功！'
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
