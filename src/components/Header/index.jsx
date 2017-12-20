import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeaderComponent extends Component {

    render() {
        let clockCallback = this.props.onLogin;
        if (this.props.loggedIn) {
            clockCallback = this.props.onLogout;
        }

        let loginLogoutLabel = 'Login';
        if (this.props.loggedIn) {
            loginLogoutLabel = 'Logout';
        }

        return (<div className="header">
          <span style={{ fontSize: 20 }}>
            {this.props.companyName ?
                    this.props.companyName : 'Your Company'}
          </span>
          <div
            style={{ float: 'right' }}
            onClick={clockCallback}
          >
            {loginLogoutLabel}
          </div>

        </div>);
    }
}

HeaderComponent.propTypes = {
    companyName: PropTypes.string,
    loggedIn: PropTypes.bool,
    onLogout: PropTypes.func,
    onLogin: PropTypes.func
};

export default HeaderComponent;

