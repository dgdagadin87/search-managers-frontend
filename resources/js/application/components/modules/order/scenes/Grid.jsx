import React, {Component} from 'react';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Table from '../../../parts/Table';


class ScenesGrid extends Component {

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
            >Добавить гранулу</Button>
        );
    }

    render() {

        const {scenes = [], isDistLoading = false} = this.props;

        const columns = [
            {
                title: 'Название',
                dataIndex: 'sceneId',
                render: (text) => {
                    const substredText = text.length > 33 ? text.substr(0, 33) + '....' : text;
                    if (!substredText) {
                        return <span style={{color:'#888', fontStyle:'italic'}}>Название отсутствует</span>
                    }
                    return (
                        <span style={{color: '#1890FF'}} title={text} >{substredText}</span>
                    );
                }
            },
            {
                title: 'AOI',
                dataIndex: 'aoiName',
                width: 130,
                render: () => {
                    return (
                        <span>---</span>
                    );
                }
            },
            {
                title: 'Тип',
                dataIndex: 'typeName',
                width: 170
            },
            {
                title: 'Курс',
                dataIndex: 'rate',
                width: 80,
                align: 'center'
            },
            {
                title: 'Стоим. части сцены(у.е.)',
                dataIndex: 'partCost',
                width: 150,
                align: 'center'
            },
            {
                title: 'Стоим.(у.е.)/км2',
                dataIndex: 'cost',
                width: 150,
                align: 'center'
            },
            {
                title: 'Площ., км2',
                dataIndex: 'area',
                width: 110,
                align: 'center'
            },
            {
                title: 'Курс обр.',
                dataIndex: 'HandlingRate',
                width: 100,
                align: 'center'
            },
            {
                title: '',
                align: 'center',
                dataIndex: 'loadButton',
                width: 110,
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
                    loading={isDistLoading}
                    className="distributors"
                    rowKey="id"
                    bordered={true}
                    columns={columns}
                    dataSource={scenes}
                    pagination={false}
                    title={() => this._renderAddButton()}
                />
            </div>
        );
    }

};

export default ScenesGrid;