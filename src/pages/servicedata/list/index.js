import React from 'react';
import router from 'umi/router';
import Link from 'umi/link';
import {
    Icon,
    Breadcrumb,
    Row,
    Col,
    Input,
    Button,
    Menu,
    Dropdown,
    Modal
} from 'antd';
import {Table, Card} from 'zui';
import {connect} from "dva";
import _assign from 'lodash/assign';
import '../index.less';

const Search = Input.Search;

@connect(state => state.list)
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columns_1 = [
            {
                title: '公司名称',
                width: 200,
                align: 'center',
                dataIndex: 'companyName',
                key: 'companyName'
            }, {
                title: '热线电话',
                width: 200,
                align: 'center',
                dataIndex: 'hotLine',
                key: 'hotLine',
            }, {
                title: '备注',
                align: 'center',
                dataIndex: 'mark',
                key: 'mark',
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
                title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
                key: 'operation',
                fixed: 'right',
                width: 180,
                align: 'center',
                render: (text, record, index) => (
                    <Dropdown
                        placement="bottomCenter"
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link to={this.onEdit(record.id, 'company')}>编辑</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={() => this.onDelete(record, 'company')}>删除</a>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <a className="ant-dropdown-link">操作</a>
                    </Dropdown>
                )
            }
        ];

        this.columns_2 = [
            {
                title: '渠道名称',
                width: 200,
                align: 'center',
                dataIndex: 'channelName',
                key: 'channelName'
            }, {
                title: '备注',
                align: 'center',
                dataIndex: 'mark',
                key: 'mark',
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
                title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
                key: 'operation',
                fixed: 'right',
                width: 180,
                align: 'center',
                render: (text, record, index) => (
                    <Dropdown
                        placement="bottomCenter"
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link to={this.onEdit(record.id, 'channel')}>编辑</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={() => this.onDelete(record, 'channel')}>删除</a>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <a className="ant-dropdown-link">操作</a>
                    </Dropdown>
                )
            }
        ];
    }


    componentDidMount = () => {
        const {
            dispatch,
            params_1,
            params_2,
            keyWords_1,
            keyWords_2
        } = this.props;

        dispatch({
            type: 'list/queryInsuranceCompanyList',
            payload: {
                ...params_1,
                keyWords: keyWords_1
            }
        });

        dispatch({
            type: 'list/queryChannelList',
            payload: {
                ...params_2,
                keyWords: keyWords_2
            }
        });
    }

    // 处理分页变化
    handlePageChange = (param, type) => {
        const {dispatch, params_1, params_2, keyWords_1, keyWords_2} = this.props;

        if (type === 'company') {
            const payload = _assign({}, {...params_1}, param, {keyWords_1});

            dispatch({
                type: 'list/queryInsuranceCompanyList',
                payload
            });
        } else if (type === 'channel') {
            const payload = _assign({}, {...params_2}, param, {keyWords_2});

            dispatch({
                type: 'list/queryChannelList',
                payload
            });
        }

    }

    // 搜索
    onSearch = (value, type) => {
        const {dispatch} = this.props;

        if (type === 'company') {
            dispatch({
                type: 'list/onSearch',
                payload: {
                    keyWords_1: value,
                    type
                }
            });
        } else if (type === 'channel') {
            dispatch({
                type: 'list/onSearch',
                payload: {
                    keyWords_2: value,
                    type
                }
            });
        }
    }

    onEdit = (id, type) => {
        if (type === 'company') {
            return `/servicedata/list/editcompany/${id}`
        } else {
            return `/servicedata/list/editchannel/${id}`
        }
    }

    onDelete = (record, type) => {
        const {dispatch} = this.props;
        let content = '';
        if (type === 'company') {
            content = `确认要删除【保险公司】${record.companyName} 吗`;
        } else {
            content = `确认要删除【渠道】${record.channelName} 吗`;
        }

        Modal.confirm({
            title: '提示',
            content: content,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'list/delete',
                    payload: {
                        id: record.id,
                        type
                    }
                });
            }
        });
    }

    render() {
        const {
            loading_1,
            loading_2,
            dataSource_1,
            dataSource_2,
            pagination_1,
            pagination_2
        } = this.props;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务数据管理</Breadcrumb.Item>
                            <Breadcrumb.Item>列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>列表</h1>
                </div>
                <div className='pageContent'>
                    <Card>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Card
                                    title={<div>
                                        <span>保险公司列表</span>
                                        <Button
                                            type='primary'
                                            style={{marginLeft: 15}}
                                            onClick={() => router.push('/servicedata/addcompany')}
                                        >
                                            <Icon type="plus"/> 新增</Button>
                                    </div>}
                                    extra={<Search
                                        placeholder="公司名称"
                                        onSearch={value => this.onSearch(value, 'company')}
                                    />}
                                >
                                    <Table
                                        columns={this.columns_1}
                                        dataSource={dataSource_1}
                                        pagination={pagination_1}
                                        loading={loading_1}
                                        scroll={{x: 1100}}
                                        handlePageChange={param => this.handlePageChange(param, 'company')}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card
                                    title={<div>
                                        <span>渠道列表</span>
                                        <Button
                                            type='primary'
                                            style={{marginLeft: 15}}
                                            onClick={() => router.push('/servicedata/addchannel')}
                                        >
                                            <Icon type="plus"/> 新增</Button>
                                    </div>}
                                    extra={<Search
                                        placeholder="渠道名称"
                                        onSearch={value => this.onSearch(value, 'channel')}
                                    />}>
                                    <Table
                                        columns={this.columns_2}
                                        dataSource={dataSource_2}
                                        pagination={pagination_2}
                                        loading={loading_2}
                                        scroll={{x: 900}}
                                        handlePageChange={param => this.handlePageChange(param, 'channel')}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Index;
