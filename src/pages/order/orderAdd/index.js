import React from 'react';
import {connect} from "dva";
import router from 'umi/router';
import {
    Row,
    Col,
    Form,
    Input,
    Breadcrumb,
    Button,
    Select,
    Divider,
    AutoComplete
} from 'antd';
import {DatePicker, InputNumber} from 'zui';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import '../index.less';

const {TextArea} = Input;
const FormItem = Form.Item;

@connect(state => state.orderAdd)
@Form.create()
class Index extends React.Component {

    componentDidMount = () => {
        const {dispatch, form, location} = this.props;
        const {userId} = location.query;

        form.setFieldsValue({userId});

        /* 查询保险公司列表 */
        dispatch({
            type: 'orderAdd/queryInsuranceCompanyList',
            payload: {
                userId,
                pageNumber: 1,
                pageSize: 9999
            }
        });

        /* 查询渠道列表 */
        dispatch({
            type: 'orderAdd/queryChannelList',
            payload: {
                userId,
                pageNumber: 1,
                pageSize: 9999
            }
        });

        /* 查询客户列表 */
        dispatch({
            type: 'orderAdd/queryClientList',
            payload: {
                userId,
                pageNumber: 1,
                pageSize: 9999
            }
        });
    }

    onSelect = (val) => {
        console.log('onSelect == ', val);
    }

    onChange = (val) => {
        console.log('onSelect == ', val);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch} = this.props;
                values.insuredTime = values.insuredTime.format('YYYY/MM/DD');
                values.policyholderBirthday = values.policyholderBirthday.format('YYYY/MM/DD');
                values.insuredBirthday = values.insuredBirthday.format('YYYY/MM/DD');
                console.log('handleSubmit  param === ', values);

                dispatch({
                    type: 'orderAdd/add',
                    payload: values
                });
            }
        });
    }

    render() {
        const {
            form,
            dataSource_company,
            dataSource_channel,
            dataSource_client,
            submitLoading
        } = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务员管理</Breadcrumb.Item>
                            <Breadcrumb.Item>业务员列表</Breadcrumb.Item>
                            <Breadcrumb.Item>新增订单</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增订单</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
                        <Form onSubmit={this.handleSubmit}>
                            <Divider>关联信息</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="关联业务员ID"
                                    >
                                        {getFieldDecorator('userId')(
                                            <Input disabled/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider>保单信息</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="保险单号"
                                    >
                                        {getFieldDecorator('insurancePolicyNo', {
                                            rules: [{
                                                required: true, message: '请输入保险单号'
                                            }]
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="产品名称"
                                    >
                                        {getFieldDecorator('insuranceName', {
                                            rules: [{
                                                required: true, message: '请输入产品名称'
                                            }]
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="保险公司"
                                    >
                                        {getFieldDecorator('insuranceCompany', {
                                            rules: [{
                                                required: true, message: '请输入保险公司'
                                            }],
                                        })(
                                            <Select>
                                                {
                                                    dataSource_company.map(item => {
                                                        return (
                                                            <Select.Option
                                                                key={item.id}>{item.companyName}</Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="生效时间"
                                    >
                                        {getFieldDecorator('insuredTime', {
                                            rules: [{
                                                required: true, message: '请选择生效时间'
                                            }],
                                        })(
                                            <DatePicker/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="缴费年限"
                                    >
                                        {getFieldDecorator('paymentDuration', {
                                            rules: [{
                                                required: true, message: '请选择缴费年限'
                                            }],
                                            initialValue: 1
                                        })(
                                            <InputNumber
                                                min={0}
                                                formatter={value => `${value}年`}
                                                parser={value => value.replace('年', '')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="保额"
                                    >
                                        {getFieldDecorator('insuredSum', {
                                            rules: [{
                                                required: true, message: '请输入保额'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="保费"
                                    >
                                        {getFieldDecorator('insurance', {
                                            rules: [{
                                                required: true, message: '请输入保费'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="备注"
                                    >
                                        {getFieldDecorator('mark')(
                                            <TextArea autosize={{minRows: 2, maxRows: 6}}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider>订单渠道</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="渠道"
                                    >
                                        {getFieldDecorator('orderChannel', {
                                            rules: [{
                                                required: true, message: '请输入渠道名称'
                                            }],
                                        })(
                                            <Select
                                            >
                                                {
                                                    dataSource_channel.map(item => {
                                                        return (
                                                            <Select.Option
                                                                key={item.id}>{item.channelName}</Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider>关联客户</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="客户"
                                    >
                                        {getFieldDecorator('clientId', {
                                            rules: [{
                                                required: true, message: '请输入客户名称'
                                            }],
                                        })(
                                            <Select
                                            >
                                                {
                                                    dataSource_client.map(item => {
                                                        return (
                                                            <Select.Option
                                                                key={item.id}>{`${item.customName}/${item.customTel}`}</Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider>投保人信息</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="投保人姓名"
                                    >
                                        {getFieldDecorator('policyholderName', {
                                            rules: [{
                                                required: true, message: '请输入投保人姓名'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="投保人生日"
                                    >
                                        {getFieldDecorator('policyholderBirthday', {
                                            rules: [{
                                                required: true, message: '请选择投保人生日'
                                            }],
                                        })(
                                            <DatePicker/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="投保人电话后四位"
                                    >
                                        {getFieldDecorator('policyholderTelephone', {
                                            rules: [{
                                                required: true, message: '请输入投保人电话后四位'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="投保人性别"
                                    >
                                        {getFieldDecorator('policyholderSex', {
                                            initialValue: 1
                                        })(
                                            <Select>
                                                <Select.Option value={1}>男</Select.Option>
                                                <Select.Option value={0}>女</Select.Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider>被保人信息</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="被保人姓名"
                                    >
                                        {getFieldDecorator('insuredName', {
                                            rules: [{
                                                required: true, message: '请输入被保人姓名'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="被保人生日"
                                    >
                                        {getFieldDecorator('insuredBirthday', {
                                            rules: [{
                                                required: true, message: '请选择被保人生日'
                                            }],
                                        })(
                                            <DatePicker/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="被保人电话后四位"
                                    >
                                        {getFieldDecorator('insuredTelephone', {
                                            rules: [{
                                                required: true, message: '请输入被保人电话后四位'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="被保人性别"
                                    >
                                        {getFieldDecorator('insuredSex', {
                                            initialValue: 1
                                        })(
                                            <Select>
                                                <Select.Option value={1}>男</Select.Option>
                                                <Select.Option value={0}>女</Select.Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider>受益人信息</Divider>
                            <Row>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="受益人姓名"
                                    >
                                        {getFieldDecorator('beneficiaryName', {
                                            rules: [{
                                                required: true, message: '请输入受益人姓名'
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center" style={{marginTop: 40}}>
                                <Button type="primary" size='large' style={{width: 120}} htmlType="submit"
                                        loading={submitLoading}>提交</Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
