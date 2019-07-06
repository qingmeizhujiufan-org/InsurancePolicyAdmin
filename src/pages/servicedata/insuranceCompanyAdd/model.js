import {routerRedux} from 'dva/router';
import {add} from './service';
import {message, notification} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'insuranceCompanyAdd',

    state: {
        fileList: [],
        submitLoading: false
    },

    effects: {
        /* 新增保险公司 */
        * add({payload}, {put, call, select}) {
            console.log('queryList payload == ', payload);
            yield put({type: 'setState', payload: {submitLoading: true}});
            const data = yield call(add, payload);
            yield put({type: 'setState', payload: {submitLoading: false}});
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: '新增保险公司成功！'
                });

                yield put(routerRedux.push('/servicedata/list'));
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
