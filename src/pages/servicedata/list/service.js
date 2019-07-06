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
