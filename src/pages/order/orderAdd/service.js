import request from 'utils/request';

export async function queryUserList(params) {
    return request('/user/queryList', {
        method: 'GET',
        params,
    });
}

export async function add(params) {
    return request('/custom/add', {
        method: 'POST',
        data: params,
    });
}
