import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    asyncGetScenes,
    setScenesData
} from '../../../../actions/scenes';

import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Table from '../../../parts/Table';

import Form from './Form';


const mapStateToProps = (state) => {
    return {
        isLoading: state.scenesData.isLoading,
        scenes: state.scenesData.scenes,
        scenesData: state.scenesData.scenesData
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        asyncGetScenes,
        setScenesData
    }, dispatch);
}

const emptyFormData = {
    id: false,
    name: '',
    course: null,
    partOfScene: null,
    partOfSceneCost: null,
    cost: null,
    square: null,
    discount: null,
    handling: null,
    costOfHandling: null,
    discountOfHandling: null,
    courseOfHandling: null,
    aoiId: undefined,
    dType: undefined,
    files: []
};

class Grid extends Component {

    constructor(...props) {

        super(...props);

        this._onAddHandler = this._onAddHandler.bind(this);
    }

    _onAddHandler() {

        this.props.setScenesData({
            visible: true,
            scenesData: {
                ...emptyFormData
            }
        });
    }

    render() {

        const {scenes = [], isLoading = false} = this.props;

        const columns = [
            {
                title: 'Название',
                dataIndex: 'sceneId',
                render: (text) => {

                    const substredText = text.length > 33 ? text.substr(0, 33) + '....' : text;

                    if (!substredText) {
                        return (
                            <span
                                style={{color:'#888', fontStyle:'italic'}}
                            >Название отсутствует</span>
                        );
                    }

                    return (
                        <span
                            style={{color: '#1890FF'}}
                            title={text}
                        >{substredText}</span>
                    );
                }
            },
            {
                title: 'AOI',
                dataIndex: 'aoiName',
                width: 90,
                render: (text) => {

                    if (!text) {
                        return (
                            <span>---</span>
                        );
                    }

                    return text;
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
                width: 60,
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
                width: 100,
                render: (text, record) => {
                    return (
                        <span>
                            <Button
                                size="small"
                                type="primary"
                                title="Редактировать"
                                className="distributors-button"
                                //onClick={() => this._onEditHandler(record)}
                            >
                                <Icon type="edit" theme="filled" />
                            </Button>
                            &nbsp;
                            <Button
                                size="small"
                                type="primary"
                                title="Удалить"
                                className="distributors-button"
                                //onClick={() => this._onDeleteHandler(record)}
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
                    title="Снимки"
                    style={{marginTop: '10px'}}
                >
                    <div style={{ maxWidth: '1100px', overflow: 'scroll', maxHeight: '238px'}}>
                        <div
                            style={{width: '1100px',height: '238px'}}
                        >
                            <Table
                                sampleEmpty={true}
                                size="small"
                                loading={isLoading}
                                rowKey="id"
                                bordered={true}
                                columns={columns}
                                dataSource={scenes}
                                pagination={false}
                                title={() => <Button onClick={this._onAddHandler} type="primary">Добавить снимок</Button>}
                            />
                        </div>
                    </div>
                </Card>
            </Fragment>
        );
    }

};

Grid.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    scenes: PropTypes.array.isRequired,
    scenesData: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);