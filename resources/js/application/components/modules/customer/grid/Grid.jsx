import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import Collapse from 'antd/lib/collapse';
import Tag from 'antd/lib/tag';

import Table from '../../../parts/Table';


const Panel = Collapse.Panel;

const stateColors = {
    '1': {name: 'Предварительный', color: '#E1E1FF', short: 'Предв.'},
    '12': {name: 'Оформление договора', color: '#FBEC5D', short: 'Оформл. дог-ра'},
    '2': {name: 'К оплате', color:'#FFE1E1'},
    '7': {name: 'Оплачен, в обработке', color: '#FFEECC', short: 'Оплачен, в обр.'},
    '3': {name: 'В работе', color: '#FFFFCC'},
    '9': {name: 'Оформление акта', color: '#FBEC5D', short: 'Оформл. акта'},
    '17': {name: 'В оплате по акту', color: '#FBEC5D', short: 'Опл. п/а'},
    '6': {name: 'Оплачен, выполнен', color: '#D8FFD8', short: 'Опл., вып.'},
    '8': {name: 'Выполнен без оплаты', color: '#CCCCCC', short: 'Выполнен, б/о'},
    '4': {name: 'Выполнен', color: '#C8FFC8'},
    '5': {name: 'Отменен', color: '#CCCCCC'},
    '15': {name: 'Оплата по акту, в обработке', color: '#FFEECC', short: 'Опл. п/а, в обр.'},
    '18': {name: 'Выполнен, задержка оплаты', color: '#FFFFCC', short: 'Выполнен, з/о'},
};

const sourceColors = {
    '3': '#AAFFAA',
    '4': '#CCFFCC',
    '1': '#FFAAAA',
    '2': '#FFCCCC',
    '5': '#DDDDFF'
};

const columns = [
    {
        title: () => <span>Название</span>,
        dataIndex: 'name',
        key: 'contractNumber',
        width: 305,
        sorter: false,
        render: (text, record) => {
            const substredText = text.length > 33 ? text.substr(0, 33) + '..' : text;
            return (
                <Link title={text} to={'/orders/edit/' + record['number']}>{substredText}</Link>
            );
        }
    },
    {
        title: 'Заказчик',
        dataIndex: 'client',
        key: 'client',
        width: 140,
        render: (client) => {
            const {name = ''} = client;
            return name;
        },
        sorter: false
    },
    {
        title: 'Менеджер',
        dataIndex: 'manager',
        key: 'manager',
        width: 140,
        render: (manager) => {
            if (!manager) {
                return '';
            }
            const {name = ''} = manager;
            return name;
        },
        sorter: false
    },
    {
        title: 'Организация',
        dataIndex: 'client',
        key: 'organization',
        render: (client) => {
            const {agent = ''} = client;
            return agent;
        },
        style: {background:'red'},
        sorter: false
    },
    {
        title: 'Статус',
        dataIndex: 'stateId',
        width: 120,
        key: 'stateId',
        align: 'center',
        render: (stateId) => {
            const currentState = stateColors[stateId] || {};
            const {color = '', name = '', short = false} = currentState;
            return <Tag title={name} style={{textTransform: 'uppercase', background:color}}>{short ? short : name}</Tag>;
        },
        sorter: false
    },
    {
        title: 'Источник',
        dataIndex: 'source',
        key: 'source',
        width: 85,
        align: 'center',
        render: (source) => {
            const {name = '', id = '0'} = source;
            const currentBackground = sourceColors[id];
            return <Tag title={name} style={{textTransform: 'uppercase', background:currentBackground}}>{name}</Tag>;
        },
        sorter: false
    },
    {
        title: () => <span title="Дата поступления">Поступление</span>,
        dataIndex: 'createDate',
        key: 'createDate',
        width: 95,
        align: 'center',
        sorter: false
    },
    {
        title: () => <span title="Дата выполнения">Выполнение</span>,
        dataIndex: 'completeDate',
        key: 'completeDate',
        width: 95,
        align: 'center',
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
                        bordered={true}
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