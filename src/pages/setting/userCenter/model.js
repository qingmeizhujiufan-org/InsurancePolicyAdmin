import {queryOneUser, update} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'userCenter',

    state: {
        fileList: [],
        submitLoading: false,
        submitLoadingPwd: false,
    },

    effects: {
        /* 查询详情 */
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

        /* 更新用户信息 */
        * update({payload}, {put, call, select}) {
            const {user, ...params} = payload;
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(update, params);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                yield put({
                    type: 'app/saveUserInfo',
                    payload: user
                });

                notification.success({
                    message: '提示',
                    description: '个人信息更新成功！'
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
