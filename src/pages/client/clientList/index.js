import React from 'react';
import router from 'umi/router';
import {connect} from "dva";
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
    Modal, Button
} from 'antd';
import {Table, Card} from 'zui';
import assign from 'lodash/assign';
import '../index.less';


const Search = Input.Search;

@connect(state => state.clientList)
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '客户姓名',
                width: 250,
                align: 'center',
                dataIndex: 'customName',
                key: 'customName',
            }, {
                title: '性别',
                width: 100,
                align: 'center',
                dataIndex: 'customSex',
                key: 'customSex',
                render: (text, record, index) => (
                    <span>{text === 1 ? '男' : '女'}</span>
                )
            }, {
                title: '客户手机号',
                width: 200,
                align: 'center',
                dataIndex: 'customTel',
                key: 'customTel',
            }, {
                title: '客户生日',
                width: 200,
                align: 'center',
                dataIndex: 'customBirth',
                key: 'customBirth',
            }, {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
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
            }
        ];
    }


    componentDidMount = () => {
        const {dispatch} = this.props;

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
        const {dispatch} = this.props;

        dispatch({
            type: 'clientList/onSearch',
            payload: {keyWords: value}
        });
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
                            <Col span={3}>
                                <Button
                                    icon='plus'
                                    size="large"
                                    onClick={() => router.push('/client/add')}
                                    style={{marginLeft: 25}}
                                >新增客户</Button>
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
                            handlePageChange={this.handlePageChange}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Index;
