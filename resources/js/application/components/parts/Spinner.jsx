import React, {Component} from 'react';

import Spin from 'antd/lib/spin';


class Spinner extends Component {

    render () {

        return (
            <div className="main-spinner">
                <Spin />&nbsp;&nbsp;&nbsp;Подождите, идет загрузка данных...
            </div>
        );
    }
}

export default Spinner;