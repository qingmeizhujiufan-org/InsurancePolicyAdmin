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
    AutoComplete,
    Select,
    Divider
} from 'antd';
import {DatePicker} from 'zui';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import '../index.less';

const {Option} = AutoComplete;
const {TextArea} = Input;
const FormItem = Form.Item;

@connect(state => state.clientAdd)
@Form.create()
class Index extends React.Component {

    componentDidMount = () => {
        const {form, location} = this.props;
        const {userId} = location.query;

        form.setFieldsValue({userId});
        // dispatch({
        //     type: 'clientAdd/queryUserList',
        //     payload: {
        //         pageNumber: 1,
        //         pageSize: 9999
        //     }
        // });
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
                console.log('handleSubmit  param === ', values);

                dispatch({
                    type: 'clientAdd/add',
                    payload: values
                });
            }
        });
    }

    render() {
        const {form, dataSource, submitLoading} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>客户管理</Breadcrumb.Item>
                            <Breadcrumb.Item>新增客户</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增客户</h1>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
