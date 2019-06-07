const admin = {
    defaultOpenKeys: ['000', '001', '002', '003'],
    defaultSelectedKeys: ['000_1'],
    menu: [
        {
            key: '000',
            children: ['000_1', '000_2']
        }, {
            key: '001',
            children: ['001_1', '001_2']
        }, {
            key: '002',
            children: ['002_1', '002_2']
        }, {
            key: '003',
            children: ['003_1']
        }
    ]
};

module.exports = {
    admin
}
