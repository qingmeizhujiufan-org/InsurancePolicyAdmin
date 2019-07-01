import React from 'react';
import Link from 'umi/link';
import {
    Icon,
    Breadcrumb,
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

@connect(state => state.insuranceCompanyList)
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '品牌Logo',
                width: 120,
                align: 'center',
                dataIndex: 'logoUrl',
                key: 'logoUrl',
            }, {
                title: '公司名称',
                width: 350,
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
        const {dispatch} = this.props;

        dispatch({
            type: 'insuranceCompanyList/queryList',
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
                            <Breadcrumb.Item>业务数据管理</Breadcrumb.Item>
                            <Breadcrumb.Item>保险公司列表</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>保险公司列表</h1>
                    <div className='search-area'>
                        <Row type='flex' justify="center" align="middle">
                            <Col span={8}>
                                <Search
                                    placeholder="公司名称"
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
