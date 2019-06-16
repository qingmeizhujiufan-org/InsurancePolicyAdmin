import React from 'react';
import { Layout } from 'antd';
import './index.less';

const { Footer } = Layout;

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        admin ©2019 Created by ZZ
      </Footer>
    );
  }
}

export default Index;
