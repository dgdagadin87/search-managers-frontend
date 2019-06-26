import React, {Component, Fragment} from 'react';

import moment from 'moment';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';


const Option = Select.Option;

class Form extends Component {

    _renderClientsSelect(){

        const {data = {}, clients = []} = this.props;
        const {client = {}} = data;
        const {strId: clientId = ''} = client;

        return (
            <Select size="small" defaultValue={'client12'} style={{ width: 373 }}>
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
            <Select size="small" defaultValue={'manager22'} style={{ width: 373 }}>
                {managers.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    _renderOrderStateSelect(){

        const orderStates = [
            {id: 1, strId: 'state1', name: 'Поступил'},
            {id: 2, strId: 'state2', name: 'В работе'},
            {id: 3, strId: 'state3', name: 'Закрыт'}
        ];

        return (
            <Select size="small" defaultValue={'state1'} style={{ width: 373 }}>
                {orderStates.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    _renderOrderSourceSelect(){

        const orderSources = [
            {id: 1, strId: 'source1', name: 'Свой архив'},
            {id: 2, strId: 'source2', name: 'Чужой архив'},
            {id: 3, strId: 'source3', name: 'Чужая съемка'}
        ];

        return (
            <Select size="small" defaultValue={'source1'} style={{ width: 373 }}>
                {orderSources.map(item => {
                    return <Option key={item['strId']} value={String(item['strId'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    render() {

        const dateFormat = 'YYYY/MM/DD';
        const {data = {}} = this.props;

        return (
            <Fragment>
                <Row>
                    <Col style={{}} span={6}>
                        Номер заказа
                    </Col>
                    <Col span={18}>
                        <Input size="small" value={data['orderNumber']} />
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
                             size="small"
                            defaultValue={moment('2014/01/01', dateFormat)}
                            format={dateFormat}
                            style={{ width: 373 }}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата выполнения
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            size="small"
                            defaultValue={moment('2015/01/01', dateFormat)}
                            format={dateFormat}
                            style={{ width: 373 }}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Тематика заказа
                    </Col>
                    <Col span={18}>
                        <Input size="small" />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Номер договора
                    </Col>
                    <Col span={18}>
                        <Input size="small" value={data['contractNumber']} />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата договора
                    </Col>
                    <Col span={18}>
                        <Input size="small" />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Номер счета
                    </Col>
                    <Col span={18}>
                        <Input size="small" value={data['chetNumber']} />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата оплаты
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            defaultValue={moment('2015/01/01', dateFormat)}
                            format={dateFormat}
                            style={{ width: 373 }}
                            size="small"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Дата акта
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            defaultValue={moment('2015/01/01', dateFormat)}
                            format={dateFormat}
                            style={{ width: 373 }}
                            size="small"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        НДС %
                    </Col>
                    <Col span={18}>
                        <Input size="small" value={data['nds']} />
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col style={{}} span={6}>
                        Сумма договора
                    </Col>
                    <Col span={18}>
                        <Input size="small" value={data['sum']} />
                    </Col>
                </Row>
            </Fragment>
        );
    }

};

export default Form;