import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import Collapse from 'antd/lib/collapse';
import Tag from 'antd/lib/tag';

import Table from '../../../parts/Table';

import stateColors from '../../orders/OrdersModule';
import sourceColors from '../../orders/OrdersModule';


const Panel = Collapse.Panel;

const columns = [
    {
        title: () => <span>Название</span>,
        dataIndex: 'name',
        key: 'name',
        sorter: false,
        render: (text, record) => {
            return (
                <Link
                    title={text}
                    to={'/orders/edit/' + record['number']}
                >
                    {text}
                </Link>
            );
        }
    },
    {
        title: 'Заказчик',
        dataIndex: 'client',
        key: 'client',
        width: 250,
        render: (client) => {
            const {name = ''} = client;
            return name;
        },
        sorter: false
    },
    {
        title: 'Организация',
        dataIndex: 'client',
        key: 'organization',
        width: 180,
        render: (client) => {
            const {agent = ''} = client;
            const substredText = agent.length > 20 ? agent.substr(0, 20) + '..' : agent;
            return <span title={agent}>{substredText}</span>;
        },
        style: {background:'red'},
        sorter: false
    },
    {
        title: 'Статус',
        dataIndex: 'stateId',
        width: 130,
        key: 'stateId',
        align: 'center',
        render: (stateId) => {
            const currentState = stateColors[stateId] || {};
            const {color = '', name = '', short = false} = currentState;
            const correctName = !name ? 'default' : name;
            return (
                <Tag
                    title={correctName}
                    style={{textTransform: 'uppercase', background:color}}
                >
                    {short ? short : correctName}
                </Tag>);
        },
        sorter: false
    },
    {
        title: 'Источник',
        dataIndex: 'source',
        key: 'source',
        width: 130,
        align: 'center',
        render: (source) => {
            const {name = '', id = '0'} = source;
            const correctName = !name ? 'default' : name;
            const currentBackground = sourceColors[id];
            return (
                <Tag
                    title={correctName}
                    style={{textTransform: 'uppercase', background:currentBackground}}
                >
                    {correctName}
                </Tag>
            );
        },
        sorter: false
    },
    {
        title: () => <span title="Дата поступления">Поступл.</span>,
        dataIndex: 'createDate',
        key: 'createDate',
        width: 100,
        align: 'center',
        render: (dateValue) => {
            if (!dateValue){
                return '--.--.----';
            }
            const dateArray = dateValue.split('-');

            return dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
        },
        sorter: false
    },
    {
        title: '№ контр.',
        dataIndex: 'contractNumber',
        key: 'contractNumber',
        width: 105,
        sorter: false,
        render: (text) => {
            const substredText = text.length > 12 ? text.substr(0, 12) + '..' : text;
            return <span title={text}>{substredText}</span>;
        },
    },
    {
        title: 'М-жер',
        dataIndex: 'manager',
        key: 'manager',
        width: 110,
        render: (manager) => {
            if (!manager) {
                return '';
            }
            const {name = ''} = manager;
            return name;
        },
        sorter: false
    },
];

class Grid extends Component {

    render() {

        const {collection = []} = this.props;
        
        return (
            <Collapse style={{marginTop:'10px'}} defaultActiveKey={['1']}>
                <Panel header="Заказы" key="1">
                    <Table
                        rowKey="key"
                        size="small"
                        bordered={false}
                        columns={columns}
                        dataSource={collection}
                        pagination={false}
                    />
                </Panel>
            </Collapse>
        );
    }

};

export default Grid;