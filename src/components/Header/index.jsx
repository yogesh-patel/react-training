import React, { Component } from 'react';
import PropTypes from 'prop-types';

const HeaderComponent = (props) => {
        let clockCallback = props.onLogin;
        if (props.loggedIn) {
            clockCallback = props.onLogout;
        }

        let loginLogoutLabel = 'Login';
        if (props.loggedIn) {
            loginLogoutLabel = 'Logout';
        }

        return (<div className="header">
          <span style={{ fontSize: 20 }}>
            {props.companyName ?
                    props.companyName : 'Your Company'}
          </span>
          <div
            style={{ float: 'right' }}
            onClick={clockCallback}
          >
            {loginLogoutLabel}
          </div>

        </div>);

}

HeaderComponent.propTypes = {
    companyName: PropTypes.string,
    loggedIn: PropTypes.bool,
    onLogout: PropTypes.func,
    onLogin: PropTypes.func
};

export default HeaderComponent;

