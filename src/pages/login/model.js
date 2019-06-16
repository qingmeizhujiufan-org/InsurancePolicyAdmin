import {routerRedux} from 'dva/router';
import {login} from './service';
import {message} from "antd";

export default {
    namespace: 'login',

    state: {
        submitLoading: false
    },

    effects: {
        * login({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {
                    submitLoading: true,
                }
            });
            const data = yield call(login, payload);
            // const {locationQuery} = yield select(_ => _.app)
            // if (data.success) {
            //     const {from} = locationQuery
            //     yield put({type: 'app/query'})
            //     if (!pathMatchRegexp('/login', from)) {
            //         if (from === '/') router.push('/dashboard')
            //         else router.push(from)
            //     } else {
            //         router.push('/dashboard')
            //     }
            // } else {
            //     throw data
            // }
            if (data.success) {
                const backData = data.backData;

                sessionStorage.setItem('type', backData.roleId);
                sessionStorage.setItem('userId', backData.id);
                sessionStorage.setItem('userName', backData.userName);
                sessionStorage.setItem('realName', backData.realName);

                yield put({
                    type: 'setState',
                    payload: {
                        submitLoading: false,
                    }
                });
                /* 存储用户信息到全局 */
                yield put({
                    type: 'app/saveUserInfo',
                    payload: backData
                });

                yield put(routerRedux.push('/user/list'));
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
    }
}
