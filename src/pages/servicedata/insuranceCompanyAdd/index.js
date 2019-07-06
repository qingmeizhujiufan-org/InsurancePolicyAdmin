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

@connect(state => state.insuranceCompanyAdd)
@Form.create()
class Index extends React.Component {

    handleChange = (fileList) => {
        const {dispatch} = this.props;

        dispatch({
            type: 'insuranceCompanyAdd/setState',
            payload: {
                fileList
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch} = this.props;
                // if (values.logoUrl) {
                //     values.logoUrl = values.logoUrl.map(item => item.response.id).join(',');
                // }
                console.log('handleSubmit  param === ', values);

                dispatch({
                    type: 'insuranceCompanyAdd/add',
                    payload: values
                });
            }
        });
    }

    render() {
        const {form, fileList, submitLoading} = this.props;
        const {getFieldDecorator} = form;
        console.log('fileList === ', fileList);

        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>业务数据管理</Breadcrumb.Item>
                            <Breadcrumb.Item>新增保险公司</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>新增保险公司</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                {/*<Col {...itemGrid}>*/}
                                    {/*<FormItem*/}
                                        {/*label="公司Logo"*/}
                                        {/*{...formItemLayout}*/}
                                    {/*>*/}
                                        {/*{getFieldDecorator('logoUrl')(*/}
                                            {/*<Upload*/}
                                                {/*listType={'picture'}*/}
                                                {/*onChange={this.handleChange}*/}
                                            {/*>*/}
                                                {/*{fileList.length >= 1 ? null :*/}
                                                    {/*<Button><Icon type="upload"/> 上传</Button>}*/}
                                            {/*</Upload>*/}
                                        {/*)}*/}
                                    {/*</FormItem>*/}
                                {/*</Col>*/}
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="公司名称"
                                    >
                                        {getFieldDecorator('companyName', {
                                            rules: [{
                                                required: true, message: '请输入公司名称',
                                            }],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...itemGrid}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="热线电话"
                                    >
                                        {getFieldDecorator('hotLine')(
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
