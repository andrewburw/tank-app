import React, { Component } from 'react';
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
		 }
	    };


	}
handleClicklostPass =()=> {
		// show password recovery
	const currentState = this.state.showLostPass;
	this.setState({ showLostPass: !currentState });
	  
	  
}
handleChange = (event) => {
       
       if (event.target.type === 'email') {
        this.checkInputData (event.target.value,'email');
        this.setState({email:event.target.value});

       } else{
		this.checkInputData (event.target.value,'pass');
        this.setState({pass:event.target.value});

       }
  }


checkInputData = (data,feild) => {
let erorsData = this.state.errorsInField;
let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if (feild === 'email') {

	reg.test(data) ?	erorsData['email'] = false : erorsData['email'] = true;

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
	//console.log(this.state.errorsInField)
	



	let dataToSend = {
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
		//this.setState({dataErrorBar: false});
		
		 console.log(data)
		 
		 
	  }).catch(err => {
		   console.error(err)
		  // this.setState({dataErrorBar: true});
		  // this.setState({serverErorMsg: err.toString()});
	  });
	/*
	  {
		"email": "valera1@mail.lv",
		"password": "a123dfgS",
		"name": "Droid"
		}
       */


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


  return (
    <div className="container">
    
    <div className="row justify-content-md-center">
    <div className="col-md-5 ">
    
		    <h3>Sign In to your account</h3>
			<p className="text-muted">
			  Please fill out the form below to login to your account.
			</p>
			<div className="form-white">
			  <form className='form'>
			    <div className="form-group">
				  <label className='textPasLog' htmlFor="email">Email address</label>
				  <input type="email" onChange={this.handleChange} className={showLoginEmailFeedClass} id="email" placeholder="Enter email" autoComplete="off" />
				  <div className="invalid-feedback">Please provide a valid email. </div>
				  <div className="valid-feedback">Good! </div>
			    </div>
			    <div className="form-group">
				  <label className='textPasLog'  htmlFor="password">Password</label>
				  <input type="password" onChange={this.handleChange} className={showLoginPassFeedClass}  id="password" placeholder="Password" />
			      <div className="invalid-feedback">Contains at least one digit, at least one lowercase character,at least one uppercase character, max length 20 </div>
				  <div className="valid-feedback">Good! </div>
				</div>
				<div className="alert alert-danger" role="alert"> Error! Invalid login data.</div>
			    <div className="checkbox">
				  <label>
				    <input type="checkbox" /> Remember me
				  </label>
			    </div>
			    <button  onClick={this.sendData} className="btn btn-block body-green-btn  ">Submit</button>
			  </form>
			  <hr />
			  <p><a href=".html#" className='regLinkcolor' onClick={this.handleClicklostPass} id="lost-btn">Lost your password?</a></p>
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
