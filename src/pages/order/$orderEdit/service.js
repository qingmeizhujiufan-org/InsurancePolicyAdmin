import request from 'utils/request';

export async function queryDetail(params) {
    return request('/order/queryOne', {
        method: 'GET',
        params,
    });
}

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

export async function update(params) {
    return request('/order/update', {
        method: 'POST',
        data: params,
    });
}
