const Menu = [{
    key: '000',
    iconType: 'idcard',
    label: '业务员管理',
    children: [{
        key: '000_1',
        link: '/user/list',
        label: '业务员列表'
    }]
}, {
    key: '001',
    iconType: 'setting',
    label: '客户管理',
    children: [{
        key: '001_1',
        link: '/client/list',
        label: '客户列表'
    }, {
        key: '001_2',
        link: '/client/add',
        label: '新增客户'
    }]
}, {
    key: '002',
    iconType: 'idcard',
    label: '业务数据管理',
    children: [{
        key: '002_1',
        link: '/insurancecompany/list',
        label: '保险公司列表'
    }, {
        key: '002_2',
        link: '/insurancecompany/add',
        label: '新增保险公司'
    }]
}, {
    key: '003',
    iconType: 'setting',
    label: '个人设置',
    children: [{
        key: '003_1',
        link: '/setting/userCenter',
        label: '个人中心'
    }]
}];

export default Menu;
