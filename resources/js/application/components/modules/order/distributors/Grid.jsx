import React, {Component} from 'react';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Table from '../../../parts/Table';


class DistributorsGrid extends Component {

    constructor(...props) {

        super(...props);

        this.state = { visible: false };
    }

    _onAddHandler() {

        const {onAddClick} = this.props;

        if (onAddClick) {

            onAddClick();
        }
    }

    _onEditHandler(record) {

        const {onEditClick} = this.props;

        if (onEditClick) {

            onEditClick(record);
        }
    }

    _onDeleteHandler(record) {

        const {onDeleteClick} = this.props;

        if (onDeleteClick) {

            onDeleteClick(record);
        }
    }

    _renderAddButton() {

        return (
            <Button
                onClick={this._onAddHandler.bind(this)}
                type="primary"
            >Добавить дистрибьютора</Button>
        );
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
                width: 170
            },
            {
                title: 'Дист. номер',
                dataIndex: 'number',
                
            },
            {
                title: 'Дист. источник',
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
                width: 100,
                align: 'center'
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
                width: 120,
                render: (text, record) => {

                    return (
                        <span>
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

        return (
            <div style={{maxHeight: '300px', overflowY:'scroll'}}>
                <Table
                    loading={isLoading}
                    className="distributors"
                    rowKey="id"
                    bordered={true}
                    columns={columns}
                    dataSource={distributors}
                    pagination={false}
                    title={() => this._renderAddButton()}
                />
            </div>
        );
    }

};

export default DistributorsGrid;