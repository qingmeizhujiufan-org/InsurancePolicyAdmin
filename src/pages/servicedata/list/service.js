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

export async function delCompany(params) {
    return request('/insuranceCompany/delete', {
        method: 'POST',
        data: params,
    });
}

export async function delChannel(params) {
    return request('/channel/delete', {
        method: 'POST',
        data: params,
    });
}
