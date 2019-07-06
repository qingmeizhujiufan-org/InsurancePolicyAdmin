import request from 'utils/request';

export async function queryOneUser(params) {
    return request('/admin/queryOneUser', {
        method: 'GET',
        params,
    });
}

export async function update(params) {
    return request('/admin/update', {
        method: 'POST',
        data: params,
    });
}
