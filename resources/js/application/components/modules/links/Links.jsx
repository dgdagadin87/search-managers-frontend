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


class LinksModule extends Component {

    componentDidMount() {

        changeTitle('Ссылки');
    }

    render() {

        return <div>Links</div>;
    }

};

LinksModule.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksModule);