import {queryInsuranceCompanyList, queryChannelList, delCompany, delChannel} from './service';
import {message, notification} from "antd";
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
            yield put({type: 'setState', payload: {loading_1: true}});
            const data = yield call(queryInsuranceCompanyList, payload);
            yield put({type: 'setState', payload: {loading_1: false}});
            if (data.success) {
                const backData = data.backData;
                const content = backData.content;
                const total = backData.totalElements;
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
            yield put({type: 'setState', payload: {loading_2: true}});
            const data = yield call(queryChannelList, payload);
            yield put({type: 'setState', payload: {loading_2: false}});
            if (data.success) {
                const backData = data.backData;
                const content = backData.content;
                const total = backData.totalElements;
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

        /* 删除 */
        * delete({payload}, {put, call, select}) {
            const {id, type} = payload;

            if (type === 'company') {
                const data = yield call(delCompany, {id});
                if (data.success) {
                    yield put({
                        type: 'onSearch',
                        payload: {
                            keyWords_1: '',
                            type
                        }
                    });

                    notification.success({
                        message: '提示',
                        description: '删除保险公司成功！'
                    });
                } else {
                    message.error(data.backMsg);
                }
            } else if (type === 'channel') {
                const data = yield call(delChannel, {id});
                if (data.success) {
                    yield put({
                        type: 'onSearch',
                        payload: {
                            keyWords_2: '',
                            type
                        }
                    });

                    notification.success({
                        message: '提示',
                        description: '删除渠道成功！'
                    });
                } else {
                    message.error(data.backMsg);
                }
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
