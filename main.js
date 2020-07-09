//******************************************
// There is no Jquery framework. I's my own ablib.js framework :)



//**********************************************
// *************** ART GALERY ******************
//**********************************************


$('.artGalery_font1').onClick(() => {
   // hide big shrift "Art gallery"
  $('.art_galery_div_box').hide();

});

$('#showArtGallery').onClick(() => {
  // button presed show gallery
   $('.art_galery_div_box').hide();
   $(".artGColumn").show();
   $("#showArtGallery").hide();
   $("#hideArtGallery").show();
});

$('#hideArtGallery').onClick(() => {
  // button presed hide gallery
   $('.art_galery_div_box').show();
   $(".artGColumn").hide()
   $("#showArtGallery").show();
   $("#hideArtGallery").hide();
});


let img_now_view = 1  ;
let IMAGE_IN_GALERY = 6;

function viewImage(imageSR) {


  img_now_view = Number(imageSR.id.split('_')[1])
  galModal.open() //open image gallery
  galModal.setContent(`<img src=${imageSR.src} />`) // set image to modal gallery


}

function moveImage(way) {
way === 'next' ? img_now_view++ : img_now_view--;

  if (img_now_view >= IMAGE_IN_GALERY) {
    img_now_view = 1;
  }

  if (img_now_view  < 1  ) {
    img_now_view = IMAGE_IN_GALERY;
  }



let test = $(`#image_${img_now_view}`).elems[0].src
galModal.setContent(`<img  src=${test} />`)

}
//**********************************************
// *************** My Experience ***************
//**********************************************

function showMyWork(val){
  contModal.open();
  contModal.setTamplate(modalTamplate.myWebWorks);
  switch(val) {
    case 'guitarTeacher':
      contModal.setContent(contentMyExper.guitTeacher,'myWorks');
      break;
    case 'tankApp':
      contModal.setContent(contentMyExper.tankApp,'myWorks');
      break;
    case 'workHours':
      contModal.setContent(contentMyExper.workHours,'myWorks');
      break;
    case 'patterns':
      contModal.setContent(contentMyExper.patterns,'myWorks');
      break;
    case 'thisSite':
      contModal.setContent(contentMyExper.thisSite,'myWorks');
      break;
    case 'riverApp':
      contModal.setContent(contentMyExper.riverApp,'myWorks');
      break;
    default:
      console.warn('Error: No content found!');
  }

}

//**********************************************
// *************** My Skilzz ***************
//**********************************************

function showMySkilz(){

contModal.open();
contModal.setTamplate(modalTamplate.mySkilz);
contModal.setContent(contentMySkilzz.mySkilzz,'skills');

}

function setPagePosition(val){
  // if choosen section in navbar.
  $(val).setPageView();
}
//**********************************************
// *************** WARN MODALS / MSG form ******
//**********************************************

function showWarn(){
// pressed dowonload CV
contModal.open();
contModal.setTamplate(modalTamplate.emptyModal);
contModal.setContent(warnContent.warnCv,'warnMsg');

}

(function writeMsg() {
// pressed Write me message
  contModal.open();
  contModal.setTamplate(modalTamplate.emptyModal);
  contModal.setContent(warnContent.sendMessage,'warnMsg');
  $('#sendMessageForm').onClick(sendMessage) // call function from file messageForm.js





})()



















// test
