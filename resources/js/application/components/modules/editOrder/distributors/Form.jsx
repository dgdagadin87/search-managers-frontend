import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    asyncSaveDistributor,
    setDistributorData
} from '../../../../actions/distributors';

import {
    formatRawDate,
    formatDate,
    formatDateForSend
} from '../../../../../core/coreUtils';

import Modal from 'antd/lib/Modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';

import DatePicker from '../../../parts/DatePicker';

const mapStateToProps = (state) => {
    return {
        disabled: state.distributorsData.disabled,
        orderData: state.orderData.orderData,
        visible: state.distributorsData.visible,
        distributors: state.distributorsData.distributors,
        distributorsData: state.distributorsData.distributorsData,
        distribSources: state.commonData.distribSources
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        asyncSaveDistributor,
        setDistributorData
    }, dispatch);
}


const fieldNames = {
    square: 'Площадь',
    price: 'Стоимость'
};

const Option = Select.Option;

class DistributorsForm extends Component {

    _onDateValueChange(fieldName, dateMoment) {

        const { setDistributorData, distributorsData = {} } = this.props;
        let correctValue;

        if (!dateMoment) {
            correctValue = null;
        }
        else {
            correctValue = formatRawDate(dateMoment.toDate());
        }

        const newDataRest = { [fieldName]: correctValue };
        
        const correctData = { ...distributorsData, ...newDataRest };

        setDistributorData({ distributorsData: correctData } );
    }

    _onNumberValueChange(e, fieldName) {

        const value = e.target.value;

        if (isNaN(value)) {
            Message.error(`Поле "${fieldNames[fieldName]}" должно содержать только число`, 3);
            return;
        }

        this.props.setDistributorData({
            distributorsData: {
                ...this.props.distributorsData,
                [fieldName]: value
            }
        });
    }

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.props.setDistributorData({
            distributorsData: {
                ...this.props.distributorsData,
                [fieldName]: value
            }
        });
    }

    _onSelectChange(source) {

        this.props.setDistributorData({
            distributorsData: {
                ...this.props.distributorsData,
                source
            }
        });
    }

    _onCancel () {
        
        const {setDistributorData} = this.props;

        setDistributorData({ visible: false });
    }

    _onSaveClick() {

        const {
            distributorsData = {},
            orderData: { id:orderId = null }
        } = this.props;
        const {
            account = '',
            code = '',
            distDate = null,
            number = '',
            price = null,
            square = null,
            source = null,
            id = false
        } = distributorsData;

        const dataToSend = {
            distDate: formatDateForSend(distDate),
            account, code, number, price, square, source, orderId
        };

        if (id !== false) {
            dataToSend['id'] = id;
        }

        this.props.asyncSaveDistributor(orderId, dataToSend);
    }

    _renderDistribSourceSelect(){

        const {distributorsData: { source = null }, distribSources = [], disabled = false} = this.props;

        return (
            <Select
                placeholder="Выберите дистр. источник"
                disabled={disabled}
                value={source ? String(source) : undefined}
                style={{ width: 341 }}
                onChange={this._onSelectChange.bind(this)}
            >
                {distribSources.map(item => {
                    return (
                        <Option
                            key={item['id']}
                            value={String(item['id'])}
                        >{item['name']}</Option>)
                })}
            </Select>
        );
    }

    render() {

        const { visible = false, disabled = false, distributorsData } = this.props;
        const {
            account = '',
            code = '',
            distDate = null,
            number = '',
            price = null,
            square = null,
            id = false
        } = distributorsData;

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
                            placeholder="Введите аккаунт"
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
                            placeholder="Введите код съемки"
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
                            placeholder="Введите номер"
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
                            value={formatDate(distDate)}
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
                            onChange={(e) => this._onNumberValueChange(e, 'square')}
                            placeholder="Введите площадь"
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
                            onChange={(e) => this._onNumberValueChange(e, 'price')}
                            placeholder="Введите стоимость"
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }

};

DistributorsForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    orderData: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    distributors: PropTypes.array.isRequired,
    distributorsData: PropTypes.object.isRequired,
    distribSources: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DistributorsForm);