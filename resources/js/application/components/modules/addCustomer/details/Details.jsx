import React, {Component, Fragment} from 'react';

import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Collapse from 'antd/lib/collapse';
import Input from 'antd/lib/input';

import Form from './Form';


const Panel = Collapse.Panel;
const { TextArea } = Input;

class Details extends Component {

    constructor(...props) {

        super(...props);

        const {customerData: data = {}} = this.props;

        this.state = {
            remarks: data['remarks'],
            requisites: data['requisites']
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {

        const {customerData: data = {}} = newProps;

        this.setState({
            remarks: data['remarks'],
            requisites: data['requisites']
        });
    }

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.setState({ [fieldName]: value }, () => this._onSetStateChange());
    }

    _onSetStateChange() {

        const {onChangeState} = this.props;

        onChangeState(this.state);
    }

    _handleCommentInput(ev) {

        let value = ev.currentTarget.value;

        this.setState({ comment: value });
    }

    render() {

        const {customerData = {}, orgTypes = [], disabled = false} = this.props;
        const {requisites = '', remarks = ''} = this.state;

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
                                    title="Детали заказа"
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

export default Details;