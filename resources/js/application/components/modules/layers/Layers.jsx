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


class LayersModule extends Component {

    componentDidMount() {

        changeTitle('Слои');
    }

    render() {

        return <div>Layers</div>;
    }

};

LayersModule.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LayersModule);