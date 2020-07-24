let mongoose = require('mongoose');

//tanks schema

let tankSchema = new mongoose.Schema({
          gass98: String,
          gass95: String,
          gassDD: String,
          positionLong: Number,
          positionLat: Number,
          name: String,
          adress: String,
          userUpdated: String,
          dateLastUpdate: String,
          id: String
         


},{collection: 'tanks'});


let Tanks =  mongoose.model('tanks',tankSchema);

module.exports = Tanks;

//{"id":"ec73758e-10cc","dataToChange":{"gass95":"1.01","gass98":"1.11","gassDD":"1.21","dateLastUpdate":"21.04.2020, 22:29:46"}}
