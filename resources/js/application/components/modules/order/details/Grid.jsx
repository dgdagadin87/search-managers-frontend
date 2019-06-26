import React, {Component, Fragment} from 'react';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';


const columns = [
    {
        title: 'Наименование области',
        dataIndex: 'region',
        width: 150
    },
    {
        title: 'Наименование файла',
        dataIndex: 'fileName',
    },
    {
        title: 'Загрузка',
        align: 'center',
        dataIndex: 'loadButton',
        width: 150,
        render: (text, record) => {
            return (
                <span>
                    <Button type="primary">Загрузить</Button>
                </span>
            );
          }
    },
    {
        title: 'search.ru',
        align: 'center',
        dataIndex: 'showButton',
        width: 150,
        render: (text, record) => {
            return (
                <span>
                    <Button type="primary">Показать</Button>
                </span>
            );
          }
    }
];

class Grid extends Component {

    render() {

        const {aoi = []} = this.props;

        return (
            <Fragment>
                <Table
                    rowKey="id"
                    bordered={true}
                    style={{marginTop:'10px'}}
                    columns={columns}
                    dataSource={aoi}
                    pagination={false}
                    scroll={{ y: 230 }}
                    title={() => <strong>AIO</strong>}
                />
            </Fragment>
        );
    }

};

export default Grid;