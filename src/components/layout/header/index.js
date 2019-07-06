import React from 'react';
import {connect} from "dva";
import {routerRedux} from 'dva/router';
import {Layout, Row, Icon, Dropdown, Menu, Avatar, notification} from 'antd';
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
                <Menu.Item>
                    <span onClick={this.goUserCenter}>个人中心</span>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={this.logout}>退出登录</span>
                </Menu.Item>
            </Menu>
        );
    }

    componentDidMount = () => {
        console.log('global user === ', this.props);
    }

    goUserCenter = () => {
        this.context.router.push('/setting/list/');
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
        notification.success({
            message: '提示',
            description: '已安全退出！'
        });
        routerRedux.push('/login');
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
        const {File, realName, avatarSrc} = user;
        const avatar = avatarSrc;

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
