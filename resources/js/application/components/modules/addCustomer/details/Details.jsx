import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Collapse from 'antd/lib/collapse';
import Input from 'antd/lib/input';

import Form from './Form';


const Panel = Collapse.Panel;
const { TextArea } = Input;

class Details extends Component {

    _onTextValueChange(e, fieldName) {

        const {onChangeState} = this.props;
        const value = e.target.value;

        onChangeState({ [fieldName]: value });
    }

    render() {

        const {customerData = {}, orgTypes = [], disabled = false} = this.props;
        const {requisites = '', remarks = ''} = customerData;

        return (
            <Fragment>
                <Collapse style={{marginTop:'5px'}} defaultActiveKey={['1']}>
                    <Panel header="Характеристики" key="1">
                        <Row>
                            <Col span={10}>
                                <Card
                                    className="details-card"
                                    style={{marginRight:'10px'}}
                                    size="small"
                                    title="Детали заказчика"
                                >
                                    <Form
                                        disabled={disabled}
                                        orgTypes={orgTypes}
                                        customerData={customerData}
                                        onChangeState={this.props.onChangeState}
                                    />
                                </Card>
                            </Col>
                            <Col span={14}>
                                <Card
                                    style={{}}
                                    size="small"
                                    title="Реквизиты"
                                >
                                    <TextArea
                                        disabled={disabled}
                                        onChange={(e) => this._onTextValueChange(e, 'requisites')}
                                        value={requisites}
                                        placeholder="Введите реквизиты"
                                        className="custom"
                                        style={{ height: 164 }}
                                    />
                                </Card>
                                <Card
                                    style={{marginTop: '10px'}}
                                    size="small"
                                    title="Примечания"
                                >
                                    <TextArea
                                        disabled={disabled}
                                        onChange={(e) => this._onTextValueChange(e, 'remarks')}
                                        value={remarks}
                                        placeholder="Введите примечание"
                                        className="custom"
                                        style={{ height: 164 }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

Details.propTypes = {
    onChangeState: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    customerData: PropTypes.object.isRequired,
    orgTypes: PropTypes.array.isRequired
};

export default Details;