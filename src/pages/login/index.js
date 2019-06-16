import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Row, Col, Input, Button} from 'antd';
import './index.less';

import loginBg from 'Img/login-bg.jpg';

const FormItem = Form.Item;

@connect(state => state.login)
@Form.create()
class Index extends React.Component {
    handleSubmit = (e) => {
        const {dispatch, form} = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({type: 'login/login', payload: values});
            }
        });
    }

    render() {
        const {submitLoading, form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className='login'>
                <img src={loginBg} className='login-bg'/>
                <div className='backup'></div>
                <div className='login-box'>
                    <Row>
                        <Col span={13} style={{height: '400px', backgroundColor: 'rgba(85, 120, 220, .65)'}}>
                            <div style={{margin: '85px 0 40px', textAlign: 'center'}}>
                                <Icon type="windows" theme='filled' style={{fontSize: 90, color: '#fff'}}/>
                            </div>
                            <div
                                style={{paddingTop: 30, textAlign: 'center', fontSize: 20, color: '#fff'}}>保险平台管理系统
                            </div>
                        </Col>
                        <Col span={11} style={{height: '400px', padding: '20px 35px', backgroundColor: '#fff'}}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    <h1 style={{margin: '15px 0 0 0'}}>欢迎登录</h1>
                                    <p style={{margin: '0', color: '#999'}}>Welcome!</p>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: '请输入您的用户名!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               className='login-input' placeholder="用户编码/手机号"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入您的密码!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" className='login-input' placeholder="密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        size='large'
                                        htmlType="submit"
                                        className='login-form-button'
                                        loading={submitLoading}
                                    >登录</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Index;
