import React from 'react';
import {connect} from 'dva';
import Link from 'umi/link';
import {
    notification,
    Icon,
    Breadcrumb,
    message,
    Dropdown,
    Menu,
    Row,
    Col,
    Input,
    Modal
} from 'antd';
import {Table, Card} from 'zui';
import _assign from 'lodash/assign';
import '../index.less';

const Search = Input.Search;

@connect(state => state.userList)
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '姓名',
                width: 350,
                align: 'center',
                dataIndex: 'realname',
                key: 'realname',
                render: (text, record, index) => (
                    <Link to={this.onDetail(record.id)}>{text}</Link>
                )
            }, {
                title: '个人手机号',
                width: 200,
                align: 'center',
                dataIndex: 'telephone',
                key: 'telephone',
            }, {
                title: '生日',
                width: 200,
                align: 'center',
                dataIndex: 'birthday',
                key: 'birthday'
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
                        <Dropdown
                            placement="bottomCenter"
                            overlay={
                                <Menu>
                                    <Menu.Item>
                                        <Link to={this.onDetail(record.id)}>查看</Link>
                                    </Menu.Item>
                                </Menu>
                            }
                        >
                            <a className="ant-dropdown-link">操作</a>
                        </Dropdown>
                    </div>
                )
            }];
    }

    componentDidMount() {
        this.queryList();
    }

    queryList = () => {
        const {dispatch, params, keyWords} = this.props;
        const payload = _assign({}, params, {keyWords});

        dispatch({
            type: 'userList/queryList',
            payload
        });
    }

    // 处理分页变化
    handlePageChange = param => {
        const {dispatch, params, keyWords} = this.props;
        const payload = _assign({}, params, param, {keyWords});

        dispatch({
            type: 'userList/queryList',
            payload
        });
    }

    // 搜索
    onSearch = (value, event) => {
        console.log('onsearch value == ', value);
        const {dispatch} = this.props;

        dispatch({
            type: 'userList/onSearch',
            payload: {keyWords: value}
        });
    }

    onDetail = id => {
        return `/user/list/detail/${id}`
    }

    render() {
        const {dataSource, pagination, loading} = this.props;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务员管理</Breadcrumb.Item>
                            <Breadcrumb.Item>业务员列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>业务员列表</h1>
                    <div className='search-area'>
                        <Row type='flex' justify="center" align="middle">
                            <Col span={8}>
                                <Search
                                    placeholder="搜索业务员姓名/手机号码"
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
