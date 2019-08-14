import React, {Component, Fragment} from 'react';

import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Collapse from 'antd/lib/collapse';
import Input from 'antd/lib/input';

import Form from './Form';
import Grid from './Grid';


const Panel = Collapse.Panel;
const { TextArea } = Input;

class Details extends Component {

    constructor(...props) {

        super(...props);

        const {data = {}} = props;

        this.state = {
            comment: data['comment']
        };
    }

    onDeleteClick(record) {

        const {id} = record;
        const { asyncDeleteAOI, orderId = null } = this.props;

        if (!confirm('Вы действительно хотите удалить выбранную запись?')) {
            return;
        }

        if (id) {
            asyncDeleteAOI(id, orderId);
        }
    }

    _handleCommentInput(ev) {

        let value = ev.currentTarget.value;

        this.setState({ comment: value });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        const {data = {}} = nextProps;

        this.setState({
            data,
            comment: data.comment || ''
        });
    }

    render() {

        const {
            data = {},
            clients = [],
            managers = [],
            aoi = [],
            isAoiLoading = false,
            orderStates = [],
            orderSources = [],
            asyncGetAOI
        } = this.props;
        const {client = {}} = data;
        const {id: clientId = null} = client;
        const {comment = ''} = this.state;

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
                                        orderId={data['orderId']}
                                        data={data}
                                        clients={clients}
                                        managers={managers}
                                        orderStates={orderStates}
                                        orderSources={orderSources}
                                    />
                                </Card>
                            </Col>
                            <Col span={14}>
                                <Card
                                    size="small"
                                    title="Примечания"
                                >
                                    <TextArea
                                        onChange={this._handleCommentInput.bind(this)}
                                        value={comment}
                                        placeholder="Введите примечание"
                                        className="custom"
                                        style={{ height: 190 }}
                                    />
                                </Card>
                                <Grid
                                    orderId={data['orderId']}
                                    clientId={clientId}
                                    aoi={aoi}
                                    isAoiLoading={isAoiLoading}
                                    asyncGetAOI={asyncGetAOI}
                                    onDeleteClick={this.onDeleteClick.bind(this)}
                                />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

export default Details;