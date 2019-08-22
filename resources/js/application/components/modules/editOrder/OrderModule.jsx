import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetOrder,
    asyncEditOrder,
    setEditOrderData
} from '../../../actions/order';

import { formatRawDate } from '../../../../core/coreUtils';

import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Collapse from 'antd/lib/collapse';
import Input from 'antd/lib/input';
import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Message from 'antd/lib/message';
import Notification from 'antd/lib/notification';

import Spinner from '../../parts/Spinner';
import ClientSelect from '../../parts/ClientsSelect';
import DatePicker from '../../parts/DatePicker';

import { uiSettings } from '../../../../config/settings';
import { formatDate } from '../../../../core/coreUtils';

import AOIGrid from './AOI/Grid';

const mapStateToProps = (state) => {
    return {
        isLoading: state.orderData.isLoading,
        disabled: state.orderData.disabled,
        orderData: state.orderData.orderData,
        orgTypes: state.commonData.orgTypes,
        managers: state.commonData.managers,
        orderStates: state.commonData.orderStates,
        orderSources: state.commonData.orderSources,
        distribSources: state.commonData.distribSources
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        asyncGetOrder,
        asyncEditOrder,
        setEditOrderData
    }, dispatch);
}

const Option = Select.Option;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const { TextArea } = Input;

const fieldNames = {
    contactAmount: 'Сумма договора',
    valueAddedTax: 'НДС'
};

class OrderModule extends Component {

    constructor(props) {

        super(props);

        this.mainRef = React.createRef();

        this._showError = this._showError.bind(this);
    }

    componentDidMount() {

        const {match, asyncGetOrder} = this.props;
        const {params} = match;
        const {id} = params;

        asyncGetOrder(id);
    }

    _showError(errorText) {

        Notification['error']({
            message: 'Ошибка',
            description: errorText,
            duration: 0
        });
    }

    _onCopyHandler() {

        const {data = {}} = this.props;
        const input = document.createElement("input");

        input.type = "text";
        input.value = data.dirPath;
        this.mainRef.current.appendChild(input);

        input.select();
        document.execCommand("copy");

        this.mainRef.current.removeChild(input);
    }

    _onSaveHandler() {

        const transformDate = (dateInput) => dateInput ? formatDate(dateInput).format('YYYY-MM-DD') : null;
        const {orderData = {}} = this.props;
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

        this.props.asyncEditOrder(dataToSend, this._showError);
    }

    _onTextValueChange(fieldName, e) {

        const {setEditOrderData, orderData = {}} = this.props;
        const value = e.target.value;

        const newDataRest = { [fieldName]: value };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setEditOrderData(correctOrderData);
    }

    _onNumberValueChange(fieldName, e) {

        const {setEditOrderData, orderData = {}} = this.props;
        const value = e.target.value;

        if (isNaN(value)) {
            Message.error(`Поле "${fieldNames[fieldName]}" должно содержать только число`, 3);
            return;
        }

        const newDataRest = { [fieldName]: value };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setEditOrderData(correctOrderData);
    }

    _onSelectValueChange(fieldName, value) {

        const {setEditOrderData, orderData = {}} = this.props;
        const newDataRest = { [fieldName]: value };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setEditOrderData(correctOrderData);
    }

    _onClientSelectChange(value, meta) {

        const { setEditOrderData, orderData = {} } = this.props;
        const {props: { children: clientName = '' }} = meta;
        const clientData = { client: { id: value, name: clientName } };
        const correctOrderData = { ...orderData, ...clientData };

        setEditOrderData(correctOrderData);
    }

    _onDateValueChange(fieldName, dateMoment) {

        const { setEditOrderData, orderData = {} } = this.props;
        let correctValue;

        if (!dateMoment) {
            correctValue = null;
        }
        else {
            correctValue = formatRawDate(dateMoment.toDate());
        }

        const newDataRest = { [fieldName]: correctValue };
        
        const correctOrderData = { ...orderData, ...newDataRest };

        setEditOrderData(correctOrderData);
    }

    _renderManagersSelect(){

        const {orderData = {}, managers = [], disabled = false} = this.props;
        const {manager = undefined} = orderData;

        return (
            <Select
                disabled={disabled}
                size={uiSettings['fieldSize']}
                value={String(manager)}
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

    _renderOrderStateSelect(){

        const {orderData = {}, orderStates = [], disabled = false} = this.props;
        const {state = undefined} = orderData;

        return (
            <Select
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
                size={uiSettings['fieldSize']}
                value={String(source)}
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
            id = null,
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
            <div ref={this.mainRef}>
                <PageHeader
                    onBack={() => null}
                    title={'Заказ №' + id}
                    subTitle={'Информация о выбранном заказе'}
                    extra={[
                        <ButtonGroup key="0">
                            <span>Путь к папке с файлами заказа</span>&nbsp;
                            <Button disabled={true} key="1">{''}</Button>
                            <Button key="2" onClick={this._onCopyHandler.bind(this)} type="primary">Скопировать</Button>
                        </ButtonGroup>,
                        <Button
                            disabled={disabled || isDisabled}
                            key="1"
                            onClick={this._onSaveHandler.bind(this)}
                            type="primary"
                        >Сохранить заказ</Button>
                    ]}
                />
            </div>
        )
    }

    _renderForm() {

        const { orderData = {}, disabled = false } = this.props;
        const {
            comment = '',
            name = '',
            client = {},
            createDate = null,
            completeDate = null,
            contractNumber = '',
            theme = '',
            contractDate = null,
            accountNumber = '',
            paymentDate = null,
            actDate = null,
            valueAddedTax = null,
            contactAmount = null
        } = orderData;

        const isEmptyContractNumber = !contractNumber;

        return (
            <Collapse style={{marginTop:'5px'}} defaultActiveKey={['1']}>
                <Panel header="Характеристики" key="1">
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
                                            maxLength={25}
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
                                        <span className="order-label">ФИО Заказчика</span>&nbsp;
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
                                        <span className="order-label">Тематика заказа</span>&nbsp;
                                        {isEmptyContractNumber ? null : <span className="strict">*</span>}
                                    </Col>
                                    <Col span={17}>
                                        <Input
                                            disabled={disabled}
                                            size={uiSettings['fieldSize']}
                                            value={theme}
                                            onChange={this._onTextValueChange.bind(this, 'theme')}
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
                                        <span className="order-label">Дата договора</span>&nbsp;
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
                                        <span className="order-label">Номер счета</span>&nbsp;
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
                                    style={{ height: 190 }}
                                />
                            </Card>
                            <AOIGrid />
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        );
    }

    _renderBody() {

        return (
            <div className="order">
                {this._renderHeader()}
                {this._renderForm()}
            </div>
        );
    }

    render() {

        const { isLoading } = this.props;

        return isLoading ? <Spinner /> : this._renderBody();
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderModule);