import React, {Component} from 'react';

import Modal from 'antd/lib/Modal';
import Upload from 'antd/lib/upload';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Request from '../../../../../core/request';
import {createUrl} from '../../../../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../../../../config/settings';


class AoiForm extends Component {

    constructor(...props) {

        super(...props);

        const { visible = false, formData = {}} = props;

        this.state = {
            disabled: false,
            visible,
            ...formData,
            currentFile: null
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {

        const {visible = false, formData = {}} = newProps;

        this.setState({
            disabled: false,
            visible,
            ...formData
        });
    }

    _onTextValueChange(e, fieldName) {

        let value = e.target.value;

        this.setState({ [fieldName]: value });
    }

    _onCancel () {

        const {onCancelClick} = this.props;

        if (onCancelClick) {

            onCancelClick();
        }
    }

    _onSave () {

        const {onSaveClick} = this.props;

        const {orderId = null} = this.props;
        const { fileName = '', currentFile = null, region = '', id = false } = this.state;
        const formData = new FormData();

        if (currentFile) {
            formData.append('currentFile', currentFile);
        }
        
        formData.append('fileName', fileName);
        formData.append('region', region);
        formData.append('orderId', orderId);

        if (id !== false) {
            formData.append('aoiId', id);
        }

        this.setState({
            disabled: true
        }, () => {
            
            Request.send({
                type: 'post',
                url: createUrl(defaultSettings, urlSettings[(id !== false ? 'edit' : 'add') + 'AOI']),
                data: formData,
                processData: false,
                dataType: 'json',
                contentType: false
            })
            .then( () => {
                this.setState({
                    disabled: false
                }, () => onSaveClick());
            })
            .catch((error) => console.log('error', error));
        });
    }

    _beforeUpload(file) {

        const {name = ''} = file;

        this.setState({
            fileName: name,
            currentFile: file
        });

        return false;
    }

    _renderFile() {

        const {fileName = '', disabled = false} = this.state;
        const substredText = fileName.length > 25 ? fileName.substr(0, 25) + '....' : fileName;

        return (
            <Button.Group size={'default'}>
                <Button
                    disabled={disabled}
                    style={{width:'210px', textAlign: 'left'}}
                >{substredText}</Button>
                
                <Upload
                    showUploadList={false}
                    beforeUpload={this._beforeUpload.bind(this)}
                >
                    <Button
                        disabled={disabled}
                        title="Загрузить файл"
                    >
                        <Icon type="upload" /> Загрузить
                    </Button>
                </Upload>
            </Button.Group>
        );
    }

    render() {

        const {
            disabled = false,
            visible = false,
            fileName = '',
            region = '',
            id = false
        } = this.state;

        return (
            <Modal
                width={460}
                onCancel={this._onCancel.bind(this)}
                visible={visible}
                title={(id ? 'Редактировать' : 'Добавить') + ' AOI'}
                footer={[
                    <Button
                        disabled={disabled}
                        key="back"
                        onClick={this._onCancel.bind(this)}
                    >
                        Отмена
                    </Button>,
                    <Button
                        disabled={disabled || !fileName || !region}
                        key="submit"
                        type="primary"
                        onClick={this._onSave.bind(this)}
                    >
                        {id === false ? 'Сохранить' : 'Редактировать'}
                    </Button>,
                ]}
            >
                <Row>
                    <Col style={{paddingTop:'4px'}} span={5}>
                        <span className="order-label">
                            Регион&nbsp;
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={19}>
                        <Input
                            disabled={disabled}
                            value={region}
                            onChange={(e) => this._onTextValueChange(e, 'region')}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:'5px'}}>
                    <Col style={{paddingTop:'4px'}} span={5}>
                        <span className="order-label">
                            Файл&nbsp;
                            <span className="strict">*</span>
                        </span>
                    </Col>
                    <Col span={19}>
                        {this._renderFile()}
                    </Col>
                </Row>
            </Modal>
        );
    }

};

export default AoiForm;