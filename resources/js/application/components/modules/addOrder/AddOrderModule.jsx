import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncAddOrder,
    setAddOrderData
} from '../../../actions/order';

import { formatRawDate } from '../../../../core/coreUtils';

import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Message from 'antd/lib/message';
import Notification from 'antd/lib/notification';

import ClientSelect from '../../parts/ClientsSelect';
import DatePicker from '../../parts/DatePicker';

import { uiSettings } from '../../../../config/settings';
import { formatDate } from '../../../../core/coreUtils';

const mapStateToProps = (state) => {
    return {
        disabled: state.addOrderData.disabled,
        orderData: state.addOrderData.orderData,
        orgTypes: state.commonData.orgTypes,
        managers: state.commonData.managers,
        orderStates: state.commonData.orderStates,
        orderSources: state.commonData.orderSources,
        distribSources: state.commonData.distribSources,
        applications: state.commonData.applications
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        setAddOrderData,
        asyncAddOrder
    }, dispatch);
}

const Option = Select.Option;
const { TextArea } = Input;

const fieldNames = {
    contactAmount: 'Сумма договора',
    valueAddedTax: 'НДС'
};

class AddOrderModule extends Component {

    constructor(props) {

        super(props);

        this._showError = this._showError.bind(this);
    }

    componentDidMount() {

        const {changeTitle} = this.props;

        changeTitle('Добавление заказа');
    }

    _showError(errorText) {

        Notification['error']({
            message: 'Ошибка',
            description: errorText,
            duration: 0
        });
    }

    _onSaveHandler() {

        const transformDate = (dateInput) => dateInput ? formatDate(dateInput).format('YYYY-MM-DD') : null;
        const {history, orderData = {}} = this.props;
        const {
            createDate = null,
            completeDate = null,
            contractDate = null,
            paymentDate = null,
            actDate = null,
            source = undefined,
            client = {}
        } = orderData;

        const dataToSend = {
            ...orderData,
            createDate: transformDate(createDate),
            completeDate: transformDate(completeDate),
            contractDate: transformDate(contractDate),
            paymentDate: transformDate(paymentDate),
            actDate: transformDate(actDate),
            source: source || 0,
            client: client['id'] || null
        };

        this.props.asyncAddOrder(dataToSend, history, this._showError);
    }

    _onTextValueChange(fieldName, e) {

        const {setAddOrderData, orderData = {}} = this.props;
        const value = e.target.value;

        const newDataRest = { [fieldName]: value };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setAddOrderData(correctOrderData);
    }

    _onNumberValueChange(fieldName, e) {

        const {setAddOrderData, orderData = {}} = this.props;
        const value = e.target.value;

        if (isNaN(value)) {
            Message.error(`Поле "${fieldNames[fieldName]}" должно содержать только число`, 3);
            return;
        }

        const newDataRest = { [fieldName]: value };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setAddOrderData(correctOrderData);
    }

    _onSelectValueChange(fieldName, value) {

        const {setAddOrderData, orderData = {}} = this.props;
        const newDataRest = { [fieldName]: value };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setAddOrderData(correctOrderData);
    }

    _onClientSelectChange(value, meta) {

        const { setAddOrderData, orderData = {} } = this.props;
        const {props: { children: clientName = '' }} = meta;
        const clientData = { client: { id: value, name: clientName } };
        const correctOrderData = { ...orderData, ...clientData };

        setAddOrderData(correctOrderData);
    }

    _onDateValueChange(fieldName, dateMoment) {

        const { setAddOrderData, orderData = {} } = this.props;
        let correctValue;

        if (!dateMoment) {
            correctValue = null;
        }
        else {
            correctValue = formatRawDate(dateMoment.toDate());
        }

        const newDataRest = { [fieldName]: correctValue };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setAddOrderData(correctOrderData);
    }

    _renderManagersSelect(){

        const {orderData = {}, managers = [], disabled = false} = this.props;
        const {manager = undefined} = orderData;

        return (
            <Select
                disabled={disabled}
                size={uiSettings['fieldSize']}
                value={manager}
                style={{ width: uiSettings['formFieldWidth'] }}
                placeholder="Выберите менеджера"
                onChange={this._onSelectValueChange.bind(this, 'manager')}
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
        );
    }

