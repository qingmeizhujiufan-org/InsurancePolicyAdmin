/*
* created by zhongzheng at 2019/6/16.
* */

import store from 'store';
import {getFlatMenu} from 'utils/util';

export default {
    namespace: 'app',

    state: {
        user: store.get('user') || {},
        collapsed: store.get('collapsed') || false,
        locationPathname: '',
        isLoaded: false,
        authMenu: [],
        defaultOpenKeys: [],
        defaultSelectedKeys: [],
        selectedKeys: '',
    },

    effects: {
        * setAuthMenu({payload, ...location}, {put, call, select}) {
            const {locationPathname} = yield select(state => state.app);
            yield put({
                type: 'setState',
                payload
            });

            yield put({
               type: 'selectActiveTab',
               payload: {
                   pathname: locationPathname
               }
            });
        },

        * selectActiveTab({payload}, {put, call, select}) {
            const {pathname} = payload;
            const {authMenu} = yield select(state => state.app);
            if(authMenu.length > 0) {
                const menu = getFlatMenu(authMenu);
                let i = 0;
                for (; i < menu.length; i++) {
                    const item = menu[i];
                    if (pathname.indexOf(item.link) > -1) {
                        yield put({
                            type: 'setState',
                            payload: {selectedKeys: item.key}
                        });
                        return;
                    }
                }
                // if(i === menu.length) {
                //     yield put({
                //         type: 'setState',
                //         payload: {selectedKeys: '000_1'}
                //     });
                // }
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
        saveUserInfo(state, {payload}) {
            console.log('saveUserInfo == ', payload);
            store.set('user', payload);
            return {
                ...state,
                user: payload,
            }
        },
        onCollapseChange(state, {payload}) {
            store.set('collapsed', payload);
            return {
                ...state,
                collapsed: payload
            }
        },
    },

    subscriptions: {
        setupHistory({dispatch, history}) {
            history.listen(location => {
                console.log('history.listen == ', location);
                dispatch({
                    type: 'setState',
                    payload: {
                        locationPathname: location.pathname
                    }
                });
                dispatch({
                    type: 'selectActiveTab',
                    payload: {
                        pathname: location.pathname
                    }
                })
            })
        },
    },
}
