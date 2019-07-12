const Menu = [{
    key: '000',
    iconType: 'bank',
    label: '业务员管理',
    children: [{
        key: '000_1',
        link: '/user/list',
        label: '业务员列表'
    }]
}, {
    key: '001',
    iconType: 'usergroup-add',
    label: '客户管理',
    children: [{
        key: '001_1',
        link: '/client/list',
        label: '客户列表'
    }]
}, {
    key: '002',
    iconType: 'appstore',
    label: '业务数据管理',
    children: [{
        key: '002_1',
        link: '/servicedata/list',
        label: '业务数据列表'
    }, {
        key: '002_2',
        link: '/servicedata/addcompany',
        label: '新增保险公司'
    }, {
        key: '002_3',
        link: '/servicedata/addchannel',
        label: '新增渠道'
    }]
}, {
    key: '003',
    iconType: 'fork',
    label: '外部链接管理',
    children: [{
        key: '003_1',
        link: '/outerlink',
        label: '外部链接'
    }]
}, {
    key: '004',
    iconType: 'setting',
    label: '个人设置',
    children: [{
        key: '004_1',
        link: '/setting/userCenter',
        label: '个人中心'
    }]
}];

export default Menu;
