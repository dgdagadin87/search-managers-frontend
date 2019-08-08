import React, {Component, Fragment} from 'react';

import moment from 'moment';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Empty from 'antd/lib/empty';

import DatePicker from '../../../parts/DatePicker';

import Request from '../../../../../core/request';
import {createUrl} from '../../../../../core/coreUtils';
import {
    defaultSettings,
    urlSettings,
    uiSettings
} from '../../../../../config/settings';


const Option = Select.Option;

class Form extends Component {

    constructor(props) {

        super(props);

        const {data = {}} = this.props;

        this.state = {
            clientsIsLoading: false,
            clientsSource: [],

            manager: data['manager'] || {},
            client: data['client'] || {},
            theme: data['theme'],
            contractNumber: data['contractNumber'],
            accountNumber: data['accountNumber'],
            valueAddedTax: data['valueAddedTax'],
            contactAmount: data['contactAmount'],
            createDate: this._formatDate(data['createDate']),
            completeDate: this._formatDate(data['completeDate']),
            contractDate: this._formatDate(data['contractDate']),
            paymentDate: this._formatDate(data['paymentDate']),
            actDate: this._formatDate(data['actDate'])
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {

        const {data = {}} = newProps;

        this.setState({
            clientsIsLoading: false,
            clientsSource: [],

            manager: data['manager'] || {},
            client: data['client'] || {},
            theme: data['theme'],
            contractNumber: data['contractNumber'],
            accountNumber: data['accountNumber'],
            valueAddedTax: data['valueAddedTax'],
            contactAmount: data['contactAmount'],
            createDate: this._formatDate(data['createDate']),
            completeDate: this._formatDate(data['completeDate']),
            contractDate: this._formatDate(data['contractDate']),
            paymentDate: this._formatDate(data['paymentDate']),
            actDate: this._formatDate(data['actDate'])
        });
    }

    _formatDate(date) {

        const dateFormat = 'DD.MM.YYYY';
        let correctDate = !date ? {} : date;

        if (!correctDate.hasOwnProperty('day')) {
            return null;
        }

        const correctDay = correctDate['day'] < 10 ? String('0' + correctDate['day']) : String(correctDate['day']);
        const correctMonth = correctDate['month'] < 10 ? String('0' + correctDate['month']) : String(correctDate['month']);
        const correctYear = String(correctDate['year']);

        return moment(correctDay + '.' + correctMonth + '.' + correctYear, dateFormat);
    }

    _onDateValueChange(fieldName, dateMoment) {

        this.setState({ [fieldName]: dateMoment });
    }

    _onClientSelectChange(value, meta) {

        const {props: { children: clientName = '' }} = meta;

        this.setState({ client: { id: value, name: clientName } });
    }

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.setState({ [fieldName]: value });
    }

    _onClientSelectSearch(searchValue) {

        if (!searchValue || String(searchValue).length < 3) {
            return;
        }

        this.setState({
            clientsIsLoading: true
        }, () => {
            Request.send({
                url: createUrl(defaultSettings, urlSettings['autocompleteCustomers']),
                data: { searchString: searchValue },
            })
            .then( (response) => {

                const { collection = [] } = response;

                this.setState({
                    clientsSource: collection,
                    clientsIsLoading: false
                });
            })
            .catch((error) => {
                this.setState({ clientsIsLoading: false });
                console.log('error', error);
            });
        });
    }

    _renderClientsSelect(){

        const {client = {}, clientsSource = [], clientsIsLoading = false} = this.state;
        const clientName = client['name'] || '';

        return (
            <Select
                showSearch={true}
                size={uiSettings['fieldSize']}
                value={clientName}
                style={{ width: uiSettings['formFieldWidth'] }}
                defaultActiveFirstOption={false}
                filterOption={false}
                loading={clientsIsLoading}
                suffixIcon={<Icon type="search" />}
                notFoundContent={<Empty description="Начните вводить ФИО заказчика" />}
                onChange={this._onClientSelectChange.bind(this)}
                onSearch={this._onClientSelectSearch.bind(this)}
            >
                {clientsSource.map(item => {
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
        );
    }

    _renderManagersSelect(){

        const {data = {}, managers = []} = this.props;
        const {manager = {}} = data;
        const {strId: managerId = ''} = manager;

        return (
            <Select
                size={uiSettings['fieldSize']}
                value={managerId}
                style={{ width: uiSettings['formFieldWidth'] }}
            >
                {managers.map(item => {
                    return (
                        <Option
                            key={item['strId']}
                            value={String(item['strId'])}
                        >
                            {item['name']}
                        </Option>
                    );
                })}
            </Select>
        );
    }

    _renderOrderStateSelect(){

        const {data = {}, orderStates = []} = this.props;
        const {stateId = ''} = data;

        return (
            <Select
                size={uiSettings['fieldSize']}
                value={'str' + stateId}
                style={{ width: uiSettings['formFieldWidth'] }}
            >
                {orderStates.map(item => {
                    return (
                        <Option
                            key={item['strId']}
                            value={String(item['strId'])}
                        >
                            {item['name']}
                        </Option>
                    );
                })}
            </Select>
        );
    }

    _renderOrderSourceSelect(){

        const {data = {}, orderSources = []} = this.props;
        const {sourceId = ''} = data;

        return (
            <Select
                size={uiSettings['fieldSize']}
                value={'str' + sourceId}
                style={{ width: uiSettings['formFieldWidth'] }}
            >
                {orderSources.map(item => {
                    return (
                        <Option
                            key={item['strId']}
                            value={String(item['strId'])}
                        >
                            {item['name']}
                        </Option>
                    );
                })}
            </Select>
        );
    }

    render() {

        const {data = {}} = this.props;
        const {
            theme = '',
            contractNumber = '',
            accountNumber = '',
            valueAddedTax = '',
            contactAmount = '',
            createDate = null,
            completeDate = null,
            contractDate = null,
            paymentDate = null,
            actDate = null
        } = this.state;

        const isEmptyContractNumber = contractNumber === '' || contractNumber === null || contractNumber === false;

        return (
            <Fragment>
                <Row>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Номер заказа</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={true}
                            size={uiSettings['fieldSize']}
                            value={data['orderNumber']}
                            placeholder="Введите номер заказа"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">ФИО Заказчика</span>&nbsp;
                        <span className="strict">*</span>
                    </Col>
                    <Col span={17}>{this._renderClientsSelect()}</Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Менеджер</span>&nbsp;
                        <span className="strict">*</span>
                    </Col>
                    <Col span={17}>{this._renderManagersSelect()}</Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Статус</span>&nbsp;
                        <span className="strict">*</span>
                    </Col>
                    <Col span={17}>
                        {this._renderOrderStateSelect()}
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Источник</span>
                    </Col>
                    <Col span={17}>
                        {this._renderOrderSourceSelect()}
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Дата поступления</span>&nbsp;
                        <span className="strict">*</span>
                    </Col>
                    <Col span={17}>
                        <DatePicker
                            style={{ width: uiSettings['formFieldWidth'] }}
                            size={uiSettings['fieldSize']}
                            value={createDate}
                            onChange={(dateMoment) => this._onDateValueChange('createDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Дата выполнения</span>
                    </Col>
                    <Col span={17}>
                        <DatePicker
                            style={{ width: uiSettings['formFieldWidth'] }}
                            size={uiSettings['fieldSize']}
                            value={completeDate}
                            onChange={(dateMoment) => this._onDateValueChange('completeDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Тематика заказа</span>&nbsp;
                        {isEmptyContractNumber ? null : <span className="strict">*</span>}
                    </Col>
                    <Col span={17}>
                        <Input
                            size={uiSettings['fieldSize']}
                            value={theme}
                            onChange={(e) => this._onTextValueChange(e, 'theme')}
                            placeholder="Введите тематику заказа"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Номер договора</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            size={uiSettings['fieldSize']}
                            value={contractNumber}
                            onChange={(e) => this._onTextValueChange(e, 'contractNumber')}
                            placeholder="Введите номер договора"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Дата договора</span>&nbsp;
                        {isEmptyContractNumber ? null : <span className="strict">*</span>}
                    </Col>
                    <Col span={17}>
                        <DatePicker
                            style={{ width: uiSettings['formFieldWidth'] }}
                            size={uiSettings['fieldSize']}
                            value={contractDate}
                            onChange={(dateMoment) => this._onDateValueChange('contractDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Номер счета</span>&nbsp;
                        {isEmptyContractNumber ? null : <span className="strict">*</span>}
                    </Col>
                    <Col span={17}>
                    <Input
                        size={uiSettings['fieldSize']}
                        value={accountNumber}
                        onChange={(e) => this._onTextValueChange(e, 'accountNumber')}
                        placeholder="Введите номер счета"
                    />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Дата оплаты</span>
                    </Col>
                    <Col span={17}>
                        <DatePicker
                            style={{ width: uiSettings['formFieldWidth'] }}
                            size={uiSettings['fieldSize']}
                            value={paymentDate}
                            onChange={(dateMoment) => this._onDateValueChange('paymentDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Дата акта</span>
                    </Col>
                    <Col span={17}>
                        <DatePicker
                            style={{ width: uiSettings['formFieldWidth'] }}
                            size={uiSettings['fieldSize']}
                            value={actDate}
                            onChange={(dateMoment) => this._onDateValueChange('actDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">НДС %</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            size={uiSettings['fieldSize']}
                            value={valueAddedTax}
                            onChange={(e) => this._onTextValueChange(e, 'valueAddedTax')}
                            placeholder="Введите НДС"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Сумма договора</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            size={uiSettings['fieldSize']}
                            value={contactAmount}
                            onChange={(e) => this._onTextValueChange(e, 'contactAmount')}
                            placeholder="Введите сумму договора"
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }

};

export default Form;