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
    Divider,
    Spin
} from 'antd';
import {DatePicker} from 'zui';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import '../index.less';

const {Option} = AutoComplete;
const {TextArea} = Input;
const FormItem = Form.Item;

@connect(state => state.outerLink)
@Form.create()
class Index extends React.Component {

    componentDidMount = () => {
        const {dispatch} = this.props;

        dispatch({
            type: 'outerLink/queryDetail',
            payload: {}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch} = this.props;
                console.log('handleSubmit  param === ', values);

                dispatch({
                    type: 'outerLink/update',
                    payload: values
                });
            }
        });
    }

    render() {
        const {form, data, loading, submitLoading} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>外部链接管理</Breadcrumb.Item>
                            <Breadcrumb.Item>外部链接</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>外部链接</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
                        <Form onSubmit={this.handleSubmit}>
                            <Spin spinning={loading}>
                                <Divider>首页链接</Divider>
                                <Row>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="产品销量榜链接"
                                        >
                                            {getFieldDecorator('productSellingUrl', {
                                                initialValue: data.productSellingUrl
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="公司偿付榜链接"
                                        >
                                            {getFieldDecorator('companyPayUrl', {
                                                initialValue: data.companyPayUrl
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Divider>个人中心链接</Divider>
                                <Row>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="积分商城链接"
                                        >
                                            {getFieldDecorator('pointMallUrl', {
                                                initialValue: data.pointMallUrl
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="客户咨询链接"
                                        >
                                            {getFieldDecorator('customerConsultUrl', {
                                                initialValue: data.customerConsultUrl
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="意见反馈链接"
                                        >
                                            {getFieldDecorator('feedbackUrl', {
                                                initialValue: data.feedbackUrl
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="关于链接"
                                        >
                                            {getFieldDecorator('aboutUrl', {
                                                initialValue: data.aboutUrl
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Spin>
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
