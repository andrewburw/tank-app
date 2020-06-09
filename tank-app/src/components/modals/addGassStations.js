import React, { Component } from 'react';


  class AddGassStations extends Component {
    constructor(props) {
       super(props);
       this.state = {

         name: '',
         value95: '',
         value98: '',
         valueDD: '',
         adress: '',
         longitude:'',
         latitude:'',
         userUpdated: '',
         dateLastUpdate: '',
         dataErrorBar: '',
         dataErrorMsg: 'false',
         statusDisabledButton: false

     };

     }

    handleClickClose = () => {
        this.props.closeModal(false);

        // clossing modal
      }

// ----------------------------------------------------------

handleChangeName =(event) => {

    this.setState({name: event.target.value});
    this.setState({dateLastUpdate: new Date().toLocaleString() });
  }

handleChangeAdress =(event) => {

      this.setState({adress: event.target.value});

    }

      handleLongitude =(event) => {

      this.setState({longitude: event.target.value});

}


       handleLatitude =(event) => {

       this.setState({latitude: event.target.value});

}
// ---------------------------------------------------------


    handleChange95 =(event) => {

          this.setState({value95: event.target.value});

    }

    handleChange98 =(event) => {

          this.setState({value98: event.target.value});

    }

    handleChangeDD =(event) => {

          this.setState({valueDD: event.target.value});

    }

    generateId = () => {
      // generating guid for each tank
     function uuidv4() {
            return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
   var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | (0x8));
   return v.toString(16);
                 });
            }
        return uuidv4()
    }

    handlePostData = () => {

     let data = this.state

    console.log(this.generateId());

    let dataToSend = {
      "id": this.generateId(),
      "gass95": data.value95,
     "gass98": data.value98,
      "gassDD": data.valueDD,
      "name": data.name,
      "positionLong":  data.longitude,
      "positionLat": data.latitude,
      "adress": data.adress,
      "userUpdated": 'Dron',
      "dateLastUpdate": data.dateLastUpdate,
    }

   //'Content-Type': 'application/x-www-form-urlencoded',
        fetch('http://localhost:3001/api/newtank', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(dataToSend)

  }).then(res => {

    this.setState({dataErrorBar: false});
       // need this one statusDisabledButton
  }).catch(err => {

    this.setState({dataErrorBar: true});
    this.setState({dataErrorMsg: err});
  });




     }

//{this.state.dataErrorMsg


    render() {

        let alertBar = null;

      if (this.state.dataErrorBar === true) {

       alertBar = <div className="alert alert-danger" role="alert">{this.state.dataErrorMsg.toString()}</div>

     } else if (this.state.dataErrorBar === false) {

        alertBar = <div className="alert alert-success" role="alert">Data send success!</div>
      }


    return (
      <div>
      <div className='modal fade show'  style={{display: 'block'}} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-addDataContent" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Gass Tank</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" onClick={this.handleClickClose}>&times;</span>
          </button>
        </div>
        <div className="modal-body modal-body-addDataContent">
        <hr />
         <h6>Gass Station Info</h6>
         <hr />
        <form>
             <div className="form-group">
                <label htmlFor="formGroupExampleInput">Gass Station Name</label>
                <input type="text" className="form-control form-control-sm col-6" onChange={this.handleChangeName} autoComplete="off" value={this.state.name} id="formInsertName" placeholder="Type name" />
             </div>
             <div className="form-group">
               <label htmlFor="formGroupExampleInput2">Gass Station Adress</label>
               <input type="text" className="form-control  form-control-sm col-8" onChange={this.handleChangeAdress} autoComplete="off" value={this.state.adress} id="formInsertAdress" placeholder="A. Street - 24" />
             </div>
               <div className="form-group">
                 <label htmlFor="formGroupExampleInput2">Longitude</label>
                 <input type="text" className="form-control form-control-sm col-4" onChange={this.handleLongitude} autoComplete="off" value={this.state.longitude} id="forminsertPositionX" placeholder="Exmp: 57.052" />
               </div>
               <div className="form-group">
                 <label htmlFor="formGroupExampleInput2">Latitude</label>
                 <input type="text" className="form-control form-control-sm col-4" onChange={this.handleLatitude} autoComplete="off" value={this.state.latitude} id="forminsertPositionY" placeholder="Exmp: 34.012" />
               </div>
               <hr />
                <h6>Gass Ingfo</h6>
                <hr />
               <div className="form-group">
                 <label htmlFor="formGroupExampleInput2">Gass 95</label>
                 <input type="text" className="form-control form-control-sm col-4" maxLength="5" onChange={this.handleChange95} autoComplete="off" value={this.state.value95} id="formInsert95" placeholder="Exmp: 1.012" />
               </div>
               <div className="form-group">
                 <label htmlFor="formGroupExampleInput2">Gass 98</label>
                 <input type="text" className="form-control  form-control-sm col-4" maxLength="5" onChange={this.handleChange98} autoComplete="off" value={this.state.value98} id="formInsert98" placeholder="Exmp: 1.212" />
               </div>
               <div className="form-group">
                 <label htmlFor="formGroupExampleInput2">Gass DD</label>
                 <input type="text" className="form-control  form-control-sm col-4" maxLength="5" onChange={this.handleChangeDD} autoComplete="off"value={this.state.valueDD} id="formInsertDD" placeholder="Exmp: 1.312" />
               </div>

            </form>
        </div>

        <div className="modal-footer"><div className="container-fluid">{alertBar}</div>

                     <button type="button" onClick={this.handleClickClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" disabled={this.state.statusDisabledButton} onClick={this.handlePostData} className="btn btn-primary">Post Data</button>

        </div>
      </div>
      </div>
      </div>

      </div>
    );
  }
  }
  export default AddGassStations;
