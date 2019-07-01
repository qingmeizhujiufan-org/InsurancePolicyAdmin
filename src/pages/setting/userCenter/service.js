import request from 'utils/request';

export async function update(params) {
    return request('/admin/update', {
        method: 'POST',
        data: params,
    });
}