    _renderApplicationSelect(){

        const {orderData = {}, applications = [], disabled = false} = this.props;
        const {theme = undefined} = orderData;

        return (
            <Select
                allowClear={true}
                disabled={disabled}
                size={uiSettings['fieldSize']}
                value={theme}
                style={{ width: uiSettings['formFieldWidth'] }}
                placeholder="Выберите тематику заказа"
                onChange={this._onSelectValueChange.bind(this, 'theme')}
            >
                {applications.map(item => {
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

    _renderOrderStateSelect(){

        const {orderData = {}, orderStates = [], disabled = false} = this.props;
        const {state = undefined} = orderData;

        return (
            <Select
                allowClear={true}
                disabled={disabled}
                size={uiSettings['fieldSize']}
                value={state}
                style={{ width: uiSettings['formFieldWidth'] }}
                placeholder="Выберите статус заказа"
                onChange={this._onSelectValueChange.bind(this, 'state')}
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
        );
    }

    _renderOrderSourceSelect(){

        const {orderData = {}, orderSources = [], disabled = false} = this.props;
        const {source = undefined} = orderData;

        return (
            <Select
                allowClear={true}
                size={uiSettings['fieldSize']}
                value={source}
                disabled={disabled}
                style={{ width: uiSettings['formFieldWidth'] }}
                placeholder="Выберите источник заказа"
                onChange={this._onSelectValueChange.bind(this, 'source')}
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
        );
    }

    _renderHeader() {

        const {orderData = {}, disabled = false} = this.props;
        const {
            name = '',
            createDate = null,
            contractNumber = '',
            theme = '',
            state = undefined,
            manager = undefined,
            client = {},
            contractDate = null,
            accountNumber = null
        } = orderData;
        const isEmptyContractNumber = !contractNumber;
        let isDisabled = !name || !createDate || !state || !manager || !client || !client.hasOwnProperty('id');
        if (!isEmptyContractNumber) {
            isDisabled = !theme || !contractDate || !accountNumber;
        }

        return (
            <PageHeader
                onBack={() => history.push('/orders')}
                title={'Новый заказ'}
                subTitle={'Добавление нового заказа'}
                extra={[
                    <Button
                        disabled={isDisabled || disabled}
                        key="save"
                        onClick={this._onSaveHandler.bind(this)}
                        type="primary"
                    >
                        Добавить в систему
                    </Button>
                ]}
            />
        )
    }

    _renderForm() {

        const { orderData = {}, disabled = false } = this.props;
        const {
            comment = '',
            request  ='',
            xstatus = '',
            name = '',
            client = {},
            createDate = null,
            completeDate = null,
            contractNumber = '',
            contractDate = null,
            accountNumber = '',
            paymentDate = null,
            actDate = null,
            valueAddedTax = null,
            contactAmount = null
        } = orderData;

        const isEmptyContractNumber = !contractNumber;

        return (
            <Row>
                <Col span={10}>
                    <Card
                        className="details-card"
                        style={{marginRight:'10px'}}
                        size="small"
                        title="Детали заказа"
                    >
                        <Row>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Название заказа</span>
                                <span className="strict">*</span>
                            </Col>
                            <Col span={17}>
                                <Input
                                    maxLength={50}
                                    disabled={disabled}
                                    size={uiSettings['fieldSize']}
                                    value={name}
                                    placeholder="Введите название заказа"
                                    onChange={this._onTextValueChange.bind(this, 'name')}
                                />
                            </Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">ФИО Заказчика</span>
                                <span className="strict">*</span>
                            </Col>
                            <Col span={17}>
                                <ClientSelect
                                    disabled={disabled}
                                    value={client}
                                    onChange={this._onClientSelectChange.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Менеджер</span>
                                <span className="strict">*</span>
                            </Col>
                            <Col span={17}>{this._renderManagersSelect()}</Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Статус</span>
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
                                <span className="order-label">Дата поступления</span>
                                <span className="strict">*</span>
                            </Col>
                            <Col span={17}>
                                <DatePicker
                                    disabled={disabled}
                                    style={{ width: uiSettings['formFieldWidth'] }}
                                    size={uiSettings['fieldSize']}
                                    value={formatDate(createDate)}
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
                                    disabled={disabled}
                                    style={{ width: uiSettings['formFieldWidth'] }}
                                    size={uiSettings['fieldSize']}
                                    value={formatDate(completeDate)}
                                    onChange={(dateMoment) => this._onDateValueChange('completeDate', dateMoment)}
                                />
                            </Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Тематика заказа</span>
                                {isEmptyContractNumber ? null : <span className="strict">*</span>}
                            </Col>
                            <Col span={17}>{this._renderApplicationSelect()}</Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Номер договора</span>
                            </Col>
                            <Col span={17}>
                                <Input
                                    disabled={disabled}
                                    size={uiSettings['fieldSize']}
                                    value={contractNumber}
                                    onChange={this._onTextValueChange.bind(this, 'contractNumber')}
                                    placeholder="Введите номер договора"
                                />
                            </Col>
                        </Row>

                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Дата договора</span>
                                {isEmptyContractNumber ? null : <span className="strict">*</span>}
                            </Col>
                            <Col span={17}>
                                <DatePicker
                                    disabled={disabled}
                                    style={{ width: uiSettings['formFieldWidth'] }}
                                    size={uiSettings['fieldSize']}
                                    value={formatDate(contractDate)}
                                    onChange={(dateMoment) => this._onDateValueChange('contractDate', dateMoment)}
                                />
                            </Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">Номер счета</span>
                                {isEmptyContractNumber ? null : <span className="strict">*</span>}
                            </Col>
                            <Col span={17}>
                            <Input
                                disabled={disabled}
                                size={uiSettings['fieldSize']}
                                value={accountNumber}
                                onChange={this._onTextValueChange.bind(this, 'accountNumber')}
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
                                    disabled={disabled}
                                    style={{ width: uiSettings['formFieldWidth'] }}
                                    size={uiSettings['fieldSize']}
                                    value={formatDate(paymentDate)}
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
                                    disabled={disabled}
                                    style={{ width: uiSettings['formFieldWidth'] }}
                                    size={uiSettings['fieldSize']}
                                    value={formatDate(actDate)}
                                    onChange={(dateMoment) => this._onDateValueChange('actDate', dateMoment)}
                                />
                            </Col>
                        </Row>
                        <Row style={uiSettings['labelStyle']}>
                            <Col style={{paddingTop: '4px'}} span={7}>
                                <span className="order-label">НДС (%)</span>
                            </Col>
                            <Col span={17}>
                                <Input
                                    disabled={disabled}
                                    size={uiSettings['fieldSize']}
                                    value={valueAddedTax}
                                    onChange={this._onNumberValueChange.bind(this, 'valueAddedTax')}
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
                                    disabled={disabled}
                                    size={uiSettings['fieldSize']}
                                    value={contactAmount}
                                    onChange={this._onNumberValueChange.bind(this, 'contactAmount')}
                                    placeholder="Введите сумму договора"
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={14}>
                    <Card
                        size="small"
                        title="Примечания"
                    >
                        <TextArea
                            disabled={disabled}
                            onChange={this._onTextValueChange.bind(this, 'comment')}
                            value={comment}
                            placeholder="Введите примечание"
                            className="custom"
                            style={{ height: 143 }}
                        />
                    </Card>
                    <Card
                        style={{marginTop: '10px'}}
                        size="small"
                        title="Запрос"
                    >
                        <TextArea
                            disabled={disabled}
                            onChange={this._onTextValueChange.bind(this, 'request')}
                            value={request}
                            placeholder="Введите запрос"
                            className="custom"
                            style={{ height: 130 }}
                        />
                    </Card>
                    <Card
                        style={{marginTop: '10px'}}
                        size="small"
                        title="Состояние/Кто-что-когда"
                    >
                        <TextArea
                            disabled={disabled}
                            onChange={this._onTextValueChange.bind(this, 'xstatus')}
                            value={xstatus}
                            placeholder="Введите состояние/кто-что-когда"
                            className="custom"
                            style={{ height: 130 }}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }

    render() {

        return (
            <div className="order">
                {this._renderHeader()}
                {this._renderForm()}
            </div>
        );
    }

};

AddOrderModule.propTypes = {
    disabled: PropTypes.bool.isRequired,
    orderData: PropTypes.object.isRequired,
    orgTypes: PropTypes.array.isRequired,
    managers: PropTypes.array.isRequired,
    orderStates: PropTypes.array.isRequired,
    orderSources: PropTypes.array.isRequired,
    distribSources: PropTypes.array.isRequired,
    applications: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderModule);