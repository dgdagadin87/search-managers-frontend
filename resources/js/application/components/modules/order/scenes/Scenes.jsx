import React, {Component, Fragment} from 'react';

import Table from 'antd/lib/table';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/Modal';
import Collapse from 'antd/lib/collapse';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';


const Panel = Collapse.Panel;

const columns = [
    {
        title: 'Название',
        dataIndex: 'name'
    },
    {
        title: 'AOI',
        dataIndex: 'aoiName',
        width: 170
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        width: 150
    },
    {
        title: 'Курс',
        dataIndex: 'course',
        width: 80
    },
    {
        title: 'Стоимость части сцены(у.е.)',
        dataIndex: 'scenePartPrice',
        width: 150
    },
    {
        title: 'Стоимость(у.е.)/км2',
        dataIndex: 'scenePrice',
        width: 50
    },
    {
        title: ' Площадь км2',
        dataIndex: 'square',
        width: 50
    },
    /*{
        title: 'Стоимость обработки(у.е.)',
        dataIndex: 'preservePart',
        width: 150
    },*/
    {
        title: 'Курс обр.',
        dataIndex: 'course2',
        width: 100
    },
    {
        title: '',
        align: 'center',
        dataIndex: 'loadButton',
        width: 20,
        render: (text, record) => {
            return (
                <span>
                    <Button
                        type="primary"
                        title="Редактировать"
                    >
                        <Icon type="edit" theme="filled" />
                    </Button>
                </span>
            );
          }
    },
    /*{
        title: 'Обработка',
        dataIndex: 'fld',
        width: 150
    }*/
];

class Scenes extends Component {

    constructor(...props) {

        super(...props);

        this.state = { visible: false };
    }

    _showModal() {

        this.setState({visible:true})
    }

    _onCancel() {

        this.setState({visible:false})
    }

    _renderTypesSelect(){

        const types = [{id: 'type1', name: 'QuickBird Color'}, {id: 'type2', name: 'Pleyades A/B'}]

        return (
            <Select defaultValue={'type1'} style={{ width: 401 }}>
                {types.map(item => {
                    return <Select.Option key={item['id']} value={String(item['id'])}>{item['name']}</Select.Option>
                })}
            </Select>
        );
    }

    render() {

        const {scenes = []} = this.props;
        const {visible = false} = this.state;

        return (
            <Fragment>
                <Modal
                    width={650}
                    onCancel={this._onCancel.bind(this)}
                    visible={visible}
                    title="Добавить счет"
                    footer={[
                        <Button key="back">
                            Отмена
                        </Button>,
                        <Button key="submit" type="primary">
                            Сохранить
                        </Button>,
                    ]}
                >
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Тип
                        </Col>
                        <Col span={16}>{this._renderTypesSelect()}</Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Курс
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Стоимость части сцены(у.е.)
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Часть сцены
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Стоимость(у.е.)/км2
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Площадь км2
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Скидка данные %
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Обработка
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Стоимость обработки (у.е.)
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Скидка обработка %
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Курс обр.
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                </Modal>
                <Collapse style={{marginTop:'10px'}} defaultActiveKey={['1']}>
                    <Panel header="Снимки" key="1">
                        <div style={{maxHeight: '500px', overflowY:'scroll'}}>
                            <Table
                                rowKey="id"
                                bordered={true}
                                columns={columns}
                                dataSource={scenes}
                                pagination={false}
                                title={() => (
                                    <Button
                                        onClick={this._showModal.bind(this)}
                                        type="primary"
                                    >Добавить снимок</Button>
                                )}
                            />
                        </div>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

export default Scenes;