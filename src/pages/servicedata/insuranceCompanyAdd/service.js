import request from 'utils/request';

export async function add(params) {
    return request('/insuranceCompany/add', {
        method: 'POST',
        data: params,
    });
}
