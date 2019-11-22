import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';


const mapStateToProps = (state) => {
    return {
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}


class ReportsModule extends Component {

    componentDidMount() {

        changeTitle('Отчеты');
    }

    render() {

        return <div>Отчеты</div>;
    }

};

ReportsModule.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsModule);