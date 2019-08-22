import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    asyncGetAOI,
    asyncDeleteAOI,
    asyncSaveAOI,
    setAOIData
} from '../../../../actions/aoi';

import Modal from 'antd/lib/Modal';
import Upload from 'antd/lib/upload';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

const mapStateToProps = (state) => {
    return {
        disabled: state.aoiData.disabled,
        orderData: state.orderData.orderData,
        visible: state.aoiData.visible,
        aoiData: state.aoiData.aoiData
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        asyncGetAOI,
        asyncDeleteAOI,
        asyncSaveAOI,
        setAOIData
    }, dispatch);
}

class AOIForm extends Component {

    constructor(...props) {

        super(...props);
    }

    _onTextValueChange(e) {

        let value = e.target.value;

        this.props.setAOIData({ aoiData: { ...this.props.aoiData, region: value } });
    }

    _onCancel () {
        
        const {setAOIData} = this.props;

        setAOIData({ visible: false });
    }

    _onSave () {

        const {
            aoiData = {},
            orderData: {
                id:orderId = null,
                client: {id:clientId = null}
            }
        } = this.props;
        const { fileName = '', currentFile = null, region = '', id = false } = aoiData;
        const formData = new FormData();

        if (currentFile) {
            formData.append('currentFile', currentFile);
        }
        
        formData.append('fileName', fileName);
        formData.append('region', region);
        formData.append('orderId', orderId);
        formData.append('clientId', clientId);

        if (id !== false) {
            formData.append('aoiId', id);
        }

        this.props.asyncSaveAOI(formData, id, orderId);
    }

    _beforeUpload(file) {

        const {name = ''} = file;

        this.props.setAOIData({
            aoiData: {
                ...this.props.aoiData,
                fileName: name,
                currentFile: file
            }
        });

        return false;
    }

    _renderFile() {

        const {aoiData = {}, disabled = false} = this.props;
        const {fileName = ''} = aoiData;
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

        const { disabled = false, visible = false, aoiData = {} } = this.props;
        const { fileName = '', region = '', id = false } = aoiData;

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

export default connect(mapStateToProps, mapDispatchToProps)(AOIForm);