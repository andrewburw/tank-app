function isValidData(obj){
  // cheking form data input.
let errors = [];
let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  regEmail.test(obj.email)  ?	errors = false : errors = true;

  return [errors == false , obj.text.length > 5 && obj.text.length < 256 ];

}


function sendMessage(event){
   event.preventDefault();
   const  messageEmail = $('#emailField').val();
   const  messageText =  $('#messageFeild').val();

   let dataValid = isValidData({email: messageEmail,text: messageText});



  if (dataValid[0] === false) {
      // changing visual in email input to DANGER
      $('#emailValidErrormsg').removeClass('hidden');
      $('#emailField').removeClass('is-info');
      $('#emailField').addClass('is-danger');
  } else if (dataValid[0] === true) {
    // changing visual in email input to valid
    $('#emailValidErrormsg').addClass('hidden');
    $('#emailField').removeClass('is-danger');
    $('#emailField').addClass('is-info');
  }



  if (dataValid[1] === false) {
      // changing visual in textarea input to DANGER
      $('#textValidErrormsg').removeClass('hidden');
      $('#messageFeild').removeClass('is-info');
      $('#messageFeild').addClass('is-danger');

  } else if (dataValid[1] === true) {
    // changing visual in textarea input to valid
    $('#textValidErrormsg').addClass('hidden');
    $('#messageFeild').removeClass('is-danger');
    $('#messageFeild').addClass('is-info');

  }



  if(dataValid[0] === true && dataValid[1] === true){
    const validMassage = {
      email: messageEmail,
      text:  messageText.trim(),
      date: new Date().toJSON()

    }

   console.log({validMassage});

   $('#sendMessageForm').elems[0].disabled = true ;

  // contModal.close();

 //async request to server

  }


}
