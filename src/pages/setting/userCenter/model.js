import {update} from './service';
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
        /* 更新用户信息 */
        * update({payload}, {put, call, select}) {
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(update, payload);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                yield put({
                    type: 'app/saveUserInfo',
                    payload: payload.user
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
