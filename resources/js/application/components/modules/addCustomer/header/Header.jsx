import React, {Component} from 'react';

import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';


class Header extends Component {

    _onSaveHandler() {

        const {saveHandler} = this.props;

        saveHandler();
    }

    render() {

        const {disabled = false} = this.props;

        return (
            <div ref={this.mainRef}>
                <PageHeader
                    onBack={() => null}
                    title={'Новый заказчик'}
                    subTitle={'Добавление нового заказчика'}
                    extra={[
                        <Button
                            key="1"
                            disabled={disabled}
                            onClick={this._onSaveHandler.bind(this)}
                            type="primary"
                        >Добавить заказчика</Button>
                    ]}
                />
            </div>
        );
    }

};

export default Header;