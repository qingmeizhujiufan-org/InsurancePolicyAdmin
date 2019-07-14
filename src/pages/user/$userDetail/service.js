import request from 'utils/request';

export async function queryOneUser(params) {
    return request('/user/queryOneUser', {
        method: 'GET',
        params,
    });
}

export async function queryCustomList(params) {
    return request('/custom/queryList', {
        method: 'GET',
        params,
    });
}

export async function queryOrderList(params) {
    return request('/order/queryList', {
        method: 'GET',
        params,
    });
}

export async function delClient(params) {
    return request('/custom/delete', {
        method: 'POST',
        data: params,
    });
}

export async function delOrder(params) {
    return request('/order/delete', {
        method: 'POST',
        data: params,
    });
}

