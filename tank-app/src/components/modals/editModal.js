import React, { Component } from 'react';


class EditModal extends Component {
  constructor(props) {
     super(props);
     this.state = {

       value95: this.props.data[0]['gass95'],
       value98: this.props.data[0]['gass98'],
       valueDD: this.props.data[0]['gassDD'],
       changeDate: '',
       userChanged: '',
       dataErrorBar: '',
       serverErorMsg: '',
       errorsInField: {
                '95_Field':true,
                '98_Field':true,
                'DD_Field':true,

          }

   };

   }
// 3 states : 'cheked' = changed data - OK,
//             false = new data - NOT OK,
//             true = nothing hapened with data

// '95_Field' , '98_Field' , 'DD_Field'

checkInputData = (value,inputField) => {
  // function check if input field has errors
     let data = this.state.errorsInField;


    if(value.match(/^[0-2](\.[0-9]+)?$/)) {

      data[inputField] = 'cheked';
    } else {

      data[inputField] = false;

    }
  this.setState({errorsInField: data});
}

handleClickClose = () => {

      this.props.closeModal(false);
      // clossing modal
    }

handleChange95 =(event) => {

    this.checkInputData(event.target.value,'95_Field')

  this.setState({value95: event.target.value});
  this.setState({changeDate: new Date().toLocaleString() });

}

handleChange98 =(event) => {

  this.checkInputData(event.target.value,'98_Field')

  this.setState({ value98: event.target.value});
  this.setState({changeDate: new Date().toLocaleString() });
}

handleChangeDD =(event) => {
  this.checkInputData(event.target.value,'DD_Field')

  this.setState({valueDD: event.target.value});
  this.setState({changeDate: new Date().toLocaleString() });
}


hendlePostData = () => {
// function for post data


let uslessVar = Object.values(this.state.errorsInField).indexOf(false) < 0; // no mixed-operators blahh... blahh....
 if (uslessVar  === false) { //!uslessVar  
   //found errors in input fields
  console.error('error found');
  this.setState({dataErrorBar: true}); // UI error "Not sended data"
 } else{

   if (Object.values(this.state.errorsInField).every(elem => elem === true)) {
       // check if nothing hapened with data = doing nothing (no sended data to server)
       console.log('data not sended to server');
       this.setState({dataErrorBar: true});
   } else {
       // **************** SENDING MODYFIED DATA TO SERVER *******************
     
      const auth = 'Bearer ' + localStorage.getItem('token');
      const userName = localStorage.getItem('user_name') || 'unknown';
     let dataToSend = {
      "id": this.props.data[0].id,
      "dataToChange": {
      "gass95": this.state.value95,
      "gass98": this.state.value98,
      "gassDD": this.state.valueDD,
      "dateLastUpdate": this.state.changeDate,
      "userUpdated": userName
      }
     }
      
     
     
     fetch('http://localhost:3001/api/modyfytank', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': auth
      },
      body: JSON.stringify(dataToSend)
  
    }).then(response => response.json()
			 
      ).then(res =>{
      this.setState({dataErrorBar: false});
       console.log(res.message);
       if(res.message.name === "TokenExpiredError"){

        throw new Error('Auth Expiried.Plz login!');

       }
       this.props.refreshTable(false);
       setTimeout(() => {
        this.handleClickClose();
      }, 1000);
       
    }).catch(err => {
         console.error(err)
         this.setState({dataErrorBar: true});
         this.setState({serverErorMsg: err.toString()});
    });
  }
   
 }

}

  render() {
    
 let recivedData = this.props.data;

 
// error check:
// 3 states : 'cheked' = changed data - OK,
//             false = new data - NOT OK,
//             true = nothing hapened with data


 let viz95  = 'form-control col-4';
 let viz98  = 'form-control col-4';
 let vizDD  = 'form-control col-4';
 let alertBar = null;

//    check if data changed & not OK
 if (this.state.errorsInField['95_Field'] === false) {

   viz95 = 'form-control col-4 is-invalid';
 }
  if (this.state.errorsInField['98_Field'] === false) {
   viz98 = 'form-control col-4 is-invalid';
 }

  if (this.state.errorsInField['DD_Field'] === false) {
   vizDD = 'form-control col-4 is-invalid';
 }

 // check if data changed = OK

 if (this.state.errorsInField['95_Field'] === 'cheked') {

   viz95 = 'form-control col-4 is-valid';
 }

  if (this.state.errorsInField['98_Field'] === 'cheked') {
   viz98 = 'form-control col-4 is-valid';
 }

  if (this.state.errorsInField['DD_Field'] === 'cheked') {
   vizDD = 'form-control col-4 is-valid';
 }
// error bar check
  if (this.state.dataErrorBar === true) {

  alertBar = <div className="alert alert-danger" role="alert">Data not sended. {this.state.serverErorMsg === ''? 'Check fields': this.state.serverErorMsg}.</div>

  } else if (this.state.dataErrorBar === false) {

    alertBar = <div className="alert alert-success" role="alert">Data send success!</div>
  }



  return (
    <div>
    <div className='modal fade show'  style={{display: 'block'}} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Info</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={this.handleClickClose}>&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <h2>{recivedData[0].name}</h2>
      <table className="table table-sm"><thead>
      <tr><th scope="col">Type</th>
      <th scope="col">Price</th></tr></thead>
      <tbody>
      <tr><th scope="row">95</th><td><input type="text" maxLength="5"  value={this.state.value95} className={viz95} onChange={this.handleChange95}  placeholder="Enter value" /><div className="invalid-feedback">
          Please choose valid number.
        </div></td></tr>
      <tr><th scope="row">98</th><td><input type="text" maxLength="5" value={this.state.value98} className={viz98} onChange={this.handleChange98}  placeholder="Enter value" /><div className="invalid-feedback">
          Please choose valid number.
        </div></td></tr><tr>
      <th scope="row">DD</th><td colSpan="2"><input type="text" maxLength="5" value={this.state.valueDD} className={vizDD} onChange={this.handleChangeDD}  placeholder="Enter value" /><div className="invalid-feedback">
          Please choose valid number.
        </div></td></tr>
      </tbody></table>
        {alertBar}
      </div>

      <div className="modal-footer">
          <button type="button" onClick={this.hendlePostData} className="btn btn-primary">Post</button>
        <button type="button" onClick={this.handleClickClose} className="btn btn-secondary" data-dismiss="modal">Cancel</button>
      </div>

    </div>
    </div>
    </div>

    </div>
  );
}
}
export default EditModal;
