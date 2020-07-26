import React, { Component } from 'react';
import logoLogin from './pict/login_register.png';


class RegisterPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
		pass1: '', 
		pass2: '',
		name: '',
		errorsInField: {
			'email':null,
			'password1':null,
			'password2':null,
			'passMatchEror': null,
			'name': null
		 },
		serverError: null,
		serverMsg: ''
	    
	    };


    }
handleChange = (event) =>{
      
	  

       if (event.target.id === 'email') {
        this.setState({email:event.target.value});

       } else if(event.target.id === 'pass1'){
        this.setState({pass1:event.target.value});

       }else if(event.target.id === 'pass2'){
		this.setState({pass2:event.target.value});
	   }else if(event.target.id === 'name'){
		this.setState({name:event.target.value});
	   }
	  this.checkInputData(event.target.value,event.target.id) 
  }

  sendData = (event) => {
	event.preventDefault();     

	 // ************** data send to server fnc *****************

	 const dataToSend = {
		password: this.state.pass1,
		email: this.state.email,
		name: this.state.name
	   }
		
	   
	   fetch('http://localhost:3001/api/auth/register', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json;charset=utf-8'
		  
		},
		body: JSON.stringify(dataToSend)
	
	  }).then(response => response.json()
			 
	  ).then(data => {
            if (data.errors === undefined && data.loginError === true) {
			 
			this.setState({serverError: true});
			this.setState({serverMsg: data.message});


		    } else if(typeof data.errors === "object" && data.loginError === true ) {
			
			this.setState({serverError: true});
			this.setState({serverMsg: data.errors[0]['msg'] + ' ' + data.errors[1]['msg']});

			} else if (data.loginError === false){

                
			this.setState({serverError: false});	
			}
			
		    this.setState({serverMsg: data.message});
			this.setState({serverError: false});
		 console.log(data)
		 
	  }).catch(err => {
		   console.error(err)
		   this.setState({serverError: true});
		   this.setState({serverMsg: err.toString()});
	  });


	// dobavitj kogda vozvroshajetsja osibka o sushestvovanije polzovatela v errors in feil nameS 
	console.log('pass1 ' + this.state.pass1, 'pass2 ' + this.state.pass2)
	console.log(this.state.errorsInField,this.state.serverMsg)
	
  }

  checkInputData = (data,feild) => {
	let erorsData = this.state.errorsInField;
	let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	let rePass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	let reName = /^(\w{6,15})$/;

	


	if (feild === 'email') {
		
		regEmail.test(data)  ?	erorsData['email'] = false : erorsData['email'] = true;
	
	} else if(feild === 'pass1' || feild === 'pass2'){
	     
		// at least one number, one lowercase and one uppercase letter
		// at least six characters
		if (feild==='pass1') {
			rePass.test(data)  ?	erorsData['password1'] = false : erorsData['password1'] = true;
			
			
		} else if(feild==='pass2'){
			rePass.test(data)  ?	erorsData['password2'] = false : erorsData['password2'] = true;

		}
		  // check if both passwords match
		  setTimeout(() => {
	         //without async problem with pass comparison
		
			if (this.state.pass1 !== this.state.pass2) {
				
				 // value is saved to errorsInFields -> if passwords do not match value set true (has errors)
				 erorsData['passMatchEror'] = true ;
			  this.setState({'serverMsg':"Password do not match"});
			  this.setState({'serverError':true});
		
			} else {
				erorsData['passMatchEror'] = false;
			  this.setState({'serverMsg':"Good! password match!"});
			  this.setState({'serverError':false});
			} 
	
		  }, 1); 
		 
		 
	  
	} else if(feild === 'name'){

		reName.test(data)  ?	erorsData['name'] = false : erorsData['name'] = true;
	   
        // na pustije polja mozhno ne proverjatj tak kak knopka zagarajetsja aktivnoj kogda errors == false
	}
	this.setState({errorsInField:erorsData});
	} 



  render() {
      //  -- email check ---
	  let showLoginEmailFeedClass = 'form-control';
	  if (this.state.errorsInField.email ) {
		showLoginEmailFeedClass = 'form-control is-invalid';
	  } else if(this.state.errorsInField.email === false ){
		showLoginEmailFeedClass = 'form-control is-valid';
  
	  }


	 // -- name check --
	 let showLoginNameFeedClass = 'form-control';
	if (this.state.errorsInField.name ) {
		showLoginNameFeedClass = 'form-control is-invalid';
	} else if(this.state.errorsInField.name === false ){
        showLoginNameFeedClass = 'form-control is-valid';

	}

	// -- pass check --
	let showLoginPassFeedClass = 'form-control';
	if (this.state.errorsInField.password1 || this.state.errorsInField.password2  || this.state.errorsInField.passMatchEror) {
		showLoginPassFeedClass = 'form-control is-invalid';
	} else if(this.state.errorsInField.password1 === false && this.state.errorsInField.password2=== false && this.state.errorsInField.passMatchEror === false) {
		showLoginPassFeedClass = 'form-control is-valid';
	}
	// --- button send ---
	
	let buttnSend = <button  onClick={this.sendData} className="btn btn-block body-green-btn" disabled>Register</button>
    if (Object.values(this.state.errorsInField).indexOf(true) < 0 && Object.values(this.state.errorsInField).indexOf(null) < 0) { // nuzhno sdelatj check vsego object s errors
		buttnSend = <button  onClick={this.sendData} className="btn btn-block body-green-btn">Register</button>	
	}


	// ******************* SERVER MESSAGE ****************
	let showErrorMsg = {'display':'none'};
	let servMsg = this.state.serverMsg;
	let classAlert = '';
	
   if (this.state.serverError === true) {
	   showErrorMsg = {'display':'block'};
	   classAlert = "alert alert-danger";
   } else if (this.state.serverError === false){
	  showErrorMsg = {'display':'block'};
	  classAlert = "alert alert-success";
	  
   }
  return (
    <div className="row justify-content-md-center">
  	  <div className="col-sm-6">
		<div><img  src={logoLogin} alt="Logo" width="100%"/></div><br />
		    <h3 className="text-right-xs">Register your account</h3>
			<p className="text-muted text-right-xs">
			  Please fill out the form below to create a new account.
			</p>
			<div className="form-white">
				<form>
				  <div className="form-group">
				    <label htmlFor="name"><span className='textPasLog'>Full Name</span></label>
					<input maxLength="15"  type="text" onChange={this.handleChange} className={showLoginNameFeedClass} id="name" placeholder="Your name" autoComplete="off" />
				    <div className="invalid-feedback">Please enter valid Name.Username cannot be blank! Username must contain only letters, numbers and underscores! min length 6, max length 15</div>
					<div className="valid-feedback">Good! </div>
				  </div>

				  <div className="form-group">
				    <label htmlFor="email2"><span className='textPasLog'>Email address</span></label>
					<input type="email" onChange={this.handleChange} className={showLoginEmailFeedClass} id="email" placeholder="Enter email" />
					<div className="invalid-feedback">Please enter valid email.</div>
					<div className="valid-feedback">Good! </div>
				  </div>
				  <div className="form-group">
					<div className="row">
					  <div className="col-sm-6">
					  <label htmlFor="password2"><span className='textPasLog'>Password</span></label>
					  <input type="password" onChange={this.handleChange} className={showLoginPassFeedClass} id="pass1" placeholder="Password" />
					  <div className="invalid-feedback">Contains at least one digit, at least one lowercase character,at least one uppercase character, max length 20, min length 6</div>
					  <div className="valid-feedback">Good! </div>
					  </div>
					  <div className="col-sm-6">
					  <label htmlFor="password2"><span className='textPasLog'>Repeat password</span></label>
					  <input type="password" onChange={this.handleChange} className={showLoginPassFeedClass} id="pass2" placeholder="Password" />
					  <div className="invalid-feedback">Please reenter password.</div>
					  <div className="valid-feedback">Good! </div>
					  </div>
					
					</div>
					<br />
					<div className={classAlert} style={showErrorMsg} role="alert"> {servMsg}</div>
				  </div>
				  <div className="checkbox">
					<label>
					  <input type="checkbox" /> I agree to the <a href="1">Terms of Service</a> and <a href="1">Privacy Policy</a>
					</label>
				  </div>
				  {buttnSend}
				</form>
        <br />
			</div>
    </div>
    </div>
    
  );
}
}
export default RegisterPage;
