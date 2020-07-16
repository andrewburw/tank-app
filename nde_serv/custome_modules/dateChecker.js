exports.checkDate = function(data,allowedPosts) {
   try {
    const date = new Date();
      
    let mod  = date.toISOString().split('T')[0] 
    
         mod[1].split('-').length == 1 ?  mod[1] = '0'+ mod[1] : '';

    let dateTrans = mod.split('-').reverse().join('.')
    let dateToCheck = data.date.split(',')[0];
  

     if (dateToCheck === dateTrans && Number(data.posts) < allowedPosts) {
       return true;  
    }
  
    return false;

   } catch (error) {
     console.log(error)  
   } 

  }