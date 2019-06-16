import {routerRedux} from 'dva/router';
import {queryList} from './service';
import {message} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'userList',

    state: {
        loading: true,
        dataSource: [],
        pagination: {total: 0},
        params: {
            pageNumber: 1,
            pageSize: 10,
        },
        keyWords: ''
    },

    effects: {
        * queryList({payload}, {put, call, select}) {
            const data = yield call(queryList, payload);
            yield put({
                type: 'setState',
                payload: {
                    loading: false
                }
            });
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.length;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSource: content,
                        pagination: {total}
                    }
                });
            } else {
                message.error('查询列表失败');
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

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname}) => {
                if (
                    pathMatchRegexp('/user', pathname) ||
                    pathMatchRegexp('/user/list', pathname)
                ) {
                    dispatch({type: 'queryList'});
                }
            })
        },
    },
}
