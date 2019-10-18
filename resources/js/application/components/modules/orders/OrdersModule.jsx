import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Link} from 'react-router-dom';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetOrders,
    changeSearch,
    changeOnlyActive,
    changeStateId,
    changeSourceId,
    changeManagerId
} from '../../../actions/orders';

import {
    formatDate,
    formatRawDate
} from '../../../../core/coreUtils';

import PageHeader from 'antd/lib/page-header';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Select from 'antd/lib/select';
import Tag from 'antd/lib/tag';

import Table from '../../parts/Table';
import Spinner from '../../parts/Spinner';
import { FromToPicker } from '../../parts/DatePicker';


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
        onlyActive: state.ordersData.onlyActive,
        stateId: state.ordersData.stateId,
        sourceId: state.ordersData.sourceId,
        managerId: state.ordersData.managerId,
        dateFrom: state.ordersData.dateFrom,
        dateTo: state.ordersData.dateTo,
        managers: state.commonData.managers,
        orderStates: state.commonData.orderStates,
        orderSources: state.commonData.orderSources,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        changeSearch,
        changeOnlyActive,
        changeStateId,
        changeSourceId,
        changeManagerId,
        asyncGetOrders
    }, dispatch);
}

const Option = Select.Option;

export const stateColors = {
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

export const sourceColors = {
    '3': '#AAFFAA',
    '4': '#CCFFCC',
    '1': '#FFAAAA',
    '2': '#FFCCCC',
    '5': '#DDDDFF'
}

class OrdersModule extends Component {

    componentDidMount() {

        const { data, changeTitle, asyncGetOrders } = this.props;

        if (data === false) {

            const { page, sortBy, sortType, searchString, onlyActive, stateId, sourceId } = this.props;

            asyncGetOrders(
                {sortBy, sortType},
                {searchString, onlyActive, stateId, sourceId},
                {page}
            );
        }
        else {
            changeTitle('Заказы');
        }
    }

    _createFilterObject (fieldName = false, fieldValue) {

        const {
            searchString = '',
            onlyActive = false,
            stateId = undefined,
            sourceId = undefined,
            managerId = undefined,
            dateFrom = null,
            dateTo = null
        } = this.props;

        const filter = { searchString, onlyActive, stateId, sourceId, managerId, dateFrom, dateTo };

        if (!fieldName) {
            return filter;
        }

        return { ...filter, [fieldName]: fieldValue };
    }

    _onRangeValueChange(dates) {

        const {
            page,
            sortBy,
            sortType,
            asyncGetOrders
        } = this.props;

        let correctFromValue;
        let correctToValue;

        if (!dates[0]) {
            correctFromValue = null;
        }
        else {
            correctFromValue = formatRawDate(dates[0].toDate());
        }

        if (!dates[1]) {
            correctToValue = null;
        }
        else {
            correctToValue = formatRawDate(dates[1].toDate());
        }

        asyncGetOrders(
            {sortBy, sortType},
            {
                ...this._createFilterObject(),
                dateFrom: correctFromValue,
                dateTo: correctToValue
            },
            {page}
        );
    }

    _onDateValueChange(fieldName, dateMoment) {

        const {
            page,
            sortBy,
            sortType,
            asyncGetOrders
        } = this.props;

        let correctValue;

        if (!dateMoment) {
            correctValue = null;
        }
        else {
            correctValue = formatRawDate(dateMoment.toDate());
        }

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject(fieldName, correctValue),
            {page}
        );
    }

    _onTableChange(pagination, filters, sorter) {

        const {asyncGetOrders} = this.props;
        const {field: sortBy = false, order: sortType = false} = sorter;
        const {current: page = 1} = pagination;

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject(),
            {page}
        );
    }

    _onSearch(){

        const {
            page,
            sortBy,
            sortType,
            asyncGetOrders
        } = this.props;

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject(),
            {page}
        );
    }

    _onActiveChange(ev){

        const {
            page,
            sortBy,
            sortType,
            asyncGetOrders,
            changeOnlyActive
        } = this.props;
        const onlyActive = ev.target.checked;

        changeOnlyActive(onlyActive);

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject('onlyActive', onlyActive),
            {page}
        );
    }

    _onSelectStateChange(value) {

        const {
            page,
            sortBy,
            sortType,
            changeStateId,
            asyncGetOrders
        } = this.props;

        changeStateId(value);

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject('stateId', value),
            {page}
        );
    }

    _onSelectSourceChange(value) {

        const {
            page,
            sortBy,
            sortType,
            changeSourceId,
            asyncGetOrders
        } = this.props;

        changeSourceId(value);

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject('sourceId', value),
            {page}
        );
    }

    _onSelectManagerChange(value) {

        const {
            page,
            sortBy,
            sortType,
            changeManagerId,
            asyncGetOrders
        } = this.props;

        changeManagerId(value);

        asyncGetOrders(
            {sortBy, sortType},
            this._createFilterObject('managerId', value),
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
        const {
            orderStates = [],
            orderSources = [],
            managers = [],
            searchString = '',
            onlyActive = false,
            stateId = null,
            sourceId = null,
            managerId = null,
            dateFrom = null,
            dateTo = null
        } = this.props;
        const correctState = !stateId ? undefined : String(stateId);
        const correctSource = !sourceId ? undefined : String(sourceId);
        const correctManager = !managerId ? undefined : String(managerId);

        return (
            <Fragment>
                <Search
                    title="Поиск осуществляется по названию, номеру договора, клиенту, организации"
                    key="search"
                    style={{width: '300px'}}
                    placeholder="Введите строку поиска"
                    enterButton={true}
                    size="default"
                    allowClear={true}
                    onSearch={this._onSearch.bind(this)}
                    onChange={this._onSearchChange.bind(this)}
                    value={searchString}
                />
                <Checkbox
                    style={{marginLeft:'10px'}}
                    key="onlyActive"
                    onChange={this._onActiveChange.bind(this)}
                    checked={onlyActive}
                >Активные</Checkbox>
                <Select
                    allowClear={true}
                    key="selectState"
                    className="custom-select"
                    size={'default'}
                    value={correctState}
                    style={{width:'180px', marginLeft:'5px'}}
                    placeholder="Выберите статус"
                    onChange={this._onSelectStateChange.bind(this)}
                >
                    {orderStates.map(item => {
                        return (
                            <Option
                                key={item['id']}
                                value={String(item['id'])}
                            >
                                {item['name']}
                            </Option>
                        );
                    })}
                </Select>
                <Select
                    allowClear={true}
                    key="selectSource"
                    className="custom-select"
                    size={'default'}
                    value={correctSource}
                    style={{width:'178px', marginLeft:'10px'}}
                    placeholder="Выберите источник"
                    onChange={this._onSelectSourceChange.bind(this)}
                >
                    {orderSources.map(item => {
                        return (
                            <Option
                                key={item['id']}
                                value={String(item['id'])}
                            >
                                {item['name']}
                            </Option>
                        );
                    })}
                </Select>
                <Select
                    allowClear={true}
                    key="selectManager"
                    className="custom-select"
                    size={'default'}
                    value={correctManager}
                    style={{width:'178px', marginLeft:'10px'}}
                    placeholder="Выберите менеджера"
                    onChange={this._onSelectManagerChange.bind(this)}
                >
                    {managers.map(item => {
                        return (
                            <Option
                                key={item['id']}
                                value={String(item['id'])}
                            >
                                {item['name']}
                            </Option>
                        );
                    })}
                </Select>
                <FromToPicker
                    separator="|"
                    placeholder={['Дата поступления', 'Дата выполнения']}
                    size={'default'}
                    style={{marginLeft:'10px'}}
                    value={[formatDate(dateFrom), formatDate(dateTo)]}
                    onChange={(dates) => this._onRangeValueChange(dates)}
                />
                
            </Fragment>
        );
    }

    _renderTable() {

        const {data = [], page = 1, count = 1, isLoading = false, sortBy = false, sortType = false} = this.props;
        const correctData = data === false ? [] : data;

        const columns = [
            {
                title: () => <span>Название</span>,
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                sortOrder: sortBy === 'name' && sortType,
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
                sorter: true,
                sortOrder: sortBy === 'client' && sortType
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
                sorter: true,
                sortOrder: sortBy === 'stateId' && sortType
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
                sorter: true,
                sortOrder: sortBy === 'source' && sortType
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
                    
                    return formatDate(dateValue, true);
                },
                sorter: true,
                sortOrder: sortBy === 'createDate' && sortType
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
                sorter: true,
                sortOrder: sortBy === 'manager' && sortType
            },
        ];

        return (
            <Table
                rowKey="key"
                loading={isLoading}
                columns={columns}
                dataSource={correctData}
                bordered={false}
                size="small"
                pagination={{current: page, total: count, pageSize: 100}}
                title={() => this._renderTableFilter()}
                onChange={this._onTableChange.bind(this)}
            />
        );
    }

    _renderBody() {

        return (
            <div className="order-list">
                <PageHeader
                    onBack={() => window.history.back()}
                    title="Заказы"
                    subTitle="Отображение списка заказов с возможностью фильтрации"
                    extra={[
                        <Button
                            key="addOrder"
                            type="primary"
                            onClick={() => this.props.history.push('/orders/addorder')}
                        >Добавить заказ</Button>
                    ]}
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

OrdersModule.propTypes = {
    data: PropTypes.any.isRequired,
    isLoading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sortBy: PropTypes.any.isRequired,
    sortType: PropTypes.any.isRequired,
    searchString: PropTypes.any,
    onlyActive: PropTypes.bool.isRequired,
    stateId: PropTypes.any,
    sourceId: PropTypes.any,
    managerId: PropTypes.any,
    dateFrom: PropTypes.any,
    dateTo: PropTypes.any,
    managers: PropTypes.array.isRequired,
    orderStates: PropTypes.array.isRequired,
    orderSources: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersModule);