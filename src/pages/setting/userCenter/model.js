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

                //修改全局头像
                if (backData.avatarSrc && backData.avatarSrc[0]) {
                    const {user} = yield select(state => state.app);
                    const {id, fileType} = backData.avatarSrc[0];
                    yield put({
                        type: 'app/saveUserInfo',
                        payload: {
                            ...user,
                            File: {
                                id,
                                fileType
                            }
                        }
                    });
                }

                if (callback && typeof callback === 'function') callback(backData);
            } else {
                message.error('查询失败');
            }
        },

        /* 更新用户信息 */
        * update({payload, callback}, {put, call, select}) {
            yield put({
                type: 'setState', payload: {
                    submitLoading: true,
                    submitLoadingPwd: true
                }
            });
            const data = yield call(update, payload);
            yield put({
                type: 'setState', payload: {
                    submitLoading: false,
                    submitLoadingPwd: false
                }
            });
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: '个人信息更新成功！'
                });

                if (callback && typeof callback === 'function') {
                    callback();
                }
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
