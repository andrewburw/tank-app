exports.checkDate = function(data,allowedPosts,returnModyfyDate) {
   try {
    const date = new Date();
      
    let mod  = date.toISOString().split('T')[0];
    
         mod[1].split('-').length == 1 ?  mod[1] = '0'+ mod[1] : '';

    let dateTrans = mod.split('-').reverse().join('.');
    let dateToCheck = data.date.split(',')[0];
    
    if (returnModyfyDate) {
      // return modyfied date if returnModyfyDate set to true
      return dateTrans;
    }
    if (dateToCheck !== dateTrans) {
      return {postAllow:true,newDay:true}; // date not similar ->> allow data change + change allowed posts to 0
    }

    if (dateToCheck === dateTrans && Number(data.posts) < allowedPosts) {
       return {postAllow:true,newDay:false};  //if date are similar check allowed posts per day then allow data change
    }
  
    return {postAllow:false,newDay:false};

   } catch (error) {
     console.log(error)  
   } 

  }