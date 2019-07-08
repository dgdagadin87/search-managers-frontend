import React, {Component, Fragment} from 'react';

import moment from 'moment';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import DatePicker from 'antd/lib/date-picker';


const Option = Select.Option;

class Form extends Component {

    constructor(props) {

        super(props);

        const {data = {}} = this.props;

        this.state = {
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

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.setState({ [fieldName]: value });
    }

    _renderClientsSelect(){

        const {data = {}, clients = []} = this.props;
        const {client = {}} = data;
        const {strId: clientId = ''} = client;

        return (
            <Select size="small" value={clientId} style={{ width: 373 }}>
                {clients.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    _renderManagersSelect(){

        const {data = {}, managers = []} = this.props;
        const {manager = {}} = data;
        const {strId: managerId = ''} = manager;

        return (
            <Select size="small" value={managerId} style={{ width: 373 }}>
                {managers.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    _renderOrderStateSelect(){

        const {data = {}, orderStates = []} = this.props;
        const {stateId = ''} = data;

        return (
            <Select size="small" value={'str' + stateId} style={{ width: 373 }}>
                {orderStates.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    _renderOrderSourceSelect(){

        const {data = {}, orderSources = []} = this.props;
        const {sourceId = ''} = data;

        return (
            <Select size="small" value={'str' + sourceId} style={{ width: 373 }}>
                {orderSources.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    render() {

        const dateFormat = 'DD.MM.YYYY';
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

        return (
            <Fragment>
                <Row>
                    <Col style={{}} span={6}>
                        Номер заказа
                    </Col>
                    <Col span={18}>
                        <Input
                            disabled={true}
                            size="small"
                            value={data['orderNumber']}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        ФИО Заказчика
                    </Col>
                    <Col span={18}>{this._renderClientsSelect()}</Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Менеджер
                    </Col>
                    <Col span={18}>{this._renderManagersSelect()}</Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Статус
                    </Col>
                    <Col span={18}>
                        {this._renderOrderStateSelect()}
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Источник
                    </Col>
                    <Col span={18}>
                        {this._renderOrderSourceSelect()}
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата поступления
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            style={{ width: 373 }}
                            locale={locale}
                            size="small"
                            value={createDate}
                            format={dateFormat}
                            onChange={(dateMoment) => this._onDateValueChange('createDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата выполнения
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            style={{ width: 373 }}
                            locale={locale}
                            size="small"
                            value={completeDate}
                            format={dateFormat}
                            onChange={(dateMoment) => this._onDateValueChange('completeDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Тематика заказа
                    </Col>
                    <Col span={18}>
                        <Input
                            size="small"
                            value={theme}
                            onChange={(e) => this._onTextValueChange(e, 'theme')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Номер договора
                    </Col>
                    <Col span={18}>
                        <Input
                            size="small"
                            value={contractNumber}
                            onChange={(e) => this._onTextValueChange(e, 'contractNumber')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата договора
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            style={{ width: 373 }}
                            locale={locale}
                            size="small"
                            value={contractDate}
                            format={dateFormat}
                            onChange={(dateMoment) => this._onDateValueChange('contractDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Номер счета
                    </Col>
                    <Col span={18}>
                    <Input
                        size="small"
                        value={accountNumber}
                        onChange={(e) => this._onTextValueChange(e, 'accountNumber')}
                    />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата оплаты
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            style={{ width: 373 }}
                            locale={locale}
                            size="small"
                            value={paymentDate}
                            format={dateFormat}
                            onChange={(dateMoment) => this._onDateValueChange('paymentDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата акта
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            style={{ width: 373 }}
                            locale={locale}
                            size="small"
                            value={actDate}
                            format={dateFormat}
                            onChange={(dateMoment) => this._onDateValueChange('actDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        НДС %
                    </Col>
                    <Col span={18}>
                        <Input
                            size="small"
                            value={valueAddedTax}
                            onChange={(e) => this._onTextValueChange(e, 'valueAddedTax')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Сумма договора
                    </Col>
                    <Col span={18}>
                        <Input
                            size="small"
                            value={contactAmount}
                            onChange={(e) => this._onTextValueChange(e, 'contactAmount')}
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }

};

export default Form;