import request from 'utils/request';

export async function queryDetail(params) {
    return request('/channel/queryDetail', {
        method: 'GET',
        params,
    });
}

export async function update(params) {
    return request('/channel/update', {
        method: 'POST',
        data: params,
    });
}
