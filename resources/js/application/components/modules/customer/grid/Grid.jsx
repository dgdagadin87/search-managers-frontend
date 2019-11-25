import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import Collapse from 'antd/lib/collapse';
import Tag from 'antd/lib/tag';

import {
    formatDate
} from '../../../../../core/coreUtils';

import Table from '../../../parts/Table';

import stateColors from '../../orders/OrdersModule';
import sourceColors from '../../orders/OrdersModule';


const Panel = Collapse.Panel;

class Grid extends Component {

    render() {

        const {globalEvents} = this.props;

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
                            onClick={() => globalEvents.trigger('changeMenuTab', 'orders')}
                        >
                            {text}
                        </Link>
                    );
                }
            },
            {
                title: 'Статус',
                dataIndex: 'stateId',
                width: 150,
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
                width: 150,
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
                title: () => <span title="Дата поступления">Поступление</span>,
                dataIndex: 'createDate',
                key: 'createDate',
                width: 150,
                align: 'center',
                render: (dateValue) => {
                    if (!dateValue){
                        return '--.--.----';
                    }
                    
                    return formatDate(dateValue, true);
                },
                sorter: false
            },
            {
                title: '№ контракта',
                dataIndex: 'contractNumber',
                key: 'contractNumber',
                width: 250,
                sorter: false,
                render: (text) => {
                    const substredText = text.length > 12 ? text.substr(0, 12) + '..' : text;
                    return <span title={text}>{substredText}</span>;
                },
            },
            {
                title: 'Менеджер',
                dataIndex: 'manager',
                key: 'manager',
                width: 250,
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

Grid.propTypes = {
    customerId: PropTypes.string.isRequired,
    collection: PropTypes.array.isRequired,
    customerData: PropTypes.object.isRequired,
    globalEvents: PropTypes.object.isRequired
};

export default Grid;