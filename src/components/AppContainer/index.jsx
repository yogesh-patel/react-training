/**
 * Created by synerzip on 04/07/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import App from '../AppComponent';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false
        };
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogin() {
        this.setState({ isLoggedin: true });
    }
    onLogout() {
        this.setState({ isLoggedin: false });
    }
    render() {
        return (<App isLoggedin={this.state.isLoggedin}
                     onLogin={this.onLogin}
                       onLogout={this.onLogout}
                     helloMessage={this.props.helloMessage}/>);
    }
}

AppContainer.propTypes = {
    helloMessage: PropTypes.string
};

export default AppContainer;
