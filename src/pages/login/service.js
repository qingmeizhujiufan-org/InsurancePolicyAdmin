import request from 'utils/request';

export async function login(params) {
    return request('/admin/login', {
        method: 'POST',
        data: params,
    });
}
