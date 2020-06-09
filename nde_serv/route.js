const express = require('express');
const router = express.Router();
const Tanks = require('./db_schemas/tanksSchema.js');
const jwt = require('jsonwebtoken');

 //res.header("Access-Control-Allow-Origin", "*");
const confitoken = 'drive faster then you'
router.get('/tanks', async (req, res, next) => {
  try {
    const tanks = await Tanks.find( { })
   
    res.json(tanks);
   
  } catch (e) {
          
    res.status(500).json({message: "Somthing wrong!"});
    next(e) 
  }
})

router.put("/modyfytank",verifyToken , async(req, res) => { 
   
 
  
  try {
    const test =  jwt.verify(req.token,confitoken) 
   
    
    const {id,dataToChange} = req.body;
    let data = await Tanks.findOneAndUpdate({"id": id}, {$set: dataToChange},{new: true})
    /*
    let user = await Tanks.findOneAndUpdate({"id": id}, {$set: dataToChange},{new: true})
     *** poka ne pridumal po ID najti usera ili po name skorej vsego po nejm potomu chto ono unikalnoje

     if (data === user) {
        throw new Error('User Not Found');
      }



    */

      if (data === null) {
        throw new Error('Tank Not Found');
      } 
      res.json({ message: 'Tank updated!' });

   } catch (err) {
     
    res.status(500).json({ message: err});
    
   }
});


//try{req.body = JSON.parse(Object.keys(req.body)[0])}catch(err){req.body = req.body} // modyfy string to right way
router.post('/newtank', async (req, res,next) => {
  
  try {
    const tanks = new Tanks(req.body);
   
    await tanks.save()
     res.status(201).json({message: "New tank saved!"});
  } catch (e) {
          
    res.status(500).json({message: "Somthing wrong!"});
    
  }
});

 /*
  jwt.verify(req.token,confitoken, (err,authData)=>{

    if (err) {
      res.json({
        status: false,
        error: err
      })

    } else {

      res.json({
        status: true,
        authData

      })
    }
  })
  router.post("/newtank", (req, res) => {
    try{req.body = JSON.parse(Object.keys(req.body)[0])}catch(err){req.body = req.body} // modyfy string to right way
    //res.header("Access-Control-Allow-Origin", "*");
    var myData = new Tanks(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

*/
function verifyToken(req,res,next){

  const bearerHeader = req.headers['authorization'];
  //check barer for undifened
 
  if (typeof bearerHeader !== 'undefined') {
  
  const barer = bearerHeader.split(' ')
  const barerToken = barer[1];
   req.token = barerToken;
   next();

  } else {
    res.send("AUTORIZACIJA : error")
  }

}
module.exports = router;
