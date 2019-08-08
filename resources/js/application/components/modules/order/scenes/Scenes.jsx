import React, {Component, Fragment} from 'react';

import Collapse from 'antd/lib/collapse';

import ScenesGrid from './Grid';
import ScenesForm from './Form';


const Panel = Collapse.Panel;

const emptyFormData = {
    id: false,
    account: '',
    code: '',
    distDate: null,
    number: '',
    price: null,
    square: null,
    source: null
};

class Scenes extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            visible: false,
            formData: emptyFormData,
            isLoading: false
        };
    }

    onAddClick() {

        this.setState({
            visible:true,
            formData: emptyFormData
        });
    }

    onEditClick(formData) {

        this.setState({
            visible:true,
            formData: formData
        });
    }

    onDeleteClick() {

        const { asyncGetDistributors, orderId } = this.props;

        this.setState({visible:false}, () => asyncGetDistributors(orderId));
    }

    _showModal() {

        this.setState({visible:true})
    }

    _onCancel() {

        this.setState({visible:false})
    }

    _onSave() {

        const { asyncGetDistributors, orderId } = this.props;

        this.setState({visible:false}, () => asyncGetDistributors(orderId));
    }

    onDeleteClick(record) {

        const {id} = record;
        const { asyncDeleteDistributor, orderId } = this.props;

        if (!confirm('Вы действительно хотите удалить выбранную запись?')) {
            return;
        }

        if (id) {
            asyncDeleteDistributor(id, orderId);
        }
    }

    render() {

        const {
            scenes = [],
            orderId = false,
        } = this.props;
        const {visible = false, formData = emptyFormData} = this.state;

        return (
            <Fragment>
                <ScenesForm
                    orderId={orderId}
                    visible={visible}
                    formData={formData}
                    onCancelClick={this._onCancel.bind(this)}
                    onSaveClick={this._onSave.bind(this)}
                />
                <Collapse style={{marginTop:'10px'}} defaultActiveKey={['1']}>
                    <Panel header="Снимки" key="1">
                        <div>
                            <ScenesGrid
                                orderId={orderId}
                                /*onAddClick={this.onAddClick.bind(this)}
                                onEditClick={this.onEditClick.bind(this)}
                                onDeleteClick={this.onDeleteClick.bind(this)}*/
                                scenes={scenes}
                            />
                        </div>
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

export default Scenes;