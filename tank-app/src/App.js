import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TestMap from './components/testMap';
import MainPage from './components/mainPage';
import Footer from './components/footer';
import TableAll from './components/tableAll';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {page: false,
                  mapView: '',// data recived from tableAll modal.
                  beDataAll: '', //getting data from server
                  fethErrorRecived: '',
                  fethErrorMsg: '',
                  isLoggetIn: false // this for show/hide modal-edit, add to favorites buttons 
                
                }; 
  }
  componentDidMount() {
   //get data about all gas station
   fetch('http://localhost:3001/api/tanks')
   .then(response => response.json())
   .then(data => this.setState({beDataAll: data}))
   .catch(err => {
     
     console.warn(`Server Error: ${err}`);
     this.setState({page: 'fethError'});
     this.setState({fethErrorMsg: err});
 
 })

  }
 refreshBEdata = (data) => {
 //if in component tableAll by modal data is refreshed.then data recived here
 this.setState({beDataAll: data})
 
 

 }
changePage = (dataFromChild) => {

     if (this.state.page !== 'fethError') {
      this.setState({page: dataFromChild});
     } 
    
}

isLogget = (data) => {

  this.setState({isLoggetIn: data})

}
changePageToMap = (data) => {
 
  if (this.state.page !== 'fethError') {
// data recived from modal and tableAll
  this.setState({page: 'mapPage'});
  this.setState({mapView: data});

  }
}

  render() {

const page = this.state.page;
let render_page = null;


// now I know about react-router but when I writed this I did't know :)
if (page === 'fethError') {
  
  render_page = <div className="alert alert-danger" role="alert">No connection with server.Server error msg: {this.state.fethErrorMsg.toString()} </div>

} else if (page === 'tablePage') {

  render_page = <TableAll showOnMapSend={this.changePageToMap} 
                          backEndData={this.state.beDataAll} 
                          refreshedData={this.refreshBEdata} 
                          isLoged={this.state.isLoggetIn } />;

}else if (page === 'mapPage') {
  render_page = <TestMap changeViewPos={this.state.mapView} backEndData={this.state.beDataAll} />

}else if (page === 'loginPage') {
  render_page = <LoginPage sendToRegister={this.changePage} />

}else if (page === 'registerPage') {
  render_page = <RegisterPage />

} else {

  render_page =   <MainPage callbackFromParent={this.myCallback} />;
}

//{render_page} <RegisterPage />
  return (
    <div className="App">

         <Header callbackFromParent={this.changePage} chekedIslogged={this.isLogget} />


      <main role="main" className="container">

      {render_page}
      
      </main>

       <Footer />

    </div>
  );
}
}
export default App;
