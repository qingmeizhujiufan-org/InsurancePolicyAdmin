import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {
    notification,
    Icon,
    Divider,
    Breadcrumb,
    Button,
    message,
    Dropdown,
    Menu,
    Switch,
    Row,
    Col,
    Input,
    Modal
} from 'antd';
import {Table, Card} from 'zui';
import assign from 'lodash/assign';
import axios from "Utils/axios";
import '../index.less';

const Search = Input.Search;

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '昵称',
                width: 200,
                align: 'center',
                dataIndex: 'nickname',
                key: 'nickname',
                render: (text, record, index) => (
                    <Link to={this.onDetail(record.id)}>{text}</Link>
                )
            }, {
                title: '真实姓名',
                width: 200,
                align: 'center',
                dataIndex: 'realname',
                key: 'realname',
            }, {
                title: '个人手机号',
                width: 150,
                align: 'center',
                dataIndex: 'telephone',
                key: 'telephone',
            }, {
                title: '生日',
                width: 150,
                align: 'center',
                dataIndex: 'birthday',
                key: 'birthday',
            }, {
                title: '是否冻结',
                width: 120,
                align: 'center',
                dataIndex: 'isFrozen',
                key: 'isFrozen',
                render: (text, record, index) => (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        checked={text === 1 ? true : false}
                        onChange={checked => this.onFrozenChange(checked, record, index)}
                    />
                )
            }, {
                title: '创建时间',
                width: 200,
                align: 'center',
                dataIndex: 'created_at',
                key: 'created_at'
            }, {
                title: '更新时间',
                width: 200,
                align: 'center',
                dataIndex: 'updated_at',
                key: 'updated_at'
            }, {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
            }, {
                title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
                key: 'operation',
                fixed: 'right',
                width: 180,
                align: 'center',
                render: (text, record, index) => (
                    <div>
                        <a onClick={() => this.resetPassword(record.id)}>重置密码</a>
                        <Divider type="vertical"/>
                        <Dropdown
                            placement="bottomCenter"
                            overlay={
                                <Menu>
                                    <Menu.Item>
                                        <Link to={this.onDetail(record.id)}>查看</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to={this.onEdit(record.id)}>编辑</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a onClick={() => this.onDelete(record.id)}>删除</a>
                                    </Menu.Item>
                                </Menu>
                            }
                        >
                            <a className="ant-dropdown-link">操作</a>
                        </Dropdown>
                    </div>
                )
            }];

        this.state = {
            loading: false,
            dataSource: [],
            pagination: {},
            params: {
                pageNumber: 1,
                pageSize: 10,
            },
            keyWords: ''
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.queryList();
    }

    queryList = () => {
        const {params, keyWords} = this.state;
        const param = assign({}, params, {keyWords});
        this.setState({loading: true});
        axios.get('user/queryList', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData && data.backData.content) {
                    const backData = data.backData.content;
                    const total = backData.length;
                    backData.map(item => {
                        item.key = item.id;
                    });

                    this.setState({
                        dataSource: backData,
                        pagination: {total}
                    });
                } else {
                    this.setState({
                        dataSource: [],
                        pagination: {total: 0}
                    });
                }
            } else {
                message.error('查询列表失败');
            }
            this.setState({loading: false});
        });
    }

    // 处理分页变化
    handlePageChange = param => {
        const params = assign({}, this.state.params, param);
        this.setState({params}, () => {
            this.queryList();
        });
    }

    // 搜索
    onSearch = (value, event) => {
        console.log('onsearch value == ', value);
        this.setState({
            params: {
                pageNumber: 1,
                pageSize: 10,
            },
            keyWords: value
        }, () => {
            this.queryList();
        });
    }

    resetPassword = (id) => {
        Modal.confirm({
            title: '提示',
            content: '确认要重置密码吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const param = {
                    id: id,
                    updateBy: sessionStorage.getItem('userName')
                };
                param.id = id;
                axios.post('admin/resetPassword', param).then(res => res.data).then(data => {
                    if (data.success) {
                        notification.success({
                            message: '提示',
                            description: data.backMsg
                        });
                    } else {
                        message.error(data.backMsg);
                    }
                })
            }
        });
    }

    onDetail = id => {
        return `/frame/user/list/detail/${id}`
    }

    onEdit = id => {
        return `/frame/user/list/edit/${id}`
    }

    onFrozenChange = (checked, record, index) => {
        const param = {
            id: record.id,
            isFrozen: checked ? 1 : 0,
            updateBy: sessionStorage.getItem('userName')
        };

        axios.post('admin/frozen', param).then(res => res.data).then(data => {
            if (data.success) {
                notification.success({
                    message: '提示',
                    description: data.backMsg
                });
                const dataSource = this.state.dataSource;
                dataSource[index].isFrozen = checked ? 1 : 0;
                this.setState({dataSource});
            } else {
                message.error(data.backMsg);
            }
        })
    }

    onDelete = id => {
        Modal.confirm({
            title: '提示',
            content: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                let param = {};
                param.id = id;
                axios.post('admin/delete', param).then(res => res.data).then(data => {
                    if (data.success) {
                        notification.success({
                            message: '提示',
                            description: '删除成功！'
                        });

                        this.setState({
                            params: {
                                pageNumber: 1,
                                pageSize: 10
                            }
                        }, () => {
                            this.queryList();
                        });
                    } else {
                        message.error(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        const {dataSource, pagination, loading} = this.state;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>保险公司管理</Breadcrumb.Item>
                            <Breadcrumb.Item>保险公司列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>保险公司列表</h1>
                    <div className='search-area'>
                        <Row type='flex' justify="center" align="middle">
                            <Col span={8}>
                                <Search
                                    placeholder="搜索保险公司名称"
                                    enterButton='搜索'
                                    size="large"
                                    onSearch={this.onSearch}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='pageContent'>
                    <Card>
                        <Table
                            columns={this.columns}
                            dataSource={dataSource}
                            pagination={pagination}
                            loading={loading}
                            scroll={{x: 1500}}
                            handlePageChange={this.handlePageChange}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;
