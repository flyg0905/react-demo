import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './js/components/pc_index';
import MobileIndex from './js/components/mobile_index';
// import {BrowserRoute as Router,Route,Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './css/pc.css';
import  './css/mobile.css';
class App extends React.Component{
  render(){
    return(
      <div>
          <MediaQuery query='(min-device-width:1224px)' ><PCIndex/></MediaQuery>
          <MediaQuery query='(max-device-width:1224px)'><MobileIndex/></MediaQuery>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
