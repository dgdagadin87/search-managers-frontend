import React, {Component} from 'react';

import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';


class Header extends Component {

    _onSaveHandler() {

        const {saveHandler} = this.props;

        saveHandler();
    }

    render() {

        const {customerData: { name = '' } = {}, disabled = false} = this.props;

        return (
            <div ref={this.mainRef}>
                <PageHeader
                    onBack={() => null}
                    title={name}
                    subTitle={'Информация о выбранном заказчике'}
                    extra={[
                        <Button
                            key="0"
                            type="danger"
                            style={{color:'#fff', backgroundColor:'#ff4d4f', borderColor: '#ff4d4f'}}
                        >Удалить заказчика</Button>,
                        <Button
                            key="1"
                            disabled={disabled}
                            onClick={this._onSaveHandler.bind(this)}
                            type="primary"
                        >Сохранить заказчика</Button>
                    ]}
                />
            </div>
        );
    }

};

export default Header;