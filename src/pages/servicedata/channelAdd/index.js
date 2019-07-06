import React from 'react';
import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Input,
    Breadcrumb,
    Button,
    Icon,
} from 'antd';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import {Upload} from 'zui';
import '../index.less';

const FormItem = Form.Item;

@connect(state => state.channelAdd)
@Form.create()
class Index extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch} = this.props;

                dispatch({
                    type: 'channelAdd/add',
                    payload: values
                });
            }
        });
    }

    render() {
        const {form, submitLoading} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务数据管理</Breadcrumb.Item>
                            <Breadcrumb.Item>新增渠道</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增渠道</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
