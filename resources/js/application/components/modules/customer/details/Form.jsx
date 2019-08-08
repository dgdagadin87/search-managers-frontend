import React, {Component, Fragment} from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import { uiSettings } from '../../../../../config/settings';


const Option = Select.Option;

class Form extends Component {

    constructor(props) {

        super(props);

        const {customerData: data = {}} = this.props;

        this.state = {
            id: data['id'],
            name: data['name'],
            address: data['address'],
            agent: data['agent'],
            email: data['email'],
            email2: data['email2'],
            fax: data['fax'],
            phone: data['phone'],
            mobilePhone: data['mobilePhone'],
            position: data['position'],
            homePage: data['homePage'],
            orgType: data['orgType']
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {

        const {customerData: data = {}} = newProps;

        this.setState({
            id: data['id'],
            name: data['name'],
            address: data['address'],
            agent: data['agent'],
            email: data['email'],
            email2: data['email2'],
            fax: data['fax'],
            phone: data['phone'],
            mobilePhone: data['mobilePhone'],
            position: data['position'],
            homePage: data['homePage'],
            orgType: data['orgType']
        });
    }

    _onSetStateChange() {

        const {onChangeState} = this.props;

        onChangeState(this.state);
    }

    _onSelectChange(orgType) {

        this.setState({ orgType }, () => this._onSetStateChange());
    }

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.setState({ [fieldName]: value }, () => this._onSetStateChange());
    }

    _renderOrgTypeSelect(){

        const {orgTypes = [], disabled = false} = this.props;
        const {orgType = ''} = this.state;

        return (
            <Select
                disabled={disabled}
                size={uiSettings['fieldSize']}
                value={String(orgType)}
                style={{ width: 351 }}
                onChange={this._onSelectChange.bind(this)}
            >
                {orgTypes.map(item => {
                    return <Option key={item['id']} value={String(item['id'])}>{item['name']}</Option>
                })}
            </Select>
        );
    }

    render() {

        const {disabled = false} = this.props;
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
        } = this.state;

        return (
            <Fragment>
                <Row>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">ФИО Заказчика</span>&nbsp;
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
                        <span className="order-label">Должность</span>&nbsp;
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
                        <span className="order-label">Адрес</span>&nbsp;
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
                        <span className="order-label">Организация</span>&nbsp;
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
                        <span className="order-label">Тип организации</span>&nbsp;
                    </Col>
                    <Col span={17}>
                        {this._renderOrgTypeSelect()}
                    </Col>
                </Row>
                <Row style={uiSettings['labelStyle']}>
                    <Col style={{paddingTop: '4px'}} span={7}>
                        <span className="order-label">Телефон</span>&nbsp;
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
                        <span className="order-label">Телефон 2</span>&nbsp;
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
                        <span className="order-label">Факс</span>&nbsp;
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
                        <span className="order-label">Email</span>&nbsp;
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
                        <span className="order-label">Email 2</span>&nbsp;
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
                        <span className="order-label">Веб-сайт</span>&nbsp;
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

export default Form;