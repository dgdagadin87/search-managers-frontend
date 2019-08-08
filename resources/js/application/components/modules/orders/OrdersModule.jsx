import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Link} from 'react-router-dom';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetOrders,
    changeSearch,
    changeOnlyMy,
    changeOnlyActive
} from '../../../actions/orders';

import PageHeader from 'antd/lib/page-header';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';

import Table from '../../parts/Table';
import Spinner from '../../parts/Spinner';


const mapStateToProps = (state) => {
    return {
        data: state.ordersData.collection,
        isLoading: state.ordersData.isLoading,
        page: state.ordersData.page,
        pages: state.ordersData.pages,
        count: state.ordersData.count,
        sortBy: state.ordersData.sortBy,
        sortType: state.ordersData.sortType,
        searchString: state.ordersData.searchString,
        onlyMy: state.ordersData.onlyMy,
        onlyActive: state.ordersData.onlyActive
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        changeSearch,
        changeOnlyMy,
        changeOnlyActive,
        asyncGetOrders
    }, dispatch);
}


class OrdersModule extends Component {

    constructor(...props){

        super(...props);

        this._stateColors = {
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
        }

        this._sourceColors = {
            '3': '#AAFFAA',
            '4': '#CCFFCC',
            '1': '#FFAAAA',
            '2': '#FFCCCC',
            '5': '#DDDDFF'
        }
    }

    componentDidMount() {

        const { data, changeTitle, asyncGetOrders } = this.props;

        if (data === false) {

            const { page, sortBy, sortType, searchString, onlyMy, onlyActive } = this.props;

            asyncGetOrders(
                {sortBy, sortType},
                {searchString, onlyActive, onlyMy},
                {page}
            );
        }
        else {
            changeTitle('Заказы');
        }
    }

    _onTableChange(pagination, filters, sorter) {

        const {asyncGetOrders} = this.props;
        const {field: sortBy = false, order: sortType = false} = sorter;
        const {current: page = 1} = pagination;
        const { searchString = '', onlyMy = false, onlyActive = false } = this.props;

        asyncGetOrders(
            {sortBy, sortType},
            {searchString, onlyActive, onlyMy},
            {page}
        );
    }

    _onSearch(){

        const { page, sortBy, sortType, searchString, onlyMy, onlyActive, asyncGetOrders } = this.props;

        asyncGetOrders(
            {sortBy, sortType},
            {searchString, onlyActive, onlyMy},
            {page}
        );
    }

    _onMyChange(ev){

        const { page, sortBy, sortType, searchString, onlyActive, asyncGetOrders, changeOnlyMy } = this.props;
        const onlyMy = ev.target.checked;

        changeOnlyMy(onlyMy);

        asyncGetOrders(
            {sortBy, sortType},
            {searchString, onlyActive, onlyMy},
            {page}
        );
    }

    _onActiveChange(ev){

        const { page, sortBy, sortType, searchString, onlyMy, asyncGetOrders, changeOnlyActive } = this.props;
        const onlyActive = ev.target.checked;

        changeOnlyActive(onlyActive);

        asyncGetOrders(
            {sortBy, sortType},
            {searchString, onlyActive, onlyMy},
            {page}
        );
    }

    _onSearchChange(ev) {

        const {changeSearch} = this.props;
        const {target: {value = ''}} = ev;
        
        changeSearch(value);
    }

    _renderTableFilter() {

        const Search = Input.Search;
        const {searchString = '', onlyActive = false, onlyMy = false} = this.props;

        return (
            <Row>
                <Col span={3}>
                    <Button
                        style={{width:'155px'}}
                        type="primary"
                        onClick={() => history.push('/customers/addcustomer')}
                    >Добавить заказ</Button>
                </Col>
                <Col span={15}>
                    <Search
                        placeholder="Поиск заказов по названию, номеру договора, менеджеру, клиенту, организации"
                        enterButton={true}
                        size="default"
                        allowClear={true}
                        onSearch={this._onSearch.bind(this)}
                        onChange={this._onSearchChange.bind(this)}
                        value={searchString}
                    />
                </Col>
                <Col span={6} style={{textAlign:'right', paddingTop:'5px'}}>
                    <Checkbox onChange={this._onMyChange.bind(this)} checked={onlyMy}>Мои заказы</Checkbox>
                    <Checkbox onChange={this._onActiveChange.bind(this)} checked={onlyActive}>Активные</Checkbox>
                </Col>
            </Row>
        );
    }

    _renderTable() {

        const columns = [
            {
                title: () => <span>Название</span>,
                dataIndex: 'name',
                key: 'contractNumber',
                width: 305,
                sorter: true,
                render: (text, record) => {
                    const substredText = text.length > 33 ? text.substr(0, 33) + '..' : text;
                    return (
                        <Link title={text} to={'/orders/' + record['number']}>{substredText}</Link>
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
                sorter: true
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
                sorter: true
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
                    const currentState = this._stateColors[stateId] || {};
                    const {color = '', name = '', short = false} = currentState;
                    return <Tag title={name} style={{textTransform: 'uppercase', background:color}}>{short ? short : name}</Tag>;
                },
                sorter: true
            },
            {
                title: 'Источник',
                dataIndex: 'source',
                key: 'source',
                width: 85,
                align: 'center',
                render: (source) => {
                    const {name = '', id = '0'} = source;
                    const currentBackground = this._sourceColors[id];
                    return <Tag title={name} style={{textTransform: 'uppercase', background:currentBackground}}>{name}</Tag>;
                },
                sorter: true
            },
            {
                title: () => <span title="Дата поступления">Поступление</span>,
                dataIndex: 'createDate',
                key: 'createDate',
                width: 95,
                align: 'center',
                sorter: true
            },
            {
                title: () => <span title="Дата выполнения">Выполнение</span>,
                dataIndex: 'completeDate',
                key: 'completeDate',
                width: 95,
                align: 'center',
                sorter: true
            },
        ];

        const {data = [], page = 1, count = 1, isLoading = false} = this.props;
        const correctData = data === false ? [] : data;

        return (
            <Table
                rowKey="key"
                loading={isLoading}
                columns={columns}
                dataSource={correctData}
                bordered={false}
                size="middle"
                pagination={{current: page, total: count, pageSize: 20}}
                title={() => this._renderTableFilter()}
                onChange={this._onTableChange.bind(this)}
            />
        );
    }

    _renderBody() {

        return (
            <div className="order-list">
                <PageHeader
                    onBack={() => null}
                    title="Заказы"
                    subTitle="Отображение списка заказов с возможностью фильтрации"
                />
                {this._renderTable()}
            </div>
        );
    }

    render() {

        const { isLoading, data } = this.props;

        return isLoading && data === false ? <Spinner /> : this._renderBody();
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersModule);