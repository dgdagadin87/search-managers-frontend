import React, {Component, Fragment} from 'react';

import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Table from '../../../parts/Table';

import ModalForm from './ModalForm';


const emptyFormData = {
    id: false,
    region: '',
    fileName: ''
};

class Grid extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            visible: false,
            formData: emptyFormData,
            isLoading: false
        };
    }

    _onAddHandler() {

        this.setState({
            visible: true,
            formData: emptyFormData
        });
    }

    _onEditHandler(record) {

        this.setState({
            visible: true,
            formData: { ...emptyFormData, ...record }
        });
    }

    _onDeleteHandler(record) {

        const {onDeleteClick} = this.props;

        if (onDeleteClick) {

            onDeleteClick(record);
        }
    }

    _onCancel() {

        this.setState({visible:false})
    }

    _onSave() {

        const {asyncGetAOI, orderId = null} = this.props;

        this.setState({visible:false}, () => asyncGetAOI(orderId));
    }

    render() {

        const columns = [
            {
                title: 'Наименование области',
                dataIndex: 'region',
                width: 200
            },
            {
                title: 'Наименование файла',
                dataIndex: 'fileName',
            },
            {
                title: '',
                align: 'center',
                dataIndex: 'loadButton',
                width: 215,
                render: (text, record) => {
                    return (
                        <span>
                            <Button
                                type="primary"
                                title="Скачать"
                                className="distributors-button"
                            >
                                <Icon type="caret-down" theme="filled" />
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                type="primary"
                                title="Показать на search.kosmosnimki.ru"
                                className="distributors-button"
                            >
                                <Icon type="security-scan" theme="filled" />
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                type="primary"
                                title="Редактировать"
                                className="distributors-button"
                                onClick={() => this._onEditHandler(record)}
                            >
                                <Icon type="edit" theme="filled" />
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                type="primary"
                                title="Удалить"
                                className="distributors-button"
                                onClick={() => this._onDeleteHandler(record)}
                            >
                                <Icon type="delete" theme="filled" />
                            </Button>
                        </span>
                    );
                }
            }
        ];

        const {aoi = [], orderId = null, isAoiLoading = false, clientId = null} = this.props;
        const {formData = emptyFormData, visible = false, isLoading = false} = this.state;

        return (
            <Fragment>
                <ModalForm
                    orderId={orderId}
                    clientId={clientId}
                    formData={formData}
                    visible={visible}
                    isLoading={isLoading}
                    onSaveClick={this._onSave.bind(this)}
                    onCancelClick={this._onCancel.bind(this)}
                />
                <Card
                    style={{marginTop:'10px'}}
                    size="small"
                    title="AOI"
                >
                    <div style={{height: '287px', maxHeight: '287px', overflowY:'scroll'}}>
                        <Table
                            rowKey="id"
                            loading={isAoiLoading}
                            bordered={true}
                            columns={columns}
                            dataSource={aoi}
                            pagination={false}
                            title={() => (<Button
                                onClick={this._onAddHandler.bind(this)}
                                type="primary"
                            >Добавить AOI</Button>)}
                        />
                    </div>
                </Card>
            </Fragment>
        );
    }

};

export default Grid;