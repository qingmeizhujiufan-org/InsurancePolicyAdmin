import request from 'utils/request';

export async function queryList(params) {
    return request('/insuranceCompany/queryList', {
        method: 'GET',
        params,
    });
}
