import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetOrder
} from '../../../actions/order';

import Header from './header/Header';
import Details from './details/Details';
import Scenes from './scenes/Scenes';
import Distributors from './distributors/Distributors';

import Spinner from '../../parts/Spinner';


const mapStateToProps = (state) => {
    return {
        data: state.orderData.orderData,
        clients: state.orderData.clients,
        managers: state.orderData.managers,
        aoi: state.orderData.aoi,
        scenes: state.orderData.scenes,
        distributors: state.orderData.distributors,
        isLoading: state.orderData.isLoading,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        asyncGetOrder
    }, dispatch);
}


class OrderModule extends Component {

    constructor(...props){

        super(...props);
    }

    componentDidMount() {

        const {match, asyncGetOrder} = this.props;
        const {params} = match;
        const {id} = params;

        asyncGetOrder(id);
    }

    _onSaveHandler() {

        console.log('Saving...')
    }

    _renderBody() {

        const {data = {}, clients = [], managers = [], aoi = [], scenes = [], distributors = []} = this.props;

        return (
            <div className="order">
                <Header
                    saveHandler={this._onSaveHandler.bind(this)}
                    data={data}
                />
                <Details
                    data={data}
                    clients={clients}
                    managers={managers}
                    aoi={aoi}
                />
                <Scenes scenes={scenes} />
                <Distributors distributors={distributors} />
            </div>
        );
    }

    render() {

        const { isLoading } = this.props;

        return isLoading ? <Spinner /> : this._renderBody();
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderModule);