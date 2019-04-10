import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
    return {};
};

class IndexModule extends Component {

    componentDidMount() {

        
    }

    render() {

        return <div style={{paddingTop:'10px'}}>Customers</div>;
    }

};

export default connect(mapStateToProps)(IndexModule);