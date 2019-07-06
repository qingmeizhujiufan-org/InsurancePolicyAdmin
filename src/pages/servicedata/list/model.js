import {routerRedux} from 'dva/router';
import {queryInsuranceCompanyList, queryChannelList} from './service';
import {message} from "antd";
import {pathMatchRegexp} from 'utils/util';

export default {
    namespace: 'list',

    state: {
        loading_1: false,
        loading_2: false,
        dataSource_1: [],
        dataSource_2: [],
        pagination_1: {total: 0},
        pagination_2: {total: 0},
        params_1: {
            pageNumber: 1,
            pageSize: 10,
        },
        params_2: {
            pageNumber: 1,
            pageSize: 10,
        },
        keyWords_1: '',
        keyWords_2: ''
    },

    effects: {
        /* 查询保险公司列表 */
        * queryInsuranceCompanyList({payload}, {put, call, select}) {
            const data = yield call(queryInsuranceCompanyList, payload);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.length;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSource_1: content,
                        pagination_1: {total}
                    }
                });
            } else {
                message.error('查询保险公司列表失败');
            }
        },

        /* 查询渠道列表 */
        * queryChannelList({payload}, {put, call, select}) {
            const data = yield call(queryChannelList, payload);
            if (data.success) {
                const backData = data.backData || [];
                const content = backData.content;
                const total = backData.length;
                yield put({
                    type: 'setState',
                    payload: {
                        dataSource_2: content,
                        pagination_2: {total}
                    }
                });
            } else {
                message.error('查询渠道列表失败');
            }
        },

        /* 搜索 */
        * onSearch({payload}, {put, call, select}) {
            const {keyWords_1, keyWords_2, type} = payload;

            if (type === 'company') {
                yield put({
                    type: 'setState',
                    payload: {
                        params_1: {
                            pageNumber: 1,
                            pageSize: 10,
                        },
                        keyWords_1
                    }
                });
                yield put({
                    type: 'queryInsuranceCompanyList',
                    payload: {
                        pageNumber: 1,
                        pageSize: 10,
                        keyWords: keyWords_1
                    }
                });
            } else if (type === 'channel') {
                yield put({
                    type: 'setState',
                    payload: {
                        params_1: {
                            pageNumber: 1,
                            pageSize: 10,
                        },
                        keyWords_2
                    }
                });
                yield put({
                    type: 'queryChannelList',
                    payload: {
                        pageNumber: 1,
                        pageSize: 10,
                        keyWords: keyWords_2
                    }
                });
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
