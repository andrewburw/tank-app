import React, { Component } from 'react';
import logo from '../pict/icons/zapr.png';

class TableModal extends Component {
  state = {
    recivData: this.props.data,
    isLogged1s: this.props.isLoggedIn // recived status from header component
    
  };




  handleClickClose = () => {
      this.props.closeModal(false);

      // clossing modal
    }


handleClickShowEdit = () => {

    
    
      this.props.showModalEdit();
    

   
   // show Edit modal when pressed EDIT button
}

handleClickAddToFavorites = () => {

 console.log('adding to favorites...');
 

}

handleClickShowOnMap = () => {

   this.props.showOnMap([this.props.data[0].positionLong,this.props.data[0].positionLat,this.props.data[0].id]);
   // show on Map button presed data send only marker position

 
   
}
  render() {
   
 let gettedData = this.state.recivData;
 let buttonEdit = <button type="button" onClick={()=>{window.alert('You must login!!')}} className="btn btn-warning btn-sm disabled">Edit</button>
 let buttonFavorites = <button type="button" onClick={()=>{window.alert('You must login!!')}} className="btn  btn-info btn-sm disabled">Add to Favorites</button>
    if (this.state.isLogged1s) {
      buttonEdit = <button type="button" onClick={this.handleClickShowEdit} className="btn btn-warning btn-sm">Edit</button>
      buttonFavorites = <button type="button" onClick={this.handleClickAddToFavorites} className="btn  btn-info btn-sm">Add to Favorites</button>

    } 
 

  return (
    <div>
    <div className='modal fade show'  style={{display: 'block'}} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Selected Info</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={this.handleClickClose}>&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <h1><img  src={logo} style={{'width': '2rem'}}alt="Logo" /> {gettedData[0].name}</h1>
      <table className="table table-sm"><thead>
      <tr><th scope="col">Type</th>
      <th scope="col">Price</th></tr></thead>
      <tbody>
      <tr><th scope="row">95</th><td>{gettedData[0]['gass95']}</td></tr>
      <tr><th scope="row">98</th><td>{gettedData[0]['gass98']}</td></tr><tr>
      <th scope="row">DD</th><td colSpan="2">{gettedData[0]['gassDD']}</td></tr>
      </tbody></table><p><span className="font-weight-bold">Adress:</span> {gettedData[0]['adress']}</p>
                      <p><span className="font-weight-bold">Date updated:</span> {gettedData[0]['dateLastUpdate']}</p>
                      <p><span className="font-weight-bold">User updated:</span> {gettedData[0]['userUpdated']}</p>
      </div>

      <div className="modal-footer">
        {buttonFavorites}
        <button type="button" onClick={this.handleClickShowOnMap} className="btn btn-primary btn-sm">Show On Map</button>
        {buttonEdit}
        <button type="button" onClick={this.handleClickClose} className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>

    </div>
  );
}
}
export default TableModal;
