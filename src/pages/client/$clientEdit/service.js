import request from 'utils/request';

export async function queryDetail(params) {
    return request('/custom/queryOne', {
        method: 'GET',
        params,
    });
}

export async function queryUserList(params) {
    return request('/user/queryList', {
        method: 'GET',
        params,
    });
}

export async function update(params) {
    return request('/custom/update', {
        method: 'POST',
        data: params,
    });
}
