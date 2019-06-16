import React from 'react';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import {Layout, Icon, Menu} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';
import _find from 'lodash/find';
import {admin} from './authority';
import menuTree from './menu';
import './index.less';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            defaultOpenKeys: [],
            defaultSelectedKeys: [],
            authMenu: [],
            subMenuList: null
        };
    }

    componentDidMount = () => {
        this.setAuthMenu(this.selectActiveTab);

        window.addEventListener('hashchange', () => {
            this.selectActiveTab();
        });
    }

    componentWillUnmount = () => {
        window.removeEventListener('hashchange', () => {
            this.selectActiveTab();
        });
    }

    setAuthMenu = callback => {
        if (sessionStorage.type !== undefined && sessionStorage.type !== null) {
            const type = sessionStorage.type;
            let authority, authority_menu = [];
            authority = admin;
            authority_menu = authority.menu;

            let _menu = [];
            menuTree.map(item => {
                const _item = {};
                for (let i = 0; i < authority_menu.length; i++) {
                    if (item.key === authority_menu[i].key) {
                        _item.key = item.key;
                        _item.iconType = item.iconType;
                        _item.label = item.label;
                        _item.children = [];
                        authority_menu[i].children.map(sub_key => {
                            _item.children.push(_find(item.children, {key: sub_key}));
                        });
                        _menu.push(_item);
                    }
                }
            });

            this.setState({
                isLoaded: true,
                defaultOpenKeys: authority.defaultOpenKeys,
                defaultSelectedKeys: authority.defaultSelectedKeys,
                authMenu: _menu
            }, () => {
                if (typeof callback === 'function') callback();
            });
        }
    }

    selectActiveTab = () => {
        const menu = this.getFlatMenu(this.state.authMenu);
        const hashUrl = location.pathname;
        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            if (hashUrl.indexOf(item.link) > -1) {
                this.setState({selectedKeys: item.key});
                return;
            }
        }
    }

    getFlatMenu = menu => {
        return menu.reduce((keys, item) => {
            keys.push(item);
            if (item.children) {
                return keys.concat(this.getFlatMenu(item.children));
            }
            return keys;
        }, []);
    }

    setMenuChildren = () => {
        const {selectedKeys, defaultOpenKeys, defaultSelectedKeys, authMenu} = this.state;
        const subMenuList = authMenu.map(item => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.key}
                        title={<span><Icon type={item.iconType}/><span>{item.label}</span></span>}
                    >
                        {
                            item.children.map(subItem => {
                                return (
                                    <Menu.Item key={subItem.key}>
                                        <Link to={subItem.link}>{subItem.label}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.link}>
                            <Icon type={item.iconType}/>
                            <span>{item.label}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        });

        return (
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKeys]}
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
            >{subMenuList}</Menu>
        );
    }

    onClick = e => {
        this.setState({
            selectedKeys: e.key
        });
    }

    onBreakpoint = broken => {
        // this.props.onToggleClick(broken ? false : true);
    }

    render() {
        const {isLoaded} = this.state;
        const {collapsed} = this.props;

        return (
            <Sider
                breakpoint="lg"
                onBreakpoint={this.onBreakpoint}
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={200}
                className="left-side"
            >
                <div className="logo">
                    <Link to="/frame/user/list">
                        <h1>ADMIN</h1>
                    </Link>
                </div>
                <Scrollbars className='zui-menu'>
                    {isLoaded ? this.setMenuChildren() : null}
                </Scrollbars>
            </Sider>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;
