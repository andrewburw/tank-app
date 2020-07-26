const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const PORT = config.get('port')


app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',require('./route'));
app.use('/api/auth',require('./appauth.js'));

// inicialize midlewere error catcher
app.use(function(err, req, res, next){

  res.status(404).send({error:err.message});
 next();
})

//**********************  db connect ************************************


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
async function startServ() {
  try { 
    await mongoose.connect(config.get('mongoUri'), {  //mongodb://127.0.0.1:27017/tankApp'
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
      
      app.listen(PORT);
      console.log("--------------NODE/DB WORK OK---------------------");
  } catch (e){
      console.log(e.message)

  }

}

startServ()