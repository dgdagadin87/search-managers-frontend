import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    asyncSaveScene,
    setScenesData
} from '../../../../actions/scenes';

import Modal from 'antd/lib/Modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';
import Upload from 'antd/lib/upload';
import Notification from 'antd/lib/notification';

const { Dragger } = Upload;

const mapStateToProps = (state) => {
    return {
        disabled: state.scenesData.disabled,
        visible: state.scenesData.visible,
        scenes: state.scenesData.scenes,
        scenesData: state.scenesData.scenesData,
        orderData: state.orderData.orderData,
        aoi: state.aoiData.aoi,
        dTypes: state.commonData.dTypes,
        sceneParts: state.commonData.sceneParts,
        prodTypes: state.commonData.prodTypes
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        asyncSaveScene,
        setScenesData
    }, dispatch);
}


const fieldNames = {
    course: 'Курс снимка',
    partOfSceneCost: 'Стоимость части сцены',
    cost: 'Стоимость (у.е.)/км2',
    square: 'Площадь снимка (км2)',
    discount: 'Скидка данные (%)',
    costOfHandling: 'Введите cтоимость обработки (у.е.)',
    discountOfHandling: 'Скидка обработки (%)',
    courseOfHandling: 'Курс обработки'
};

const Option = Select.Option;

class ScenesForm extends Component {

