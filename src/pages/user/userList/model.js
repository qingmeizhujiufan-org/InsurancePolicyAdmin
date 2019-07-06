import {routerRedux} from 'dva/router';
import {queryList} from './service';
import {message} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'userList',

    state: {
        loading: false,
        dataSource: [],
        pagination: {total: 0},
        params: {
            pageNumber: 1,
            pageSize: 10,
        },
        keyWords: ''
    },

    effects: {
        /* 查询业务员列表 */
        * queryList({payload}, {put, call, select}) {
            yield put({
                type: 'setState',
                payload: {loading: true}
            });
            const data = yield call(queryList, payload);
            yield put({
                type: 'setState',
                payload: {loading: false}
            });
            console.log('queryList data == ', data);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.totalElements;
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

        /* 搜索 */
        * onSearch({payload}, {put, call, select}) {
            const {keyWords} = payload;

            yield put({
                type: 'setState',
                payload: {
                    params: {
                        pageNumber: 1,
                        pageSize: 10,
                    },
                    keyWords
                }
            });
            yield put({
                type: 'queryList',
                payload: {
                    pageNumber: 1,
                    pageSize: 10,
                    keyWords
                }
            });
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
            // history.listen(({pathname}) => {
            //             //     if (
            //             //         pathMatchRegexp('/user', pathname) ||
            //             //         pathMatchRegexp('/user/list', pathname)
            //             //     ) {
            //             //         dispatch({type: 'queryList'});
            //             //     }
            //             // })
        },
    },
}
