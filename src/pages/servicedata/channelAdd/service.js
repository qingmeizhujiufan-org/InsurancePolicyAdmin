import request from 'utils/request';

export async function add(params) {
    return request('/channel/add', {
        method: 'POST',
        data: params,
    });
}
