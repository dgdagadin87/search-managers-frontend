import React, {Component} from 'react';

import PageHeader from 'antd/lib/page-header';
import Button from 'antd/lib/button';


const ButtonGroup = Button.Group;

class Header extends Component {

    constructor(...props) {

        super(...props);

        this.mainRef = React.createRef();
    }

    _onSaveHandler() {

        const {saveHandler} = this.props;

        saveHandler();
    }

    _onCopyHandler() {

        const {data = {}} = this.props;
        const input = document.createElement("input");

        input.type = "text";
        input.value = data.dirPath;
        this.mainRef.current.appendChild(input);

        input.select();
        document.execCommand("copy");

        this.mainRef.current.removeChild(input);
    }

    render() {

        const {data = {}} = this.props;
        const {orderId = 0, dirPath = ''} = data;

        return (
            <div ref={this.mainRef}>
                <PageHeader
                    onBack={() => null}
                    title={'Заказ №' + orderId}
                    subTitle={'Информация о выбранном заказе'}
                    extra={[
                        <ButtonGroup key="0">
                            <span>Путь к папке с файлами заказа</span>&nbsp;
                            <Button disabled={true} key="1">{dirPath}</Button>
                            <Button key="2" onClick={this._onCopyHandler.bind(this)} type="primary">Скопировать</Button>
                        </ButtonGroup>,
                        <Button key="1" onClick={this._onSaveHandler.bind(this)} type="primary">Сохранить заказ</Button>
                    ]}
                />
            </div>
        );
    }

};

export default Header;