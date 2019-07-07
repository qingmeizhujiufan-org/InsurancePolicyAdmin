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
    Tabs,
    message,
    notification
} from 'antd';
import {Upload} from 'zui';
import {formItemLayout, itemGrid} from 'utils/formItemGrid';
import host from 'host';
import '../index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect((state) => {
    return {
        user: state.app.user,
        ...state.userCenter
    }
})
@Form.create()
class DetailForm extends React.Component {
    componentDidMount = () => {
        const {dispatch, user} = this.props;

        dispatch({
            type: 'userCenter/queryOneUser',
            payload: {
                id: user.id
            },
            callback: res => {
                this.setFields(res);
            }
        });
    }

    setFields = val => {
        const {dispatch, form} = this.props;
        const values = form.getFieldsValue();
        values.realName = val.realName;
        if (val.avatarSrc && val.avatarSrc[0]) {
            const {id, fileType} = val.avatarSrc[0];
            const fileList = [];
            fileList.push({
                uid: '-1',
                name: 'avatar',
                status: 'done',
                url: host.FILE_ASSET + id + fileType,
                thumbUrl: host.FILE_ASSET + id + fileType,
                response: {id}
            });
            values.avatarSrc = fileList;

            dispatch({
                type: 'userCenter/setState',
                payload: {
                    fileList
                }
            });
        }

        form.setFieldsValue(values);
    }

    handleChange = fileList => {
        const {dispatch} = this.props;

        dispatch({
            type: 'userCenter/setState',
            payload: {
                fileList
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch, user, fileList} = this.props;
                values.id = user.id;
                values.avatarSrc = fileList && fileList.map(item => item.response.id).join(',');

                dispatch({
                    type: 'userCenter/update',
                    payload: {
                        ...values,
                        user: {
                            ...user,
                            realName: values.realName,
                            avatarSrc: fileList[0] && fileList[0].thumbUrl
                        }
                    }
                });
            }
        });
    }

    render() {
        const {form, fileList, submitLoading} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div className='userCenter'>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row type="flex" justify="center">
                        <Col span={8}>
                            <Row>
                                <Col span={20}>
                                    <FormItem
                                        label="用户名"
                                    >
                                        {getFieldDecorator('realName', {
                                            rules: [{required: true, message: '请输入用户名'}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="头像"
                            >
                                {getFieldDecorator('avatarSrc', {
                                    rules: [{required: false, message: '头像不能为空!'}]
                                })(
                                    <Upload
                                        listType="picture-card"
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length === 0 ? <Button>
                                            <Icon type="upload"/> 上传头像
                                        </Button> : null}
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style={{marginTop: 40}}>
                        <Button type="primary" size='large' style={{width: 120}} htmlType="submit"
                                loading={submitLoading}>保存</Button>
                    </Row>
                </Form>
            </div>
        )
    }
}

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitLoading: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = this.props.data;
                if (values.oldPassword !== data.password) {
                    message.error('旧密码不对，请重新填写');
                    return;
                }
                if (values.newPassword.length < 6) {
                    message.error('新密码位数不能少于6位');
                    return;
                }
                this.setState({
                    submitLoading: true
                });
                axios.post('admin/updateUser', {
                    id: sessionStorage.userId,
                    password: values.newPassword
                }).then(res => res.data).then(data => {
                    if (data.success) {
                        notification.success({
                            message: '提示',
                            description: '用户密码更新成功！'
                        });
                        sessionStorage.setItem('avatar', avatarSrc[0].thumbUrl);
                        this.queryDetail();
                    } else {
                        message.error(data.backMsg);
                    }
                }).finally(() => this.setState({submitLoading: false}));
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {submitLoading} = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row type="flex" justify="center" style={{marginTop: 40}}>
                    <Col {...itemGrid}>
                        <FormItem
                            {...formItemLayout}
                            label="旧密码"
                        >
                            {getFieldDecorator('oldPassword', {
                                rules: [{required: true, message: '请输入旧密码'}],
                            })(
                                <Input type='password' autoComplete='false'/>
                            )}
                        </FormItem>

                    </Col>
                    <Col {...itemGrid}>
                        <FormItem
                            {...formItemLayout}
                            label="新密码"
                        >
                            {getFieldDecorator('newPassword', {
                                initialValue: '',
                                rules: [{required: true, message: '请输入新密码'}],
                            })(
                                <Input type='password' autoComplete='false'/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{marginTop: 40}}>
                    <Button type="primary" size='large' style={{width: 120}} htmlType="submit"
                            loading={submitLoading}>保存</Button>
                </Row>
            </Form>
        )
    }
}

PasswordForm = Form.create({})(PasswordForm);

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: null
        };
    }

    componentDidMount = () => {
        // this.queryDetail();
    }

    queryDetail = () => {
        const id = sessionStorage.userId;
        const param = {};
        param.id = id;
        this.setState({
            loading: true
        });
        axios.get('admin/qureyOneUser', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                let backData = data.backData;

                this.setState({
                    data: backData,
                    loading: false
                });
            } else {
                message.error('用户信息查询失败');
            }
        });
    }

    render() {
        const {data} = this.state;
        return (
            <div className="zui-content">
                <div className='pageHeader'>
                    <div className="breadcrumb-block">
                        <Breadcrumb>
                            <Breadcrumb.Item>个人设置</Breadcrumb.Item>
                            <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <h1 className='title'>个人中心</h1>
                </div>
                <div className='pageContent'>
                    <div className='ibox-content'>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><Icon type="setting"/>个人信息</span>} key="1">
                                <DetailForm data={data}/>
                            </TabPane>
                            <TabPane tab={<span><Icon type="lock"/>修改密码</span>} key="2">
                                <PasswordForm data={data}/>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
