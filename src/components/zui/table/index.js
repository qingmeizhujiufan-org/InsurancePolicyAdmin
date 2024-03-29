import React from 'react';
import {Table} from 'antd';
import assign from "lodash/assign";
import './index.less';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _dataSource: [],
            _pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: this.onChange,
                onShowSizeChange: this.onShowSizeChange
            }
        };
    }

    componentDidMount = () => {
        const {dataSource, pagination} = this.props;
        this.setData(dataSource, pagination);
    }

    componentWillReceiveProps = nextProps => {
        this.setData(nextProps.dataSource, nextProps.pagination);
    }

    setData = (dataSource, pagination) => {

        const total = (pagination && pagination.total) || 0;
        const _pagination = assign({}, this.state._pagination, {
            total,
            showTotal: total => `共 ${total} 条`
        });

        this.setState({
            _dataSource: dataSource,
            _pagination
        });
    }

    onChange = (page, pageSize) => {
        this.props.handlePageChange({
            pageNumber: page,
            pageSize: pageSize
        });
    }

    onShowSizeChange = (current, size) => {
        this.props.handlePageChange({
            pageNumber: 1,
            pageSize: size
        });
    }

    render() {
        const {_dataSource, _pagination} = this.state;
        const {className, dataSource, pagination, handlePageChange, ...restProps} = this.props;
        _dataSource.map((item, index) => {
            if (item.key === undefined || item.key === null || item.key === '') {
                item.key = index;
            }
        });

        return (
            <Table
                className={`zui-table ${className ? className : ''}`}
                dataSource={_dataSource}
                pagination={pagination ? _pagination : false}
                {...restProps}
            />
        );
    }
}

Index.defaultProps = {
    bordered: true,
};

export default Index;
