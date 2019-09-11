import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Link} from 'react-router-dom';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetCustomers,
    changeSearch,
    changeOrg
} from '../../../actions/customers';

import PageHeader from 'antd/lib/page-header';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';

import Spinner from '../../parts/Spinner';
import Table from '../../parts/Table';


const { Paragraph } = Typography;

const mapStateToProps = (state) => {
    return {
        data: state.customersData.collection,
        isLoading: state.customersData.isLoading,
        page: state.customersData.page,
        pages: state.customersData.pages,
        count: state.customersData.count,
        sortBy: state.customersData.sortBy,
        sortType: state.customersData.sortType,
        searchString: state.customersData.searchString,
        orgString: state.customersData.orgString
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        changeSearch,
        changeOrg,
        asyncGetCustomers
    }, dispatch);
}


class CustomersModule extends Component {

    componentDidMount() {

        const { data, changeTitle, asyncGetCustomers } = this.props;

        if (data === false) {

            const { page, sortBy, sortType, searchString, orgString } = this.props;

            asyncGetCustomers(
                {sortBy, sortType},
                {searchString, orgString},
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
        const { searchString = '', orgString = '' } = this.props;

        asyncGetCustomers(
            {sortBy, sortType},
            {searchString, orgString},
            {page}
        );
    }

    _onSearch(){

        const { page, sortBy, sortType, searchString, orgString, asyncGetCustomers } = this.props;

        asyncGetCustomers(
            {sortBy, sortType},
            {searchString, orgString},
            {page}
        );
    }

    _onSearchChange(ev) {

        const {changeSearch} = this.props;
        const {target: {value = ''}} = ev;
        
        changeSearch(value);
    }

    _onOrgChange(ev) {

        const {changeOrg} = this.props;
        const {target: {value = ''}} = ev;

        changeOrg(value);
    }

    _renderTableFilter() {

        const Search = Input.Search;
        const {searchString = '', orgString = ''} = this.props;

        return (
            <Fragment>
                <Search
                    style={{width: '640px'}}
                    placeholder="Поиск заказчиков по имени"
                    enterButton={true}
                    size="default"
                    allowClear={true}
                    onSearch={this._onSearch.bind(this)}
                    onChange={this._onSearchChange.bind(this)}
                    value={searchString}
                />
                <Search
                    style={{width: '640px', marginLeft: '10px'}}
                    placeholder="Поиск заказчиков по названию организации"
                    enterButton={true}
                    size="default"
                    allowClear={true}
                    onSearch={this._onSearch.bind(this)}
                    onChange={this._onOrgChange.bind(this)}
                    value={orgString}
                />
            </Fragment>
        );
    }

    _renderTable() {

        const {data = [], page = 1, count = 1, isLoading = false, sortBy = false, sortType = false} = this.props;
        const correctData = data === false ? [] : data;

        const columns = [
            {
                title: () => <span>Заказчик</span>,
                dataIndex: 'name',
                key: 'name',
                width: 205,
                sorter: true,
                sortOrder: sortBy === 'name' && sortType,
                render: (text, record) => {

                    return (
                        <Link
                            title={text}
                            to={'/customers/edit/' + record['id']}
                        >
                            {text || 'Имя отсутствует'}
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

                    if (!text) {
                        return <Paragraph>Адрес отсутствует</Paragraph>
                    }

                    const substredText = text.length > 150 ? text.substr(0, 150) + '....' : text;
                    return (
                        <span title={text}>{substredText}</span>
                    );
                }
            },
            {
                title: 'Организация',
                dataIndex: 'agent',
                key: 'agent',
                width: 155,
                sorter: true,
                sortOrder: sortBy === 'agent' && sortType,
            },
            {
                title: 'Телефон',
                dataIndex: 'phone',
                key: 'phone',
                width: 170,
                sorter: true,
                sortOrder: sortBy === 'phone' && sortType,
                render: (text) => {

                    if (!text) {
                        return '_(___)___-__-__';
                    }
                    
                    return text;
                }
            },
            {
                title: 'Должность',
                dataIndex: 'position',
                key: 'position',
                width: 200,
                sorter: true,
                sortOrder: sortBy === 'position' && sortType,
            },
            {
                title: 'Электронная почта',
                dataIndex: 'email',
                key: 'email',
                width: 200,
                sorter: true,
                sortOrder: sortBy === 'email' && sortType,
            }
        ];

        return (
            <Table
                key="table"
                rowKey={'id'}
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
            <Fragment>
                <PageHeader
                    key="header"
                    onBack={() => null}
                    title="Заказчики"
                    subTitle="Отображение списка заказчиков с возможностью фильтрации"
                    extra={[
                        <Button
                            key="add"
                            type="primary"
                            onClick={() => this.props.history.push('/customers/addcustomer')}
                        >Добавить заказчика</Button>
                    ]}
                />
                {this._renderTable()}
            </Fragment>
        );
    }

    render() {

        const { isLoading, data } = this.props;

        return isLoading && data === false ? <Spinner /> : this._renderBody();
    }

};

CustomersModule.propTypes = {
    data: PropTypes.any.isRequired,
    isLoading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sortBy: PropTypes.any.isRequired,
    sortType: PropTypes.any.isRequired,
    searchString: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersModule);