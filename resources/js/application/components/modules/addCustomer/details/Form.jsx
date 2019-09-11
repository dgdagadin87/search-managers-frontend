import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import { uiSettings } from '../../../../../config/settings';


const Option = Select.Option;

class Form extends Component {

    _onSelectChange(orgType) {

        const {onChangeState} = this.props;
        
        onChangeState({ orgType });
    }

    _onTextValueChange(e, fieldName) {

        const {onChangeState} = this.props;
        const value = e.target.value;

        onChangeState({ [fieldName]: value });
    }

    _renderOrgTypeSelect(){

        const {orgTypes = [], disabled = false, customerData = {}} = this.props;
        const {orgType = ''} = customerData;

        return (
            <Select
                placeholder="Выберите тип организации"
                disabled={disabled}
                size={uiSettings['fieldSize']}
                value={orgType && orgType != '0' ? String(orgType) : undefined}
                style={{ width: 351 }}
                onChange={this._onSelectChange.bind(this)}
            >
                {orgTypes.map(item => {
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

    render() {

        const {disabled = false, customerData = {}} = this.props;
        const {
            name = '',
            address = '',
            position = '',
            agent = '',
            phone = '',
            mobilePhone = '',
            fax = '',
            email = '',
            email2 = '',
            homePage = ''
        } = customerData;

        return (
            <Fragment>
                <Row>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">ФИО Заказчика</span>
                        <span className="strict">*</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={name}
                            onChange={(e) => this._onTextValueChange(e, 'name')}
                            placeholder="Введите ФИО"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Должность</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={position}
                            onChange={(e) => this._onTextValueChange(e, 'position')}
                            placeholder="Введите должность"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Адрес</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={address}
                            onChange={(e) => this._onTextValueChange(e, 'address')}
                            placeholder="Введите адрес"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Организация</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={agent}
                            onChange={(e) => this._onTextValueChange(e, 'agent')}
                            placeholder="Введите организацию"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Тип организации</span>
                    </Col>
                    <Col span={17}>
                        {this._renderOrgTypeSelect()}
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Телефон</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={phone}
                            onChange={(e) => this._onTextValueChange(e, 'phone')}
                            placeholder="Введите телефон"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Телефон 2</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={mobilePhone}
                            onChange={(e) => this._onTextValueChange(e, 'mobilePhone')}
                            placeholder="Введите мобильный телефон"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Факс</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={fax}
                            onChange={(e) => this._onTextValueChange(e, 'fax')}
                            placeholder="Введите факс"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Email</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={email}
                            onChange={(e) => this._onTextValueChange(e, 'email')}
                            placeholder="Введите электронную почту"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Email 2</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={email2}
                            onChange={(e) => this._onTextValueChange(e, 'email2')}
                            placeholder="Введите электронную почту"
                        />
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Веб-сайт</span>
                    </Col>
                    <Col span={17}>
                        <Input
                            disabled={disabled}
                            size={uiSettings['fieldSize']}
                            value={homePage}
                            onChange={(e) => this._onTextValueChange(e, 'homePage')}
                            placeholder="Введите веб-сайт"
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }

};

Form.propTypes = {
    onChangeState: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    customerData: PropTypes.object.isRequired,
    orgTypes: PropTypes.array.isRequired
};

export default Form;