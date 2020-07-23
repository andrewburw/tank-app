const express = require('express');
const router = express.Router();
const Tanks = require('./db_schemas/tanksSchema.js');
const User = require('./db_schemas/users.js');
const jwt = require('jsonwebtoken');
const checkAntiSpamDate = require('./custome_modules/dateChecker.js');

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
   
  //console.log(req.body)
  
  try {
    const tkn =  jwt.verify(req.token,confitoken) 
    
     
    const {id,dataToChange} = req.body;
  //  let data = await Tanks.findOneAndUpdate({"id": id}, {$set: dataToChange},{new: true})
    let user = await User.findOne({_id: tkn.userID});
    let postPermission = checkAntiSpamDate.checkDate({posts: user.postsInOneDay,date: user.postDay},10,false);

    if (postPermission.postAllow) {
       if(postPermission.newDay){
         // if date changed set counter to 0
        await User.findOneAndUpdate({_id: tkn.userID}, {$set: {postsInOneDay: 0 }},{new: true});

       }
         await User.findOneAndUpdate({_id: tkn.userID}, { $inc: {postsInOneDay: 1 },
        $set:{postDay:checkAntiSpamDate.checkDate({posts: user.postsInOneDay,date: user.postDay},10,true)}} // checkDate argument set to true (return date string)
        ,{new: true})
        //let data = await Tanks.findOneAndUpdate({"id": id}, {$set: dataToChange},{new: true})

        res.json({ message: 'Tank updated!' })

    } else {
     
     throw new Error('Sorry only 10 posts per day from one user!');
    

    }
       
  
   } catch (err) {
     console.log(err);
    res.status(500).json({ message: err.toString(),errorStatus:true});
    
   }
});


router.post('/newtank', async (req, res,next) => {
  
  try {
    const tanks = new Tanks(req.body);
   
    await tanks.save()
     res.status(201).json({message: "New tank saved!"});
  } catch (e) {
          
    res.status(500).json({message: "Somthing wrong!"});
    
  }
});

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
