import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Link} from 'react-router-dom';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetCustomers,
    changeSearch
} from '../../../actions/customers';

import PageHeader from 'antd/lib/page-header';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Spinner from '../../parts/Spinner';

import Table from '../../parts/Table';


const mapStateToProps = (state) => {
    return {
        data: state.customersData.collection,
        isLoading: state.customersData.isLoading,
        page: state.customersData.page,
        pages: state.customersData.pages,
        count: state.customersData.count,
        sortBy: state.customersData.sortBy,
        sortType: state.customersData.sortType,
        searchString: state.customersData.searchString
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        changeSearch,
        asyncGetCustomers
    }, dispatch);
}


class CustomersModule extends Component {

    componentDidMount() {

        const { data, changeTitle, asyncGetCustomers } = this.props;

        if (data === false) {

            const { page, sortBy, sortType, searchString } = this.props;

            asyncGetCustomers(
                {sortBy, sortType},
                {searchString},
                {page}
            );
        }
        else {
            changeTitle('Заказчики');
        }
    }

    _onTableChange(pagination, filters, sorter) {

        const {asyncGetCustomers} = this.props;
        const {field: sortBy = false, order: sortType = false} = sorter;
        const {current: page = 1} = pagination;
        const { searchString = '' } = this.props;

        asyncGetCustomers(
            {sortBy, sortType},
            {searchString},
            {page}
        );
    }

    _onSearch(){

        const { page, sortBy, sortType, searchString, asyncGetCustomers } = this.props;

        asyncGetCustomers(
            {sortBy, sortType},
            {searchString},
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
        const {history, searchString = ''} = this.props;

        return (
            <Row>
                <Col span={4}>
                    <Button
                        style={{width:'210px'}}
                        type="primary"
                        onClick={() => history.push('/customers/addcustomer')}
                    >Добавить заказчика</Button>
                </Col>
                <Col span={20}>
                    <Search
                        placeholder="Поиск заказчиков по имени, номеру телефона, электронной почты, названию организации, адресу"
                        enterButton={true}
                        size="default"
                        allowClear={true}
                        onSearch={this._onSearch.bind(this)}
                        onChange={this._onSearchChange.bind(this)}
                        value={searchString}
                    />
                </Col>
            </Row>
        );
    }

    _renderTable() {

        const columns = [
            {
                title: () => <span>Заказчик</span>,
                dataIndex: 'name',
                key: 'name',
                width: 205,
                sorter: true,
                render: (text, record) => {
                    return (
                        <Link
                            title={text}
                            to={'/customer/' + record['id']}
                        >
                            {text}
                        </Link>
                    );
                }
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
                sorter: false,
                render: (text) => {
                    const substredText = text.length > 100 ? text.substr(0, 100) + '....' : text;
                    return (
                        <span title={text}>{substredText}</span>
                    );
                }
            },
            {
                title: 'Организация',
                dataIndex: 'agent',
                key: 'agent',
                width: 305,
                sorter: true
            },
            {
                title: 'Телефон',
                dataIndex: 'phone',
                key: 'phone',
                width: 170,
                sorter: true
            },
            {
                title: 'Должность',
                dataIndex: 'position',
                key: 'position',
                width: 200,
                sorter: true
            },
            {
                title: 'Электронная почта',
                dataIndex: 'email',
                key: 'email',
                width: 200,
                sorter: true
            }
        ];

        const {data = [], page = 1, count = 1, isLoading = false} = this.props;
        const correctData = data === false ? [] : data;

        return (
            <Table
                rowKey={'id'}
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
                    title="Заказчики"
                    subTitle="Отображение списка заказчиков с возможностью фильтрации"
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomersModule);