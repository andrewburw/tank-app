const {Router} = require('express');
const router = Router();
const User = require('./db_schemas/users');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

// /api/auth/register
router.post('/register',[
   check('email','Wrong email!').isEmail(),
   check('password','Minimum password length 5 symbols').isLength({ min: 6})
   // need name check

], async (req,res)=>{
   try {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({
     errors: errors.array(),
     message: 'Entered wrong data!'
     })
   }
    const {email, password,name} = req.body; 
    const chExist = await User.findOne({email})
      if (chExist) {
          return res.status(500).json({messege: 'User already exists!'});
      }
    const  hashedPassword = await bcrypt.hash(password,12);
    const user = new User({email,password: hashedPassword,name});
    
    await user.save();

    res.status(201).json({message: 'User saved!'})



   } catch (error) {
     console.log(error)
     res.status(500).json({messege: 'Register server error'});

   }

});

//*************************************************************************************************/
// /api/auth/login
router.post('/login',[
  check('email','Wrong email!').isEmail(),
  check('password','Minimum password length 6 symbols').isLength({ min: 6})

], async (req,res)=>{

  try {
    const errors = validationResult(req);
 
    if (!errors.isEmpty()) {
      return res.status(400).json({
      errors: errors.array(),
      message: 'Entered wrong data!'
      })
    }
     
     const {email, password} = req.body; 
     const user = await User.findOne({email})
       if (!user) {
           return res.status(500).json({messege: 'Wrong data request!!',loginError: true});
       }
     const isMatch = await bcrypt.compare(password, user.password);
 
     if (!isMatch) {
       return res.status(400).json({message: 'Wrong data request!',loginError: true})
     }
      const token = jwt.sign(
        {userID: user.id},
         'drive faster then you',
        {expiresIn: '2m'})
      
        res.json({token, userID: user.name,loginError: false})

    } catch (error) {
      
      res.status(500).json({messege: 'Register server error'});
 
    }

});

router.post('/test',verifyToken,function(req,res){


  jwt.verify(req.token,'drive faster then you', (err,authData)=>{

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
});

// Autorisation : Bearer <acces_token>
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
