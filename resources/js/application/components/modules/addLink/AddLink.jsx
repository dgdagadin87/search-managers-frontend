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


class AddLinkModule extends Component {

    componentDidMount() {

        changeTitle('Добавить ссылку');
    }

    render() {

        return <div>Add link</div>;
    }

};

AddLinkModule.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkModule);