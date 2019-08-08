import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetOrder,
    asyncGetDistributors,
    asyncDeleteDistributor,
    asyncGetAOI,
    asyncDeleteAOI,
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
        orderStates: state.orderData.orderStates,
        orderSources: state.orderData.orderSources,
        distribSources: state.orderData.distribSources,
        aoi: state.orderData.aoi,
        scenes: state.orderData.scenes,
        distributors: state.orderData.distributors,
        isLoading: state.orderData.isLoading,
        isDistLoading: state.orderData.isDistLoading,
        isAoiLoading: state.orderData.isAoiLoading
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        asyncGetOrder,
        asyncGetDistributors,
        asyncDeleteDistributor,
        asyncGetAOI,
        asyncDeleteAOI
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

        const {
            data = {},
            clients = [],
            managers = [],
            aoi = [],
            scenes = [],
            distributors = [],
            orderStates = [],
            orderSources = [],
            distribSources = [],
            asyncGetDistributors,
            asyncDeleteDistributor,
            asyncGetAOI,
            asyncDeleteAOI,
            isDistLoading,
            isAoiLoading
        } = this.props;
        const {match} = this.props;
        const {params} = match;
        const {id} = params;

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
                    orderId={id}
                    isAoiLoading={isAoiLoading}
                    orderStates={orderStates}
                    orderSources={orderSources}
                    asyncGetAOI={asyncGetAOI}
                    asyncDeleteAOI={asyncDeleteAOI}
                />
                <Scenes
                    orderId={id}
                    scenes={scenes}
                    isDistLoading={isDistLoading}
                    asyncGetDistributors={asyncGetDistributors}
                    asyncDeleteDistributor={asyncDeleteDistributor}
                />
                <Distributors
                    orderId={id}
                    isDistLoading={isDistLoading}
                    distributors={distributors}
                    distribSources={distribSources}
                    asyncGetDistributors={asyncGetDistributors}
                    asyncDeleteDistributor={asyncDeleteDistributor}
                />
            </div>
        );
    }

    render() {

        const { isLoading } = this.props;

        return isLoading ? <Spinner /> : this._renderBody();
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(OrderModule);