import React, {Component} from 'react';

import PropTypes from 'prop-types';

import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';


class Header extends Component {

    _onSaveHandler() {

        const {saveHandler} = this.props;

        saveHandler();
    }

    render() {

        const {disabled = false, customerData = {}} = this.props;
        const { id = null, name = '' } = customerData;

        return (
            <div ref={this.mainRef}>
                <PageHeader
                    onBack={() => null}
                    title={id ? name : 'Новый заказчик'}
                    subTitle={!id ? 'Добавление нового заказчика' : 'Информация о выбранном заказчике'}
                    extra={[
                        id ? <Button
                                key="0"
                                type="danger"
                            >Удалить заказчика</Button> : null,
                        <Button
                            key="1"
                            disabled={disabled || !customerData['name']}
                            onClick={this._onSaveHandler.bind(this)}
                            type="primary"
                        >{id ? 'Сохранить заказчика' : 'Добавить в систему'}</Button>
                    ]}
                />
            </div>
        );
    }

};

Header.propTypes = {
    disabled: PropTypes.bool.isRequired,
    customerData: PropTypes.object.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default Header;