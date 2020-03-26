import React from 'react';
import {withRouter} from 'react-router-dom';
import routes from './routes';
import Header from './Components/Header';
import './App.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/'
      ? (<>
          {routes}
         </>)
      : (<>
          <Header />
          {routes}
         </>)}
    </div>
  );
}

export default withRouter(App);
