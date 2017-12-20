/**
 * Created by synerzip on 04/07/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '../Header';

class AppContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoggedin: false
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(){
    this.setState({isLoggedin:true});
  }
  onLogout(){
    this.setState({isLoggedin:false});
  }
  render(){
    return <div>
      <HeaderComponent
          companyName="My Company"
          loggedIn={this.state.isLoggedin}
          onLogin={this.onLogin}
          onLogout={this.onLogout}/>
      {this.props.helloMessage}
      </div>
  }
}

AppContainer.propTypes = {
  helloMessage:PropTypes.string
};

export default AppContainer;