/*
* created by zhongzheng at 2019/6/16.
* */

export default {
    namespace: 'app',

    state: {
        user: {},
        collapsed: false,
    },

    effects: {},

    reducers: {
        saveUserInfo(state, {payload}) {
            return {
                ...state,
                user: payload,
            }
        },
        onCollapseChange(state, {payload}) {
            return {
                ...state,
                collapsed: payload
            }
        },
    },

    subscriptions: {},
}
