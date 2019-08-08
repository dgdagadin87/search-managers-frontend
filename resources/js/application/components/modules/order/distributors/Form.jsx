import React, {Component} from 'react';

import moment from 'moment';

import Modal from 'antd/lib/Modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import DatePicker from '../../../parts/DatePicker';

import Request from '../../../../../core/request';
import {createUrl} from '../../../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../../../config/settings';


const Option = Select.Option;

const dateFormat = 'DD.MM.YYYY';

class Distributors extends Component {

    constructor(...props) {

        super(...props);

        const { visible = false, formData = {}, distribSources = []} = props;

        this.state = {
            disabled: false,
            visible,
            ...formData,
            distDate: this._firstFormatDate(formData['distDate']),
            distribSources
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {

        const {visible = false, formData = {}, distribSources = []} = newProps;

        this.setState({
            disabled: false,
            visible,
            ...formData,
            distribSources,
            distDate: this._firstFormatDate(formData['distDate'])
        });
    }

    _firstFormatDate(date) {

        if (!date) {
            return null;
        }

        return moment(date, 'YYYY-MM-DD');
    }

    _formatDate(date) {

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

    _onCancel () {

        const {onCancelClick} = this.props;

        if (onCancelClick) {

            onCancelClick();
        }
    }

    _onSave () {

        const {onSaveClick} = this.props;

        if (onSaveClick) {

            onSaveClick();
        }
    }

    _onSaveClick() {

        const { orderId } = this.props;
        const { account = '', code = '', distDate = null, number = '', price = null, square = null, source = null, id = false } = this.state;

        const dataToSend = {
            distDate: distDate ? distDate.format('YYYY-MM-DD') : null,
            account, code, number, price, square, source, orderId
        };

        if (id !== false) {
            dataToSend['id'] = id;
        }

        this.setState({
            disabled: true
        }, () => {
            
            Request.send({
                type: 'post',
                url: createUrl(defaultSettings, urlSettings[(id !== false ? 'edit' : 'add') + 'Distributor']),
                data: dataToSend,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
            })
            .then( (response) => {
                this.setState({
                    disabled: false
                }, () => {
                    this._onSave();
                });
                
                
            })
            .catch((error) => console.log('error', error));
        });
    }

    _onSelectChange(source) {

        this.setState({ source });
    }

    _renderDistribSourceSelect(){

        const {source = null, distribSources = [], disabled = false} = this.state;

        return (
            <Select
                disabled={disabled}
                value={source ? String(source) : null}
                style={{ width: 341 }}
                onChange={this._onSelectChange.bind(this)}
            >
                {distribSources.map(item => {
                    return <Option key={item['id']} value={String(item['id'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    render() {

        const {
            disabled = false,
            visible = false,
            account = '',
            code = '',
            distDate = null,
            number = '',
            price = null,
            square = null,
            id = false
        } = this.state;

        return (
            <Modal
                width={560}
                onCancel={this._onCancel.bind(this)}
                visible={visible}
                title={(id ? 'Редактировать' : 'Добавить') + ' дистрибьютора'}
                footer={[
                    <Button
                        disabled={disabled}
                        key="back"
                        onClick={this._onCancel.bind(this)}
                    >
                        Отмена
                    </Button>,
                    <Button
                        disabled={disabled}
                        key="submit"
                        type="primary"
                        onClick={this._onSaveClick.bind(this)}
                    >
                        {id === false ? 'Сохранить' : 'Редактировать'}
                    </Button>,
                ]}
            >
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Аккаунт</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={account}
                            onChange={(e) => this._onTextValueChange(e, 'account')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Код съемки</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={code}
                            onChange={(e) => this._onTextValueChange(e, 'code')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Дистр. номер</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={number}
                            onChange={(e) => this._onTextValueChange(e, 'number')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Дистр. источник</span>
                    </Col>
                    <Col span={16}>
                        {this._renderDistribSourceSelect()}
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Дистр. дата</span>
                    </Col>
                    <Col span={16}>
                        <DatePicker
                            disabled={disabled}
                            style={{ width: 341 }}
                            value={distDate}
                            onChange={(dateMoment) => this._onDateValueChange('distDate', dateMoment)}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Дистр. площадь</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={square}
                            onChange={(e) => this._onTextValueChange(e, 'square')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Дистр. стоимость</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={price}
                            onChange={(e) => this._onTextValueChange(e, 'price')}
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }

};

export default Distributors;