import React, { Component } from 'react';
import logo from './pict/tank-main.png';

class MainPage extends Component {

  handleClick = () => {
      this.props.callbackFromParent('mapPage');
    }

  render() {

//<img  class="imgMain"src={logo} alt="Logo" width="100%"/>
// <div className="container-full-bg"  style={{'backgroundColor': '#343a40'}}>
  return (
    <div className="container">
    <div className="jumbotron"  style={{'backgroundColor': '#343a40'}}>
    <img  src={logo} alt="Logo" width="100%"/>
    
    </div>
</div>
    
  );
}
}
export default MainPage;
