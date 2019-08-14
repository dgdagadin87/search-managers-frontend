import React, {Component} from 'react';

import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Empty from 'antd/lib/empty';

import Request from '../../../core/request';
import {createUrl} from '../../../core/coreUtils';
import {
    defaultSettings,
    urlSettings,
    uiSettings
} from '../../../config/settings';


const Option = Select.Option;

export default class ClientSelect extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            clientsSource: [],
            clientsIsLoading: false
        };

        this._onClientSelectSearch = this._onClientSelectSearch.bind(this);
    }

    _onClientSelectSearch(searchValue) {

        if (!searchValue || String(searchValue).length < 3) {
            return;
        }

        this.setState({
            clientsIsLoading: true
        }, () => {
            Request.send({
                url: createUrl(defaultSettings, urlSettings['autocompleteCustomers']),
                data: { searchString: searchValue },
            })
            .then( (response) => {

                const { collection = [] } = response;

                this.setState({
                    clientsSource: collection,
                    clientsIsLoading: false
                });
            })
            .catch((error) => {
                this.setState({ clientsIsLoading: false });
                console.log('error', error);
            });
        });
    }

    render() {

        const { disabled = false, value = {}, onChange } = this.props;
        const clientName = value['name'] || undefined;
        const { clientsSource = [], clientsIsLoading = false } = this.state;

        return (
            <Select
                disabled={disabled}
                showSearch={true}
                size={uiSettings['fieldSize']}
                value={clientName}
                style={{ width: uiSettings['formFieldWidth'] }}
                defaultActiveFirstOption={false}
                filterOption={false}
                loading={clientsIsLoading}
                suffixIcon={<Icon type="search" />}
                notFoundContent={<Empty description="Начните вводить ФИО заказчика" />}
                onChange={onChange}
                onSearch={this._onClientSelectSearch}
                placeholder="Выберите заказчика из списка"
            >
                {clientsSource.map(item => {
                    return (
                        <Option
                            key={item['id']}
                            value={String(item['id'])}
                        >
                            {item['name']}
                        </Option>
                    );
                })}
            </Select>
        );
    }

}