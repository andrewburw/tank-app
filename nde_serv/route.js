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
   
  
  
  try {
    const tkn =  jwt.verify(req.token,confitoken) 
    
     
    const {id,dataToChange} = req.body;
  
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
        let data = await Tanks.findOneAndUpdate({"id": id}, {$set: dataToChange},{new: true})

        res.json({ message: 'Tank updated!' })

    } else {
     
     throw new Error('Sorry only 10 posts per day from one user!');
    

    }
       
  
   } catch (err) {
   
    res.status(500).json({ message: err.toString(),errorStatus:true});
    
   }
});


router.post('/newtank',verifyToken , async (req, res) => {
  
  try {
    const tkn =  jwt.verify(req.token,confitoken) 
    
    if (tkn.userID === '5ebc45179868a925dcd3bcbe1') {
      const tanks = new Tanks(req.body);

      await tanks.save()
      res.json({message: "New tank saved!"});
    } else {
    
      throw new Error("Sorry you don't have access!");
    }
  
   
  } catch (err) {
          
    res.status(500).json({ message: err.toString(),errorStatus:true});
    
  }
});



router.put("/addfavorites",verifyToken , async(req, res) => { 
  const {id} = req.body;
 
  
  try {
    const tkn =  jwt.verify(req.token,confitoken) 
    
    await User.findOneAndUpdate({_id: tkn.userID}, {$addToSet: {favoriteTank: id }},{new: true});
       
  

    res.json({ message: 'Added  to favorites!' })


   } catch (err) {
    
    res.status(500).json({ message: err.toString(),errorStatus:true});
    
   }
});

router.get("/favorites",verifyToken , async(req, res) => { 
  const {id} = req.body;
 // the first idea was to make favorites in localstorage, but I decided to make a function on the 
 // server by trying to add/teach new functionality through the server
  
  try {
    const tkn =  jwt.verify(req.token,confitoken) 
    const favorites =  await User.findById({_id: tkn.userID});  
      
  
    res.json({ message: 'Done!' ,favorites:favorites.favoriteTank})


   } catch (err) {
     
    res.status(500).json({ message: err.toString(),errorStatus:true});
    
   }
});

router.put("/removefavorites",verifyToken , async(req, res) => { 
  const {id} = req.body;
 

  try {
    
    const tkn =  jwt.verify(req.token,confitoken) 
    
    await User.findOneAndUpdate({_id: tkn.userID}, {$pull: {favoriteTank: id }},{new: true});
       
  

    res.json({ message: 'Removed from favorites!' })


   } catch (err) {
    
    res.status(500).json({ message: err.toString(),errorStatus:true});
    
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
