import React from 'react';
import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Input,
    Breadcrumb,
    Button,
    Spin
} from 'antd';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import {Upload} from 'zui';
import '../index.less';

const FormItem = Form.Item;

@connect(state => state.channelEdit)
@Form.create()
class Index extends React.Component {

    componentDidMount = () => {
        this.queryDetail();
    }

    queryDetail = () => {
        const {dispatch, match} = this.props;
        const {id} = match.params;
        console.log('match === ', match);

        dispatch({
            type: 'channelEdit/queryDetail',
            payload: {
                id
            },
            callback: res => {
                this.setFields(res);
            }
        });
    }

    setFields = val => {
        const {dispatch, form} = this.props;
        const values = form.getFieldsValue();
        for (let key in values) {
            values[key] = val[key];
        }

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
                    type: 'channelEdit/update',
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
                            <Breadcrumb.Item>业务数据管理</Breadcrumb.Item>
                            <Breadcrumb.Item>更新保险公司信息</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>更新保险公司信息</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
                        <Spin spinning={loading}>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col {...itemGrid}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="渠道名称"
                                        >
                                            {getFieldDecorator('channelName', {
                                                rules: [{
                                                    required: true, message: '请输入渠道名称',
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
                                                <Input/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center" style={{marginTop: 40}}>
                                    <Button
                                        type="primary"
                                        size='large'
                                        style={{width: 120}}
                                        htmlType="submit"
                                        loading={submitLoading}
                                    >提交</Button>
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
