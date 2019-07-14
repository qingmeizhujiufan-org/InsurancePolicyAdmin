import React from 'react';
import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Input,
    Breadcrumb,
    Button,
    AutoComplete,
    Select,
    Divider,
    Spin
} from 'antd';
import {DatePicker} from 'zui';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import '../index.less';
import moment from "moment";

const {Option} = AutoComplete;
const {TextArea} = Input;
const FormItem = Form.Item;

@connect(state => state.clientEdit)
@Form.create()
class Index extends React.Component {

    componentDidMount = () => {
        const {form, location} = this.props;
        const {userId} = location.query;

        /* 查询客户详情 */
        this.queryDetail();
    }

    queryDetail = () => {
        const {dispatch, match, location} = this.props;
        const {id} = match.params;
        const {userId} = location.query;

        dispatch({
            type: 'clientEdit/queryDetail',
            payload: {
                id,
                userId
            },
            callback: res => {
                this.setFields(res);
            }
        });
    }

    setFields = val => {
        const {form, location} = this.props;
        const {userId} = location.query;
        const values = form.getFieldsValue();

        for (let key in values) {
            if (key === 'customBirth') {
                values[key] = val[key] && new moment(val[key]);
            } else {
                values[key] = val[key];
            }
        }
        values.userId = userId;

        form.setFieldsValue(values);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch, match} = this.props;
                const {id} = match.params;
                values.id = id;
                console.log('handleSubmit  param === ', values);

                dispatch({
                    type: 'clientEdit/update',
                    payload: values
                });
            }
        });
    }

    render() {
        const {form, loading, submitLoading} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务员管理</Breadcrumb.Item>
                            <Breadcrumb.Item>业务员列表</Breadcrumb.Item>
                            <Breadcrumb.Item>更新客户信息</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>更新客户信息</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
                        <Spin spinning={loading}>
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
                                <Divider>基本信息</Divider>
                                <Row>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="真实姓名"
                                        >
                                            {getFieldDecorator('customName', {
                                                rules: [{
                                                    required: true, message: '请输入真实姓名'
                                                }]
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="性别"
                                        >
                                            {getFieldDecorator('customSex', {
                                                initialValue: 1
                                            })(
                                                <Select>
                                                    <Select.Option value={1}>男</Select.Option>
                                                    <Select.Option value={0}>女</Select.Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="电话后四位"
                                        >
                                            {getFieldDecorator('customTel', {
                                                rules: [{
                                                    required: true, message: '请输入个人电话'
                                                }],
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="生日"
                                        >
                                            {getFieldDecorator('customBirth', {
                                                rules: [{
                                                    required: true, message: '请选择生日'
                                                }],
                                            })(
                                                <DatePicker/>
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
                                <Row type="flex" justify="center" style={{marginTop: 40}}>
                                    <Button type="primary" size='large' style={{width: 120}} htmlType="submit"
                                            loading={submitLoading}>提交</Button>
                                </Row>
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
