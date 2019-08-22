import React, {Component} from 'react';

import locale from 'antd/lib/date-picker/locale/ru_RU';
import DatePicker from 'antd/lib/date-picker';


const dateFormat = 'DD.MM.YYYY';

export default class Picker extends Component {

    render() {

        const {
            size = 'default',
            disabled = false,
            style = {},
            value = null,
            format = null,
            onChange,
            placeholder = undefined
        } = this.props;
        const correctFormat = format || dateFormat;

        let otherProps = {};

        if (placeholder) {
            otherProps['placeholder'] = placeholder;
        }

        return (
            <DatePicker
                size={size}
                disabled={disabled}
                style={style}
                locale={locale}
                value={value}
                format={correctFormat}
                onChange={onChange}
                { ...otherProps }
            />
        );
    }

}