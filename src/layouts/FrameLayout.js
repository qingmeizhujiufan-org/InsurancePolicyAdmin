import React from 'react';
import {Layout, LocaleProvider} from 'antd';
import FrameHeader from '../components/layout/header';
import FrameLeftSide from '../components/layout/leftSide';
import FrameFooter from '../components/layout/footer';
import {Scrollbars} from 'react-custom-scrollbars';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import './FrameLayout.less';

const {Content} = Layout;

const FrameLayout = ({children}) => (
    <LocaleProvider locale={zh_CN}>
        <Layout>
            <FrameLeftSide/>
            <Layout>
                <FrameHeader/>
                <Content>
                    <Scrollbars style={{height: 'calc(100vh - 50px)'}}>
                        <div style={{minHeight: 'calc(100vh - 119px)'}}>
                            {children}
                        </div>
                        <FrameFooter/>
                    </Scrollbars>
                </Content>
            </Layout>
        </Layout>
    </LocaleProvider>
);

export default FrameLayout;
