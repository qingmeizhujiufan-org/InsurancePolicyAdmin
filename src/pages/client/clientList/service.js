import request from 'utils/request';

export async function queryCustomList(params) {
    return request('/custom/queryList', {
        method: 'GET',
        params,
    });
}
