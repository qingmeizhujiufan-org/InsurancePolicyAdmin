import request from 'utils/request';

export async function queryInsuranceCompanyList(params) {
    return request('/insuranceCompany/queryList', {
        method: 'GET',
        params,
    });
}

export async function queryChannelList(params) {
    return request('/channel/queryList', {
        method: 'GET',
        params,
    });
}

export async function queryClientList(params) {
    return request('/custom/queryList', {
        method: 'GET',
        params,
    });
}

export async function add(params) {
    return request('/order/add', {
        method: 'POST',
        data: params,
    });
}
