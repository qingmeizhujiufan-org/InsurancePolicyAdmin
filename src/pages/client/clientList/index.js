import React from 'react';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import {
    notification,
    Icon,
    Breadcrumb,
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
import '../index.less';
import {connect} from "dva";

const Search = Input.Search;

@connect(state => state.clientList)
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '客户姓名',
                width: 200,
                align: 'center',
                dataIndex: 'customName',
                key: 'customName',
            }, {
                title: '性别',
                width: 80,
                align: 'center',
                dataIndex: 'customSex',
                key: 'customSex'
            }, {
                title: '客户手机号',
                width: 150,
                align: 'center',
                dataIndex: 'customTel',
                key: 'customTel',
            }, {
                title: '客户生日',
                width: 150,
                align: 'center',
                dataIndex: 'customBirth',
                key: 'customBirth',
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
                        {/*<Dropdown*/}
                        {/*placement="bottomCenter"*/}
                        {/*overlay={*/}
                        {/*<Menu>*/}
                        {/*<Menu.Item>*/}
                        {/*<Link to={this.onDetail(record.id)}>查看</Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item>*/}
                        {/*<Link to={this.onEdit(record.id)}>编辑</Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item>*/}
                        {/*<a onClick={() => this.onDelete(record.id)}>删除</a>*/}
                        {/*</Menu.Item>*/}
                        {/*</Menu>*/}
                        {/*}*/}
                        {/*>*/}
                        {/*<a className="ant-dropdown-link">操作</a>*/}
                        {/*</Dropdown>*/}
                    </div>
                )
            }
        ];
    }


    componentDidMount = () => {
        const {dispatch, match} = this.props;

        dispatch({
            type: 'clientList/queryCustomList',
            payload: {}
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

    onDetail = id => {
        return `/frame/user/list/detail/${id}`
    }

    onEdit = id => {
        return `/frame/user/list/edit/${id}`
    }

    render() {
        const {dataSource, pagination, loading} = this.props;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>客户管理</Breadcrumb.Item>
                            <Breadcrumb.Item>客户列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>客户列表</h1>
                    <div className='search-area'>
                        <Row type='flex' justify="center" align="middle">
                            <Col span={8}>
                                <Search
                                    placeholder="搜索客户姓名/手机号码"
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

export default Index;
