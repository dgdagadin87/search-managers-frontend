import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    asyncGetDistributors,
    asyncDeleteDistributor,
    setDistributorData
} from '../../../../actions/distributors';

import { formatDateUTC } from '../../../../../core/coreUtils';

import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Table from '../../../parts/Table';

import Form from './Form';


const mapStateToProps = (state) => {
    return {
        isLoading: state.distributorsData.isLoading,
        distributors: state.distributorsData.distributors,
        orderData: state.orderData.orderData,
        distribSources: state.commonData.distribSources
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        asyncGetDistributors,
        asyncDeleteDistributor,
        setDistributorData
    }, dispatch);
}

const emptyFormData = {
    account: '',
    code: '',
    distDate: null,
    number: '',
    price: null,
    square: null,
    source: null,
    id: false
};

class Grid extends Component {

    constructor(...props) {

        super(...props);

        this._onAddHandler = this._onAddHandler.bind(this);
        this._onDeleteHandler = this._onDeleteHandler.bind(this);
        this._onEditHandler = this._onEditHandler.bind(this);
    }

    _onAddHandler() {

        this.props.setDistributorData({
            visible: true,
            distributorsData: {
                ...emptyFormData
            }
        });
    }

    _onEditHandler(record) {

        let copyOfRecord = { ...record };
        copyOfRecord['distDate'] = !copyOfRecord['distDate'] ? null : formatDateUTC(copyOfRecord['distDate']);

        this.props.setDistributorData({
            visible: true,
            distributorsData: { ...copyOfRecord }
        });
    }

    _onDeleteHandler(record) {

        const {id} = record;
        const {asyncDeleteDistributor, orderData = {}} = this.props;
        const {id:orderId = null} = orderData;

        if (!confirm('Вы действительно хотите удалить выбранную запись?')) {
            return;
        }

        if (id) {
            asyncDeleteDistributor(id, orderId);
        }
    }

    render() {

        const {distributors = [], distribSources = [], isLoading = false} = this.props;

        const columns = [
            {
                title: 'Аккаунт',
                dataIndex: 'account',
                width: 150
            },
            {
                title: 'Код съемки',
                dataIndex: 'code',
                width: 140
            },
            {
                title: 'Номер',
                dataIndex: 'number',
                
            },
            {
                title: 'Источник',
                dataIndex: 'source',
                width: 180,
                render: (sourceId) => {
                    let sourceText = '';
                    distribSources.forEach(item => {
                        if (item['id'] === sourceId) {
                            sourceText = item['name'];
                        }
                    });
                    return (
                        <span>{sourceText}</span>
                    );
                }
            },
            {
                title: 'Дата',
                dataIndex: 'distDate',
                width: 80,
                align: 'center',
                render: (dateValue) => {
                    if (!dateValue){
                        return '--.--.----';
                    }
                    const dateArray = dateValue.split('-');

                    return dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
                },
            },
            {
                title: 'Площадь',
                dataIndex: 'square',
                width: 100,
                align: 'center'
            },
            {
                title: 'Стоимость',
                dataIndex: 'price',
                width: 100,
                align: 'center'
            },
            {
                title: '',
                align: 'center',
                dataIndex: 'rowPanel',
                width: 90,
                render: (text, record) => {

                    return (
                        <span>
                            <Button
                                size="small"
                                type="primary"
                                title="Редактировать"
                                className="distributors-button"
                                onClick={() => this._onEditHandler(record)}
                            >
                                <Icon type="edit" theme="filled" />
                            </Button>
                            &nbsp;&nbsp;&nbsp;
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
            }
        ];

        return (
            <Fragment>
                <Form />
                <Card
                    size="small"
                    title="Перечень дистрибьюторов"
                    style={{marginTop: '10px'}}
                >
                    <div style={{ maxWidth: '1000px', overflow: 'scroll', maxHeight: '235px'}}>
                        <div
                            style={{width: '1000px',height: '235px'}}
                        >
                            <Table
                                sampleEmpty={true}
                                size="small"
                                loading={isLoading}
                                rowKey="id"
                                bordered={true}
                                columns={columns}
                                dataSource={distributors}
                                pagination={false}
                                title={() => <Button onClick={this._onAddHandler.bind(this)} type="primary">Добавить дистрибьютора</Button>}
                            />
                        </div>
                    </div>
                </Card>
            </Fragment>
        );
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);