import React from 'react';
import HeaderComponent from '../Header';

const App = (props) => {
  return (
      <div>
        <HeaderComponent
            companyName="My Company"
            loggedIn={props.isLoggedin}
            onLogin={props.onLogin}
            onLogout={props.onLogout}
        />
        {props.helloMessage}
      </div>
  )
}

export default App;
