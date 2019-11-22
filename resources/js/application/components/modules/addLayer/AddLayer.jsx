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


class AddLayerModule extends Component {

    componentDidMount() {

        changeTitle('Добавить слой');
    }

    render() {

        return <div>Add layer</div>;
    }

};

AddLayerModule.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLayerModule);