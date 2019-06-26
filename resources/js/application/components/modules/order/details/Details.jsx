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

    render() {

        const {data = {}, clients = [], managers = [], aoi = []} = this.props;

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
                                    <Form data={data} clients={clients} managers={managers} />
                                </Card>
                            </Col>
                            <Col span={14}>
                                <Card
                                    style={{}}
                                    size="small"
                                    title="Примечания"
                                >
                                    <TextArea
                                        value={data['note']}
                                        placeholder="Введите примечание"
                                        className="custom"
                                        style={{ height: 150 }}
                                    />
                                </Card>
                                <Grid aoi={aoi} />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

export default Details;