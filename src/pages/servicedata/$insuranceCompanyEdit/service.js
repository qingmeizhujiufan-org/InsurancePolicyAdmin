import request from 'utils/request';

export async function queryDetail(params) {
    return request('/insuranceCompany/queryDetail', {
        method: 'GET',
        params,
    });
}

export async function update(params) {
    return request('/insuranceCompany/update', {
        method: 'POST',
        data: params,
    });
}
