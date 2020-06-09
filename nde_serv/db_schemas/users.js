const mongoose = require('mongoose');

//Users schema 

const userSchema = new mongoose.Schema({
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        name: {type: String, required: true, unique: true},
        postsInOneDay: {type: String},  // how mutch post User posted in one day
        postDay: {type: String},   // day - last User posted data
        favorites: [{type: String}]


},{collection: 'users'});



module.exports = mongoose.model('User',userSchema);
/*
}
"email": "pidarok@mail.lv",
"password": "sdfErdfdErfeDF",
"name": "Droid"
}
*/