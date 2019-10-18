import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    asyncGetAOI,
    asyncDeleteAOI,
    setAOIData
} from '../../../../actions/aoi';

import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Notification from 'antd/lib/notification';

import Table from '../../../parts/Table';

import Form from './Form';


const mapStateToProps = (state) => {
    return {
        isLoading: state.aoiData.isLoading,
        aoi: state.aoiData.aoi,
        orderData: state.orderData.orderData
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        asyncGetAOI,
        asyncDeleteAOI,
        setAOIData
    }, dispatch);
}

const emptyFormData = {
    id: false,
    region: '',
    fileName: '',
    currentFile: null
};

class Grid extends Component {

    constructor(...props) {

        super(...props);

        this._onAddHandler = this._onAddHandler.bind(this);
        this._onDeleteHandler = this._onDeleteHandler.bind(this);
        this._onEditHandler = this._onEditHandler.bind(this);
        this._showError = this._showError.bind(this);
    }

    _showError(errorText) {

        Notification['error']({
            message: 'Ошибка',
            description: errorText,
            duration: 0
        });
    }

    _onAddHandler() {

        this.props.setAOIData({
            visible: true,
            aoiData: {
                ...emptyFormData
            }
        });
    }

    _onEditHandler(record) {

        this.props.setAOIData({
            visible: true,
            aoiData: { ...record }
        });
    }

    _onDeleteHandler(record) {

        const {id} = record;
        const {asyncDeleteAOI, orderData = {}} = this.props;
        const {id:orderId = null, client: {id:clientId = null}} = orderData;

        if (!confirm('Вы действительно хотите удалить выбранную запись?')) {
            return;
        }

        if (id) {
            asyncDeleteAOI(id, orderId, clientId, this._showError);
        }
    }

    render() {

        const columns = [
            {
                title: 'Операции',
                align: 'center',
                dataIndex: 'loadButton',
                width: 165,
                render: (text, record) => {
                    return (
                        <span>
                            <Button
                                size="small"
                                type="primary"
                                title="Скачать"
                                className="distributors-button"
                            >
                                <Icon type="caret-down" theme="filled" />
                            </Button>
                            &nbsp;
                            <Button
                                size="small"
                                type="primary"
                                title="Показать на search.kosmosnimki.ru"
                                className="distributors-button"
                            >
                                <Icon type="security-scan" theme="filled" />
                            </Button>
                            &nbsp;
                            <Button
                                size="small"
                                type="primary"
                                title="Редактировать"
                                className="distributors-button"
                                onClick={() => this._onEditHandler(record)}
                            >
                                <Icon type="edit" theme="filled" />
                            </Button>
                            &nbsp;
                            <Button
                                size="small"
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
            },
            {
                title: 'Область',
                dataIndex: 'region',
                width: 170
            },
            {
                title: 'Наименование файла',
                dataIndex: 'fileName',
                render: (text) => {
                    const substredText = text.length > 55 ? text.substr(0, 53) + '..' : text;
                    return (
                        <span title={text}>{substredText}</span>
                    );
                }
            }
        ];

        const {aoi = [], isLoading = false} = this.props;

        return (
            <Fragment>
                <Form />
                <Card
                    size="small"
                    title="AOI"
                >
                    <div
                        style={{height: '235px', maxHeight: '235px', overflowY:'scroll'}}
                    >
                        <Table
                            size="small"
                            rowKey="id"
                            loading={isLoading}
                            bordered={true}
                            columns={columns}
                            dataSource={aoi}
                            pagination={false}
                            title={() => (<Button onClick={this._onAddHandler} type="primary">Добавить AOI</Button>)}
                        />
                    </div>
                </Card>
            </Fragment>
        );
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);