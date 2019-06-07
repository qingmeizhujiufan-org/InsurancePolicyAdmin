const Menu = [{
    key: '000',
    iconType: 'idcard',
    label: '业务员管理',
    children: [{
        key: '000_1',
        link: '/frame/staff/list',
        label: '业务员列表'
    }, {
        key: '000_2',
        link: '/frame/staff/detail',
        label: '业务员详情'
    }]
}, {
    key: '001',
    iconType: 'setting',
    label: '客户录入',
    children: [{
        key: '001_1',
        link: '/frame/custom/add',
        label: '个人中心'
    }]
}, {
    key: '002',
    iconType: 'idcard',
    label: '产品管理',
    children: [{
        key: '002_1',
        link: '/frame/product/list',
        label: '产品列表'
    }, {
        key: '002_2',
        link: '/frame/product/add',
        label: '新增产品'
    }]
}, {
    key: '003',
    iconType: 'setting',
    label: '个人设置',
    children: [{
        key: '003_1',
        link: '/frame/setting/center',
        label: '个人中心'
    }]
}];

export default Menu;