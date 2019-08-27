import React, {Component} from 'react';

import Table from 'antd/lib/table';
import Empty from 'antd/lib/empty';


export default class Grid extends Component {

    render() {

        const {
            rowKey = 'id',
            loading = false,
            columns = [],
            dataSource = [],
            pagination = false,
            title = null,
            bordered = false,
            className = '',
            size = 'middle',
            onChange = null,
            sampleEmpty = false
        } = this.props;

        return (
            <Table
                rowKey={rowKey}
                loading={loading}
                bordered={bordered}
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                title={title}
                className={className}
                size={size}
                onChange={onChange}
                locale={{ emptyText: sampleEmpty ? 'Нет данных для отображения' : <Empty description="Нет данных для отображения" /> }}
            />
        );
    }

}