import React, { Component } from 'react';
import logoLogin from './pict/login_register2.png';
//https://bootsnipp.com/snippets/k7A

class LoginPage extends Component {

  constructor(props) {
	    super(props)
        this.state = {
        email: '',
		pass: '',
		showLostPass: false,
		errorsInField: {
			'email':null,
			'password':null,
		 },
		serverError: null,
		serverMsg: ''
	    };


	}
handleClicklostPass =()=> {
		// show password recovery
	let currentState = this.state.showLostPass;
	this.setState({ showLostPass: !currentState });
	  
	  
}
handleChange = (event) => {
       
       if (event.target.type === 'email') {
        this.checkInputData (event.target.value,'email');
        this.setState({email:event.target.value});

       } else {
		this.checkInputData (event.target.value,'pass');
        this.setState({pass:event.target.value});

       }
  }


checkInputData = (data,feild) => {
let erorsData = this.state.errorsInField;
let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if (feild === 'email') {
    
	reg.test(data)  ?	erorsData['email'] = false : erorsData['email'] = true;

} else {

    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      re.test(data) ?	erorsData['password'] = false : erorsData['password'] = true;
  
}
this.setState({errorsInField:erorsData});
} 


sendData = (event) => {
	event.preventDefault();
 // ************** data send to server fnc *****************

	const dataToSend = {
		password: this.state.pass,
		email: this.state.email
	   }
		
	   
	   fetch('http://localhost:3001/api/auth/login', {
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
			
			// *** if auth is successful ***
			localStorage.setItem('token', data.token);
			localStorage.setItem('user_name', data.userID);
			
		    setTimeout(() => {
				window.location.reload()
			  }, 500); // refresh to table page if login success
                                            
		 
	  }).catch(err => {
		   console.error(err)
		   this.setState({serverError: true});
		   this.setState({serverMsg: err.toString()});
	  });
	


}

/*
	  {
		"email": "valera1@mail.lv",
		"password": "a123dfgS",
		"name": "Droid"
		}
       */
testAuth = (event) => {
	event.preventDefault();
	// ************** data test to server fnc *****************
	const auth = 'Bearer ' + localStorage.getItem('token');
	const userName = localStorage.getItem('user_name') || 'unknown';
   let dataToSend = {
	"id": 'ec73758e-10cc'
   }
	
   
   
   fetch('http://localhost:3001/api/favorites', {
	method: 'PUT',
	headers: {
	  'Content-Type': 'application/json;charset=utf-8',
	  'Authorization': auth
	},
	body: JSON.stringify(dataToSend)

  }).then(response => { 
	  
	
	console.log(response.status);
	
	return response.json()}
		   
	).then(res =>{
	
	
	 if(res.message.name === "TokenExpiredError"){

	  throw new Error('Auth Expiried.Plz login!');

	 }
	 console.log(res)
	
	 
  }).catch(err => {
	   console.error(err)
	  
  });
}
	




  render() {
  
   
	let showRecovery = {'display':'none'};
	if (this.state.showLostPass) {
		showRecovery = {'display':'block'};
	}


	// ********** login/pass check *******************
	// ---- email ----
	
	let showLoginEmailFeedClass = 'form-control';
	let showLoginPassFeedClass = 'form-control';
   if (this.state.errorsInField.email) {
		showLoginEmailFeedClass = 'form-control is-invalid';
   } else if(this.state.errorsInField.email === false) {
	showLoginEmailFeedClass = 'form-control is-valid';
   }

   // ---- password ----

   if (this.state.errorsInField.password) {
	showLoginPassFeedClass = 'form-control is-invalid';
   } else if(this.state.errorsInField.password === false) {
    showLoginPassFeedClass = 'form-control is-valid';
   }

   // ---- button -----
   
   let buttnSend = <button  onClick={this.sendData} className="btn btn-block body-green-btn" disabled>Submit</button>
    if (this.state.errorsInField.password === false && this.state.errorsInField.email === false ) {
		buttnSend = <button  onClick={this.sendData} className="btn btn-block body-green-btn">Submit</button>	
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
	  servMsg = 'Done!'
   }

//autoComplete="off"
  return (
    <div className="container">
    
    <div className="row justify-content-md-center">
    <div className="col-md-5 ">
    <div><img  src={logoLogin} alt="Logo" width="100%"/></div><br />
		    <h5>Sign In to your account</h5>
			<p className="text-muted">
			  Please fill out the form below to login to your account.
			</p>
			<div className="form-white">
			  <form className='form'>
			    <div className="form-group">
				  <label className='textPasLog' htmlFor="email">Email address</label>
				  <input type="email" onChange={this.handleChange} className={showLoginEmailFeedClass} id="email" placeholder="Enter email"  />
				  <div className="invalid-feedback">Please enter a valid email. </div>
				  <div className="valid-feedback">Good! </div>
			    </div>
			    <div className="form-group">
				  <label className='textPasLog'  htmlFor="password">Password</label>
				  <input type="password" onChange={this.handleChange} className={showLoginPassFeedClass}  id="password" placeholder="Password" />
			      <div className="invalid-feedback">Contains at least one digit, at least one lowercase character,at least one uppercase character, max length 20, min length 6 </div>
				  <div className="valid-feedback">Good! </div>
				</div>
				<div className={classAlert} style={showErrorMsg} role="alert"> {servMsg}</div>
			    <div className="checkbox">
				  <label>
				    <input type="checkbox" /> Remember me
				  </label>
			    </div>
				{buttnSend}
			    <button  onClick={this.testAuth} className="btn btn-block body-green-btn">Test send</button>
				
			  </form>
			  <hr />
			  <p><a href=".html#" className='regLinkcolor' onClick={this.handleClicklostPass} id="lost-btn">Lost your password?</a>  / &nbsp;
			 <a href=".html#" className='regLinkcolor' onClick={() =>this.props.sendToRegister('registerPage')} id="reg-btn">Register for an account?</a></p>
			  <div className="hidden" style={showRecovery} id="lost-form">
			  <p>Enter your email address and we will send you a link to reset your password.</p>
				<form>
			      <div className="form-group">
				    <label className='textPasLog' htmlFor="email-lost">Email address</label>
				    <input type="email" className="form-control" id="email-lost" placeholder="Enter email" />
			      </div>
				  <button type="submit" className="btn btn-secondary">Send</button>
				</form>
			  </div>
			  <br />
			</div>
		  </div>
    </div>
    </div>
  );
}
}
export default LoginPage;