    _onNumberValueChange(e, fieldName) {

        const value = e.target.value;

        if (isNaN(value)) {
            Message.error(`Поле "${fieldNames[fieldName]}" должно содержать только число`, 3);
            return;
        }

        this.props.setScenesData({
            scenesData: {
                ...this.props.scenesData,
                [fieldName]: value
            }
        });
    }

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.props.setScenesData({
            scenesData: {
                ...this.props.scenesData,
                [fieldName]: value
            }
        });
    }

    _onSelectChange(source) {

        this.props.setScenesData({
            scenesData: {
                ...this.props.scenesData,
                source
            }
        });
    }

    _onCancel () {
        
        const {setScenesData} = this.props;

        setScenesData({ visible: false });
    }

    _onSaveClick() {

        const formData = new FormData();
        const {
            scenesData = {},
            orderData: { id:orderId = null, client = {} }
        } = this.props;
        const { files = [] } = scenesData;

        for (let index in scenesData) {
            if (scenesData[index]) {
                formData.append(index, scenesData[index]);
            }
        }

        files.forEach((file, index) => formData.append('file' + index, file));

        formData.append('orderId', orderId);
        formData.append('clientId', client['id']);

        this.props.asyncSaveScene(orderId, formData, scenesData['id'], this._showError.bind(this));
    }

    _onSelectChange(fieldName, value) {

        this.props.setScenesData({
            scenesData: {
                ...this.props.scenesData,
                [fieldName]: value
            }
        });
    }

    _showError(errorText) {

        Notification['error']({
            message: 'Ошибка',
            description: errorText,
            duration: 0
        });
    }

    _isDisabled() {

        const fields = ['name', 'course', 'partOfScene', 'handling', 'aoiId', 'dType', 'courseOfHandling'];
        const { scenesData = {} } = this.props;
        let result = false;

        for (let index in scenesData) {
            if (fields.indexOf(index) !== -1 && !scenesData[index]) {
                result = true;
                break;
            }
        }

        if (scenesData['files'].length < 1) {
            result = true;
        }

        return result;
    }

    _onUploadFiles(file) {

        const {files = []} = this.props.scenesData;

        let newFiles = [ ...files ];
        newFiles.push(file)

        const newScenesData = { ...this.props.scenesData, files: newFiles };

        this.props.setScenesData({
            scenesData: newScenesData
        });

        return false;
    }

    _renderHandlingSelect() {

        const {scenesData: { handling = undefined }, prodTypes = [], disabled = false} = this.props;

        return (
            <Select
                allowClear={true}
                placeholder="Выберите обработку снимка"
                disabled={disabled}
                value={handling ? String(handling) : undefined}
                style={{ width: 341 }}
                onChange={(value) => this._onSelectChange('handling', value)}
            >
                {prodTypes.map(item => {
                    return (
                        <Option
                            key={item['id']}
                            value={String(item['id'])}
                        >{item['name']}</Option>
                    );
                })}
            </Select>
        );
    }

    _renderDTypeSelect() {

        const {scenesData: { dType = undefined }, dTypes = [], disabled = false} = this.props;

        return (
            <Select
                allowClear={true}
                placeholder="Выберите тип снимка"
                disabled={disabled}
                value={dType ? String(dType) : undefined}
                style={{ width: 341 }}
                onChange={(value) => this._onSelectChange('dType', value)}
            >
                {dTypes.map(item => {
                    return (
                        <Option
                            key={item['id']}
                            value={String(item['id'])}
                        >{item['name']}</Option>
                    );
                })}
            </Select>
        );
    }

    _renderAOISelect() {

        const {scenesData: { aoiId = undefined }, aoi = [], disabled = false} = this.props;

        return (
            <Select
                allowClear={true}
                placeholder="Выберите AOI"
                disabled={disabled}
                value={aoiId ? String(aoiId) : undefined}
                style={{ width: 341 }}
                onChange={(value) => this._onSelectChange('aoiId', value)}
            >
                {aoi.map(item => {
                    return (
                        <Option
                            key={item['id']}
                            value={String(item['id'])}
                        >{item['region']}</Option>
                    );
                })}
            </Select>
        );
    }

    _renderScenePartSelect() {

        const {scenesData: { partOfScene = undefined }, sceneParts = [], disabled = false} = this.props;

        return (
            <Select
                allowClear={true}
                placeholder="Выберите часть сцены"
                disabled={disabled}
                value={partOfScene ? String(partOfScene) : undefined}
                style={{ width: 341 }}
                onChange={(value) => this._onSelectChange('partOfScene', value)}
            >
                {sceneParts.map(item => {
                    return (
                        <Option
                            key={item['floatValue']}
                            value={String(item['floatValue'])}
                        >{item['textValue']}</Option>
                    );
                })}
            </Select>
        );
    }

    render() {

        const { visible = false, disabled = false, scenesData = {} } = this.props;
        const {
            id = false,
            name = '',
            course = null,
            partOfSceneCost = null,
            cost = null,
            square = null,
            discount = null,
            costOfHandling = null,
            discountOfHandling = null,
            courseOfHandling = null
        } = scenesData;
        const isButtonDisabled = this._isDisabled();

        return (
            <Modal
                width={560}
                onCancel={this._onCancel.bind(this)}
                visible={visible}
                title={(id ? 'Редактировать' : 'Добавить') + ' снимок'}
                footer={[
                    <Button
                        disabled={disabled}
                        key="back"
                        onClick={this._onCancel.bind(this)}
                    >
                        Отмена
                    </Button>,
                    <Button
                        disabled={disabled || isButtonDisabled}
                        key="submit"
                        type="primary"
                        onClick={this._onSaveClick.bind(this)}
                    >
                        {id === false ? 'Сохранить' : 'Редактировать'}
                    </Button>,
                ]}
            >
                <Row>
                    <Col style={{paddingTop:'4px'}} span={24}>
                        <Dragger
                            name="file"
                            multiple={true}
                            beforeUpload={(file) => this._onUploadFiles(file)}
                            showUploadList={false}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">
                                Нажмите или перетащите сюда файлы
                            </p>
                        </Dragger>
                    </Col>
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            Название снимка
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={name}
                            onChange={(e) => this._onTextValueChange(e, 'name')}
                            placeholder="Введите название снимка"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            AOI снимка
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>{this._renderAOISelect()}</Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            Курс снимка
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={course}
                            onChange={(e) => this._onNumberValueChange(e, 'course')}
                            placeholder="Введите курс снимка"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            Тип снимка
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>{this._renderDTypeSelect()}</Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            Часть сцены
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>{this._renderScenePartSelect()}</Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Стоим. части сцены (у.е.)</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={partOfSceneCost}
                            onChange={(e) => this._onNumberValueChange(e, 'partOfSceneCost')}
                            placeholder="Введите стоимость части сцены"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Стоимость (у.е.)/км2</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={cost}
                            onChange={(e) => this._onNumberValueChange(e, 'cost')}
                            placeholder="Введите cтоимость (у.е.)/км2"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Площадь снимка (км2)</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={square}
                            onChange={(e) => this._onNumberValueChange(e, 'square')}
                            placeholder="Введите площадь снимка"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Скидка данные (%)</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={discount}
                            onChange={(e) => this._onNumberValueChange(e, 'discount')}
                            placeholder="Введите скидку"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            Обработка
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>{this._renderHandlingSelect()}</Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Стоимость обраб. (у.е.)</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={costOfHandling}
                            onChange={(e) => this._onNumberValueChange(e, 'costOfHandling')}
                            placeholder="Введите cтоимость обработки (у.е.)"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">Скидка обработки (%)</span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={discountOfHandling}
                            onChange={(e) => this._onNumberValueChange(e, 'discountOfHandling')}
                            placeholder="Введите cкидку обработки (%)"
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={8}>
                        <span className="order-label">
                            Курс обработки
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={16}>
                        <Input
                            disabled={disabled}
                            value={courseOfHandling}
                            onChange={(e) => this._onNumberValueChange(e, 'courseOfHandling')}
                            placeholder="Введите курс обработки"
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ScenesForm);