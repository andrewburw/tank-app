import React, { Component } from 'react';
import TableModal from './modals/tableModal';
import EditModal from './modals/editModal';
import AddGassStations from './modals/addGassStations';


class TableAll extends Component {

    constructor() {
           super();
           this.state = {
              data2: '',
              selected: '',
              showPage: '',
              sortBySelected: 'sortDef',
              showSort: true,
              favorites: '',
              
              
           };
       }

componentDidMount(){
  // recived data from start page//
  this.setState({ data2: this.props.backEndData});

  if (this.props.isLoged) {
    
  
 // geting favorites from server:
 
	
	// ************** data test to server fnc *****************
	const auth = 'Bearer ' + localStorage.getItem('token');

   fetch('http://localhost:3001/api/favorites', {
	method: 'GET',
	headers: {
	  'Content-Type': 'application/json;charset=utf-8',
	  'Authorization': auth
	}

  }).then(response => { 
	  
	
	console.log(response.status);
	
	return response.json()}
		   
	).then(res =>{
	
	
	 if(res.message.name === "TokenExpiredError"){

	  throw new Error('Auth Expiried.Plz login!');

	 }
	 
   this.setState({ favorites: res.favorites.join()});
	 
  }).catch(err => {
	   console.error(err)
	  
  });

 
  }

}


clickTable = (event) => {

  
  
event.persist()

this.setState({ showPage: 'modalView'});
   this.setState({selected: this.state.data2.filter(x => x.id === event.target.getAttribute('mykeyvalue'))});

}
ifEditModalPostive = () => {
// this fetch need if Edit modal made changes , geting fresh data from server
fetch('http://localhost:3001/api/tanks')
.then(response => response.json())
.then(data => {
  this.setState({data2: data})
  this.props.refreshedData(data)
})
.catch(err => {
    console.warn(`Server Error: ${err}`);
  
}) 

}
showModalWindow = (event) => {
  this.setState({ showPage: event.target.id});

}
showModalEditFn = () => {
  this.setState({ showPage: 'modalEdit'});
  
}

closeModal = ()=> {

   this.setState({showPage: ''});
   
   // getting data from child component "tableModal" getting value FALSE
}
showOnMapDataSend = (data)=> {
  
   
    this.props.showOnMapSend(data);
   // show selected from table on map

}

handleRadioChange = (event)=> {
   // if radio sort selected
   if (typeof event === 'string') {
    this.setState({sortBySelected: event});
   } else {
   
    this.setState({sortBySelected: event.currentTarget.value});
   }   

}

handleClickShowSort = () => {
  
  const currentState = this.state.showSort;
  this.setState({ showSort: !currentState });
 

}
refreshThisComponent = () => {
  this.componentDidMount()

}
  render() {
 let displayData = Array.from(this.state.data2);
 let showModalComp = null;
 let sortedData = null;


 if (this.state.showPage === 'modalEdit') {
   showModalComp =  <EditModal showModal = {this.state.showModals} 
                               data = {this.state.selected} 
                               closeModal ={this.closeModal } 
                               refreshTable={this.ifEditModalPostive} 
                                />
 } else if (this.state.showPage === 'modalView') {
   showModalComp = <TableModal data = {this.state.selected}
                               showModal = {this.state.showModals}
                               closeModal ={this.closeModal}
                               showModalEdit = {this.showModalEditFn}
                               showOnMap = {this.showOnMapDataSend}
                               isLoggedIn={this.props.isLoged}
                               favorites={this.state.favorites}
                               refreshFromFav={this.refreshThisComponent} />
 } else if(this.state.showPage === 'addStation'){
     const userName = localStorage.getItem('user_name') || 'unknown';
   
    if (userName === 'Droid') {
      showModalComp = <AddGassStations closeModal ={this.closeModal} /> 
    } else {
      showModalComp = null;
      window.alert('Sorry!!No permission!')
    }
    


 }




// ---------------- sort part -------------------------------------
  if (this.state.sortBySelected === 'sortDef') {
     sortedData = displayData
      
  } else if (this.state.sortBySelected === 'sort95') {
    
     sortedData = displayData.sort((a, b) => Number(a.gass95) - Number(b.gass95));
     
  } else if (this.state.sortBySelected === 'sort98') {
     sortedData = displayData.sort((a, b) => Number(a.gass98) - Number(b.gass98));
  } else if (this.state.sortBySelected === 'sortDD') {
     sortedData = displayData.sort((a, b) => Number(a.gassDD) - Number(b.gassDD));
  } else if(this.state.sortBySelected === 'favorites'){
    //sortedData = displayData.sort((a, b) => Number(a.gassDD) - Number(b.gassDD));
    let result = [];
    let fav = this.state.favorites.split(','); // for better view
     displayData.forEach((val,index)=>{
        for(let i=0; i <= fav.length;i++){
        if(val.id === fav[i]  ){
         
         result.push(val);
       }
      
        }
    sortedData = result;
    
      })
  }

// =========================== date part ==========================
let checkActualDate = (dateString,spanId) => {
//
//**************** new date *************
try{
const q = new Date();
const m = q.getMonth();
const d = q.getDate();
const y = q.getFullYear();
let options = {year: 'numeric', month: '2-digit', day: '2-digit' };
  
// ******************* old date ***************************
const date = new Date(y,m,d);
//let dateString = "23.04.2020, 18:00:23";

 let rightWay  = dateString.split(',')[0].split('.').reverse().join('-') + "T" + dateString.split(',')[1].replace(/ /g,'')

let mydate = new Date(rightWay)
const HOUR = 1000 * 60 * 60;



if(date.toLocaleString('en-GB',options) === mydate.toLocaleString('en-GB',options))
{
   
  
   if(q.getTime() - mydate.getTime() < HOUR) {
     
    return <div mykeyvalue={spanId}><span  className="badge badge-pill badge-success" mykeyvalue={spanId} >New</span> <span mykeyvalue={spanId}>{dateString}</span></div>;
     
   } else {
     
     return dateString;
     
   }
}
else
{
    
return <div mykeyvalue={spanId} ><span className="badge badge-pill badge-warning" mykeyvalue={spanId} >Old</span> <span mykeyvalue={spanId}>{dateString}</span></div>  
}
} catch {

      console.warn('error in check dates');
    return dateString;
}

}
 
let adressTextShorter = (data) => {
   
   
 if (data !== undefined && data.length > 6 ) {
   return data.substring(0, 10) + " ..."
 } else {
   return data;
 }
}
// =========================== sort button collapse part  ==========================
 let buttonSortShow = '';
 let displayCollapse = '';
 
if (this.state.showSort) {
  buttonSortShow =  <button id="aa1" className="btn btn-dark btn-sm "  onClick={this.handleClickShowSort}>Show sort</button>
  displayCollapse = 'collapse fade';
} else {
  buttonSortShow = <button id="aa2" className="btn btn-dark btn-sm "  onClick={this.handleClickShowSort}>Hide sort</button>
  displayCollapse = 'collapse fade show';
}


  return (
    <div>
      
     {showModalComp}
    <div className="conteiner-fluid row">
    <div className="col-8">
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="text" placeholder="Search Best Price" aria-label="Search"></input>
       <div >
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      
      </div>
      
    </form>
    </div>
    </div>
          <br />
        <div className="conteiner-fluid">
       
    <div className={displayCollapse}   id="collapseExample">
  <div className=" card card-body form-grup">
  
  
 
    <span className=" font-weight-bold" >Sort By:</span>
   <form>
   <div className="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline1" onChange={this.handleRadioChange} name="customRadioInline1" className="custom-control-input" value="sortDef" defaultChecked/>
  <label className="custom-control-label" htmlFor="customRadioInline1">Show All</label>
</div>

<div className="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline2" onChange={this.handleRadioChange} name="customRadioInline1" className="custom-control-input" value="sort95" />
  <label className="custom-control-label" htmlFor="customRadioInline2">  Best price 95</label>
</div>

<div className="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline3" onChange={this.handleRadioChange} name="customRadioInline1" className="custom-control-input" value="sort98"/>
  <label className="custom-control-label" htmlFor="customRadioInline3">  Best price 98</label>
</div>

<div className="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline4" onChange={this.handleRadioChange} name="customRadioInline1" className="custom-control-input" value="sortDD" />
  <label className="custom-control-label" htmlFor="customRadioInline4">  Best price DD</label>
</div>

<div className="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline5" onChange={this.handleRadioChange} name="customRadioInline1" className="custom-control-input" value="favorites" />
  <label className="custom-control-label" htmlFor="customRadioInline5">  Favorites</label>
</div>


  </form>
  </div>
  
  </div>
  </div>
 
  <br />
  <div className=" text-right"><button id="addStation" className="btn btn-light btn-sm "  onClick={this.showModalWindow}>Add Station</button> {buttonSortShow}</div>
        <br />
      <div className='row tester'>
      
    <table className="table table-sm table-Colors table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th className="text-nowrap"scope="col"><span style={{'cursor': 'pointer'}} onClick={() => this.handleRadioChange('sortDef')}>Title</span></th>
          <th className="text-nowrap"scope="col" ><span style={{'cursor': 'pointer'}} onClick={() => this.handleRadioChange('sort95')}>Price 95</span></th>
          <th className="text-nowrap"scope="col"><span style={{'cursor': 'pointer'}} onClick={() => this.handleRadioChange('sort98')}>Price 98</span></th>
          <th className="text-nowrap" scope="col"><span style={{'cursor': 'pointer'}} onClick={() => this.handleRadioChange('sortDD')}>Price DD</span></th>
          <th className="text-nowrap" scope="col"><span style={{'cursor': 'pointer'}} onClick={() => this.handleRadioChange('sortDD')}>Actual day</span></th>
            <th scope="col">Adress</th>

        </tr>
      </thead>
      <tbody>
      {  sortedData.map((item, i) => {

              return  (


              <tr key={item['id']} onClick={this.clickTable} mykeyvalue={item['id']} >
                <th onClick={this.clickTable} mykeyvalue={item['id']} scope="row">{i}</th>
                <td className="text-nowrap" style={{'cursor': 'pointer'}} onClick={this.clickTable} mykeyvalue={item['id']}>{item['name']}</td>
                <td className="text-nowrap" style={{'cursor': 'pointer'}} onClick={this.clickTable} mykeyvalue={item['id']}>{item['gass95']}</td>
                <td className="text-nowrap" style={{'cursor': 'pointer'}} onClick={this.clickTable} mykeyvalue={item['id']}>{item['gass98']}</td>
                <td className="text-nowrap" style={{'cursor': 'pointer'}} onClick={this.clickTable} mykeyvalue={item['id']}>{item['gassDD']}</td>
                <td className="text-nowrap" style={{'cursor': 'pointer'}} onClick={this.clickTable} mykeyvalue={item['id']}>{checkActualDate(item['dateLastUpdate'],item['id']) }</td>
                <td className="text-nowrap" style={{'cursor': 'pointer'}} onClick={this.clickTable} mykeyvalue={item['id']}>{adressTextShorter(item['adress'])}</td>

              </tr>)

    })}

          </tbody>
          </table>

          </div>
    </div>
  );
}
}
export default TableAll;
