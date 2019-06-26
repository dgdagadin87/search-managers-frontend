import React, {Component, Fragment} from 'react';
import Select from 'antd/lib/select';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/Modal';
import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';


const Panel = Collapse.Panel;

const columns = [
    {
        title: 'Аккаунт',
        dataIndex: 'account',
        width: 150
    },
    {
        title: 'Код съемки',
        dataIndex: 'code',
        width: 170
    },
    {
        title: 'Дист. номер',
        dataIndex: 'number',
        
    },
    {
        title: 'Дист. источник',
        dataIndex: 'source',
        width: 80
    },
    {
        title: 'Дист. дата',
        dataIndex: 'distDate',
        width: 150
    },
    {
        title: 'Дист. площадь',
        dataIndex: 'square',
        width: 50
    },
    {
        title: 'Дист. стоимость',
        dataIndex: 'price',
        width: 50
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
    }
];

class Distributors extends Component {

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
            <Select defaultValue={'type1'} style={{ width: 468 }}>
                {types.map(item => {
                    return <Select.Option key={item['id']} value={String(item['id'])}>{item['name']}</Select.Option>
                })}
            </Select>
        );
    }

    render() {

        const {distributors = []} = this.props;
        const {visible = false} = this.state;

        return (
            <Fragment>
                <Modal
                    width={560}
                    onCancel={this._onCancel.bind(this)}
                    visible={visible}
                    title="Добавить дистрибьютора"
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
                            Аккаунт
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Код съемки
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Дистр. номер
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Дистр. источник
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Дистр. дата
                        </Col>
                        <Col span={16}>
                        <DatePicker
                            format={'YYYY/MM/DD'}
                            style={{ width: 341 }}
                        />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Дистр. площадь
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'5px'}}>
                        <Col style={{paddingTop:'4px'}} span={8}>
                            Дистр. стоимость
                        </Col>
                        <Col span={16}>
                            <Input value="" />
                        </Col>
                    </Row>
                </Modal>
                <Collapse style={{marginTop:'10px'}} defaultActiveKey={['1']}>
                    <Panel header="Перечень дистрибьюторов" key="1">
                        <div style={{maxHeight: '500px', overflowY:'scroll'}}>
                            <Table
                                rowKey="id"
                                bordered={true}
                                columns={columns}
                                dataSource={distributors}
                                pagination={false}
                                title={() => <Button onClick={this._showModal.bind(this)} type="primary">Добавить дистрибьютора</Button>}
                            />
                        </div>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

export default Distributors;