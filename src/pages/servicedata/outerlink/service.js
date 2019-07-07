import request from 'utils/request';

export async function queryDetail(params) {
    return request('/link/queryDetail', {
        method: 'GET',
        params,
    });
}

export async function update(params) {
    return request('/link/update', {
        method: 'POST',
        data: params,
    });
}
