import React from 'react';
import {connect} from "dva";
import router from 'umi/router';
import {Layout, Row, Icon, Dropdown, Menu, Avatar, notification} from 'antd';
import store from 'store';
import host from 'host';
import './index.less';

const {Header} = Layout;

const logoutUrl = 'server/LoginOut';

@connect(state => state.app)
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.menu = (
            <Menu>
                <Menu.Item onClick={this.goUserCenter}>
                    <span>个人中心</span>
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        );
    }

    componentDidMount = () => {
        console.log('global user === ', this.props);
    }

    goUserCenter = () => {
        router.push('/setting/userCenter');
    }

    onToggleClick = () => {
        const {dispatch, collapsed} = this.props;
        dispatch({
            type: 'app/onCollapseChange',
            payload: !collapsed
        });
    }

    logout = () => {
        sessionStorage.clear();
        store.clearAll();
        notification.success({
            message: '提示',
            description: '已安全退出！'
        });
        router.push('/login');
        // let param = {};
        // param.userId = sessionStorage.userId;
        // ajax.postJSON(logoutUrl, JSON.stringify(param), (data) => {
        //     if (data.success) {
        //         sessionStorage.clear();
        //         Notification.success({
        //             message: '提示',
        //             description: '已安全退出！'
        //         });
        //         this.context.router.push('/login');
        //     } else {
        //         message.error(data.backMsg);
        //     }
        // });
    }

    render() {
        const {collapsed, user} = this.props;
        const {File, realName} = user;
        const avatar = File && `${host.FILE_ASSET}${File.id}${File.fileType}`;

        return (
            <Header className="zui-header">
                <Row type="flex" justify="space-between" align="middle">
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.onToggleClick}
                    />
                    <div>
                        <Dropdown overlay={this.menu}>
                            <a className="ant-dropdown-link" style={{color: '#fff'}}>
                                <Avatar
                                    className='zui-avatar'
                                    size="small"
                                    icon={avatar ? avatar : "user"}
                                    src={avatar ? avatar : null}
                                /> {realName} <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
                </Row>
            </Header>
        );
    }
}

export default Index;
