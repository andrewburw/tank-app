import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//[[57.032, 24.1],[57.034, 24.1]],
class TestMap extends Component {

  constructor() {
         super();
         this.state = {
             markers: ''
         };
     }

componentDidMount(){
      // recived data from start page//
       
      this.setState({ markers: this.props.backEndData});
         
    
}

openPopup (marker) {

  // opening popUp when  tank selected from table
  
  if (marker && marker.leafletElement) {
    window.setTimeout(() => {
      marker.leafletElement.openPopup()
    })
  }
}


render() {
     let displayMapView =  [57.032, 24.094];
     const displayData = this.state.markers;
     let mapViewZoom = 15;

  if (typeof this.props.changeViewPos !== 'string' ) {
    //if data  recived from modal "show map"button
    displayMapView = this.props.changeViewPos;
    mapViewZoom = 17;
  }



  return (

    <Map center={displayMapView } zoom={mapViewZoom }>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />

      {  Array.from(displayData).map((item, i) => {

              return  (  <Marker key={item['id']} ref={item['id'] === this.props.changeViewPos[2] ? this.openPopup : null } position={[item['positionLong'],item['positionLat']]}>


              <Popup><h6>{item['name']}</h6>
              <table className="table table-sm"><thead>
              <tr><th scope="col">Type</th>
              <th scope="col">Price</th></tr></thead>
              <tbody>
              <tr><th scope="row">95</th><td>{item['gass95']}</td></tr>
              <tr><th scope="row">98</th><td>{item['gass98']}</td></tr><tr>
              <th scope="row">DD</th><td colSpan="2">{item['gassDD']}</td></tr>
              </tbody></table><p>Last update: {item['dateLastUpdate']}</p></Popup>
              </Marker>)

    })}
    </Map>
  );
}
}
export default TestMap;
