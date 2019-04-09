import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';

import Header from './parts/Header';

import IndexModule from './modules/IndexModule';


const mapStateToProps = (state) => {
    return {
        commonData: state.commonData
    };
};

class AppContainer extends Component {

    render () {

        const {commonData: {user = {}}} = this.props;

        return (
            <div className="main-container">
                <div className="main-center">
                    <Header user={user} />
                    <Switch>
                        <Route exact path="/" render={ (props) => <IndexModule {...props} /> } />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(AppContainer);