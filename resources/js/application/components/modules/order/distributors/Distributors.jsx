import React, {Component, Fragment} from 'react';

import Collapse from 'antd/lib/collapse';

import DistributorsGrid from './Grid';
import DistributorsForm from './Form';


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

class Distributors extends Component {

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
            distributors = [],
            distribSources = [],
            orderId = false,
            isDistLoading
        } = this.props;
        const {visible = false, formData = emptyFormData} = this.state;

        return (
            <Fragment>
                <DistributorsForm
                    orderId={orderId}
                    visible={visible}
                    formData={formData}
                    distribSources={distribSources}
                    onCancelClick={this._onCancel.bind(this)}
                    onSaveClick={this._onSave.bind(this)}
                />
                <Collapse style={{marginTop:'10px'}} defaultActiveKey={['1']}>
                    <Panel header="Перечень дистрибьюторов" key="1">
                        <DistributorsGrid
                            isDistLoading={isDistLoading}
                            orderId={orderId}
                            onAddClick={this.onAddClick.bind(this)}
                            onEditClick={this.onEditClick.bind(this)}
                            onDeleteClick={this.onDeleteClick.bind(this)}
                            distributors={distributors}
                            distribSources={distribSources}
                        />
                    </Panel>
                </Collapse>
            </Fragment>
        );
    }

};

export default Distributors;