import request from 'utils/request';

export async function queryList(params) {
    return request('/user/queryList', {
        method: 'GET',
        params,
    });
}
