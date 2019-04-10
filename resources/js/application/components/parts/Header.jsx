import React, {Component, Fragment} from 'react';

import {Link} from 'react-router-dom';

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';


class Header extends Component {

    constructor(props) {

        super(props);

        const menuCodes = [
            'orders',
            'customers',
            'layers',
            'reports',
            'links'
        ];
        const {pathname: pathName = ''} = window.location;
        const correctPathName = pathName.replace('/', '');
        let currentMenuItem = false;
        
        menuCodes.forEach((item) => {

            if (currentMenuItem !== false) {
                return;
            }

            if (correctPathName === item){
                currentMenuItem = item;
            }
            else if(correctPathName === '') {
                currentMenuItem = 'orders';
            }
        });

        this.state = {
            current: currentMenuItem,
            contextVisible: false
        };
    }

    _onMenuClick(e) {

        const {key = ''} = e;

        if (key === 'user') {
            return;
        }

        this.setState({
            current: e.key,
        });
    }

    _onUserClick() {

        const {contextVisible = false} = this.state;

        this.setState({contextVisible: !contextVisible});
    }

    _onPopoverVisibleChange(contextVisible) {

        this.setState({ contextVisible });
      }

    _renderUserTitle() {

        return (
            <span>
                <Icon style={{fontSize: '17px', color: '#08c'}} type="setting" theme="filled" />
                <Icon style={{ fontSize: '14px' }} type="caret-down" theme="filled" />
            </span>
        );
    }

    _renderUserName(){

        return (
            <Fragment>
                <Icon type="user" />
                <span style={{paddingLeft:'5px'}}>Александр</span>
            </Fragment>
        );
    }

    render () {

        const {contextVisible = false} = this.state;

        return (
            <div className="main-header">
                <Menu
                    onClick={this._onMenuClick.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="orders">
                        <Icon type="file-text" />
                        <span>Заказы</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="customers">
                        <Icon type="usergroup-add" />
                        <span>Заказчики</span>
                        <Link to="/customers" />
                    </Menu.Item>
                    <Menu.Item key="layers">
                        <Icon type="switcher" />Покрытия
                    </Menu.Item>
                    <Menu.Item key="reports">
                        <Icon type="fund" />Отчеты
                    </Menu.Item>
                    <Menu.Item key="links">
                        <Icon type="link" />Ссылки
                    </Menu.Item>
                    <Menu.Item
                        key="user"
                        className="header-user"
                        style={{float:'right'}}
                        onClick={this._onUserClick.bind(this)}
                    >
                        <Popover
                            title={this._renderUserName()}
                            placement="bottom"
                            content={<a>Выйти из системы</a>}
                            visible={contextVisible}
                            onVisibleChange={this._onPopoverVisibleChange.bind(this)}
                        >
                            {this._renderUserTitle()}
                        </Popover>
                    </Menu.Item>
                </Menu>
                <div style={{clear:'both'}} />
            </div>
        );
    }
}

export default Header;