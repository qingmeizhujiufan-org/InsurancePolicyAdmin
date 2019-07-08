import React from 'react';
import {
    Form,
    Input,
    Breadcrumb,
    Upload,
    Row,
    Col,
    Tabs,
    Spin,
    Icon,
} from 'antd';
import {Table, Card} from 'zui';
import {formItemLayout} from 'utils/formItemGrid';
import '../index.less';
import {connect} from "dva";

const {TabPane} = Tabs;
const FormItem = Form.Item;

@connect(state => state.userDetail)
@Form.create()
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.columnsCustom = [
            {
                title: '客户姓名',
                width: 350,
                align: 'center',
                dataIndex: 'customName',
                key: 'customName',
            }, {
                title: '性别',
                width: 80,
                align: 'center',
                dataIndex: 'customSex',
                key: 'customSex',
                render: text => (
                    <span>{text === 1 ? '男' : '女'}</span>
                )
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
            // }, {
            //     title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            //     key: 'operation',
            //     fixed: 'right',
            //     width: 180,
            //     align: 'center',
            //     render: (text, record, index) => (
            //         <div>
            //             <Dropdown
            //             placement="bottomCenter"
            //             overlay={
            //             <Menu>
            //             <Menu.Item>
            //             <Link to={this.onDetail(record.id)}>查看</Link>
            //             </Menu.Item>
            //             <Menu.Item>
            //             <Link to={this.onEdit(record.id)}>编辑</Link>
            //             </Menu.Item>
            //             <Menu.Item>
            //             <a onClick={() => this.onDelete(record.id)}>删除</a>
            //             </Menu.Item>
            //             </Menu>
            //             }
            //             >
            //             <a className="ant-dropdown-link">操作</a>
            //             </Dropdown>
            //         </div>
            //     )
            }];

        this.columnsOrder = [
            {
                title: '保险单号',
                width: 200,
                fixed: 'left',
                align: 'center',
                dataIndex: 'insurancePolicyNo',
                key: 'insurancePolicyNo',
            }, {
                title: '险种',
                width: 200,
                align: 'center',
                dataIndex: 'insuranceName',
                key: 'insuranceName'
            }, {
                title: '保险公司',
                width: 250,
                align: 'center',
                dataIndex: 'insuranceCompanyName',
                key: 'insuranceCompanyName',
            }, {
                title: '投保时间',
                width: 150,
                align: 'center',
                dataIndex: 'insuredTime',
                key: 'insuredTime',
            }, {
                title: '缴费年限',
                width: 150,
                align: 'center',
                dataIndex: 'paymentDuration',
                key: 'paymentDuration',
            }, {
                title: '保额',
                width: 150,
                align: 'center',
                dataIndex: 'insuredSum',
                key: 'insuredSum',
            }, {
                title: '保费',
                width: 150,
                align: 'center',
                dataIndex: 'insurance',
                key: 'insurance',
            }, {
                title: '订单渠道',
                width: 150,
                align: 'center',
                dataIndex: 'channelName',
                key: 'channelName',
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
            // }, {
            //     title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            //     key: 'operation',
            //     fixed: 'right',
            //     width: 180,
            //     align: 'center',
            //     render: (text, record, index) => (
            //         <div>
            //             <Dropdown
            //             placement="bottomCenter"
            //             overlay={
            //             <Menu>
            //             <Menu.Item>
            //             <Link to={this.onDetail(record.id)}>查看</Link>
            //             </Menu.Item>
            //             <Menu.Item>
            //             <Link to={this.onEdit(record.id)}>编辑</Link>
            //             </Menu.Item>
            //             <Menu.Item>
            //             <a onClick={() => this.onDelete(record.id)}>删除</a>
            //             </Menu.Item>
            //             </Menu>
            //             }
            //             >
            //             <a className="ant-dropdown-link">操作</a>
            //             </Dropdown>
            //         </div>
            //     )
            }];
    }

    componentDidMount = () => {
        const {dispatch, match, paramsCustom, paramsOrder} = this.props;
        console.log('detail props = ', this.props);
        const id = match.params.id;

        dispatch({
            type: 'userDetail/queryOneUser',
            payload: {
                id
            },
            callback: res => {
                this.setFields(res);
            }
        });

        dispatch({
            type: 'userDetail/queryCustomList',
            payload: {
                userId: id,
                ...paramsCustom
            }
        });

        dispatch({
            type: 'userDetail/queryOrderList',
            payload: {
                userId: id,
                ...paramsOrder
            }
        });
    }

    setFields = val => {
        const form = this.props.form;
        const values = form.getFieldsValue();
        for (let key in values) {
            if (key === 'avatarSrc') {
                values[key] = [];
                if (val[key]) {
                    val[key].map((item, index) => {
                        values[key].push({
                            uid: index,
                            name: item.file_name,
                            status: 'done',
                            url: restUrl.ADDR + '/public/' + `${item.id + item.fileType}`,
                            thumbUrl: restUrl.ADDR + '/public/' + `${item.id + item.fileType}`,
                            response: {
                                id: item.id
                            }
                        });
                    });
                }

            } else {
                values[key] = val[key];
            }
        }
        // values.created_at = util.FormatDate(values.created_at);
        // values.updated_at = util.FormatDate(values.updated_at);

        form.setFieldsValue(values);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {
            form,
            loading,
            dataSourceCustom,
            dataSourceOrder,
            paginationCustom,
            paginationOrder
        } = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务员管理</Breadcrumb.Item>
                            <Breadcrumb.Item>业务员管理</Breadcrumb.Item>
                            <Breadcrumb.Item>业务员详情</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>业务员详情</h1>
                </div>
                <div className='pageContent'>
                    <Card>
                        <Spin spinning={loading}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="基本信息" key="1">
                                    <Form>
                                        <Row type='flex' justify='center'>
                                            <Col span={12}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="昵称"
                                                >
                                                    {getFieldDecorator('nickname')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="真实姓名"
                                                >
                                                    {getFieldDecorator('realname')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="性别"
                                                >
                                                    {getFieldDecorator('sex')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="手机号"
                                                >
                                                    {getFieldDecorator('telephone')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="生日"
                                                >
                                                    {getFieldDecorator('birthday')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="创建时间"
                                                >
                                                    {getFieldDecorator('created_at')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="更新时间"
                                                >
                                                    {getFieldDecorator('updated_at')(
                                                        <Input disabled={true}/>
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={4}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="头像"
                                                >
                                                    {getFieldDecorator('avatarSrc', {
                                                        valuePropName: 'fileList',
                                                        getValueFromEvent: this.normFile,
                                                        rules: [{required: false, message: '头像不能为空!'}]
                                                    })(
                                                        <Upload
                                                            disabled={true}
                                                            listType="picture-card"
                                                            onRemove={() => false}
                                                        >
                                                        </Upload>
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>
                                </TabPane>
                                <TabPane tab="客户列表" key="2">
                                    <Table
                                        columns={this.columnsCustom}
                                        dataSource={dataSourceCustom}
                                        pagination={paginationCustom}
                                        loading={loading}
                                        scroll={{x: 1500}}
                                        handlePageChange={this.handlePageChange}
                                    />
                                </TabPane>
                                <TabPane tab="订单列表" key="3">
                                    <Table
                                        columns={this.columnsOrder}
                                        dataSource={dataSourceOrder}
                                        pagination={paginationOrder}
                                        loading={loading}
                                        scroll={{x: 2200}}
                                        handlePageChange={this.handlePageChange}
                                    />
                                </TabPane>
                            </Tabs>
                        </Spin>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Index;
