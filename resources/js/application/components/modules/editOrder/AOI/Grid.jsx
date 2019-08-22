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
            asyncDeleteAOI(id, orderId, clientId);
        }
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
                render: (text) => {
                    const substredText = text.length > 40 ? text.substr(0, 40) + '..' : text;
                    return (
                        <span title={text}>{substredText}</span>
                    );
                }
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

        const {aoi = [], isLoading = false} = this.props;

        return (
            <Fragment>
                <Form />
                <Card
                    style={{marginTop:'10px'}}
                    size="small"
                    title="AOI"
                >
                    <div
                        style={{height: '287px', maxHeight: '287px', overflowY:'scroll'}}>
                        <Table
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