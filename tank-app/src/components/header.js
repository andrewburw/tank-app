import React, { Component } from 'react';
import logo from './pict/tank-logo.png';



class Header extends Component {
  state = {
      authStatus: false
}


  componentDidMount() {
   // check if user alrady loged in 
    const auth = 'Bearer ' + localStorage.getItem('token');
	
    fetch('http://localhost:3001/api/auth/test', {
     method: 'POST',
     headers: {
     'Content-Type': 'application/json;charset=utf-8',
     'Authorization': auth
     },
     body: JSON.stringify({test: 'test'})
   
   }).then(response => response.json()
      
   ).then(data => {
     	
      if (data.status) { // if logged in 
        this.setState({authStatus: true});
        this.props.chekedIslogged(true);
        
      } else {

        this.setState({authStatus: false});
        localStorage.removeItem('token');
        localStorage.removeItem('user_name');
        this.props.chekedIslogged(false);
      }
    
    
   }).catch(err => {
      console.error(err)
      
   });

}

signOut = () => {

  localStorage.removeItem('token');
  window.location.reload();

}

  

  handleClick = () => {
    this.props.callbackFromParent('tablePage');
  }

  viewMapPage = () => {
    this.props.callbackFromParent('mapPage');
  }

  viewLoginPage = (event) => {

    this.props.callbackFromParent('loginPage');
  }
render() {
  //<form className="form-inline my-2 my-lg-0">
  //  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
  //  <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
//  </form>
  let buttonAuth = <button className="btn btn-sm btn-outline-light" value="sign_in" onClick={this.viewLoginPage}>Sign in</button>
 if (this.state.authStatus) {
  buttonAuth = <button className="btn btn-sm btn-outline-light" value="sign_in" onClick={this.signOut}>Sign out</button>
 }

  return (
    <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <a className="navbar-brand" href="1"><img className ="brandLogo" src={logo} alt="Logo" /></a>
  <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="navbar-collapse collapse" id="navbarsExampleDefault" >
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="test">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <div className="nav-link" role="button" style={{'cursor': 'pointer'}} onClick={this.viewMapPage}>View Map</div>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="test" tabIndex="-1" aria-disabled="true">Disabled</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="test" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div className="dropdown-menu" aria-labelledby="dropdown01">

          <div className="dropdown-item"  role="button" onClick={this.handleClick}>View all gass tanks</div>

          <a className="dropdown-item" href="test">Another action</a>
          <a className="dropdown-item" href="test">Something else here</a>
        </div>
      </li>
    </ul>
    <div className="form-inline my-2 my-lg-0">
    {buttonAuth}
    </div>
  </div>
  </nav>
    </div>
  );
}
}
export default Header;
