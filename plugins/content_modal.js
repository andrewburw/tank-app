const cM = {}

function _createModal(options){

     const modal = document.createElement('div');
     modal.classList.add('modal');
     modal.insertAdjacentHTML('afterbegin',`

   <div class="modal-background"></div>
   <div class="modal-card modal-content">
     <header class="modal-card-head">
       <p class="modal-card-title"data-modaltitle>Web Project:</p>
       <button class="delete" aria-label="close" data-close='true'></button>
     </header>
     <section class="modal-card-body" data-settemplate>

     </section>
     <footer class="modal-card-foot">
       <button class="button is-success"  data-close='true'>Close info</button>

     </footer>
   </div>

     `)

$('main').insertNode(modal);

return modal;

}


//--------------------------------------------------
cM.contentModal = function(){
const $modal = _createModal();
const modal = {
  open() {
    $modal.classList.add('is-active')
  },
  close() {
    $modal.classList.remove('is-active')

  },
  setTamplate(template){
    $modal.querySelector('[data-settemplate]').innerHTML = template;


  }
}

$modal.addEventListener('click', event => {
  if (event.target.dataset.close) {
    modal.close()
  }
})
// -------------------------------------------------
 return Object.assign(modal,{
   setContent(options,template) {
if (template === 'myWorks') {
 //data-projectIMG

     $modal.querySelector('[data-modaltitle]').innerHTML = options.modalTitle;
     $modal.querySelector('[data-projecttitle]').innerHTML = options.projectName;
     $modal.querySelector('[data-projectIMG]').innerHTML = `<img src=${options.pictSRC} />`;
     $modal.querySelector('[data-projectDescription]').innerHTML = `<p>${options.projectDescription}</p>`;
     $modal.querySelector('[data-technologyDescription]').innerHTML = `<p>${options.technologyDescription}</p>`;
     $modal.querySelector('[data-creationDescription]').innerHTML = `<p>${options.creationDescription}</p>`;
     $modal.querySelector('[data-creationDescription]').innerHTML = `<p>${options.creationDescription}</p>`;
      $modal.querySelector('[data-projectdone]').innerHTML = `<div class="column is-one-third">Project completion:
    </div><div class="column"><progress class="progress" value=${options.progress} max="100"></progress>${options.progress}%</div>`;

$modal.querySelector('[data-technologyList]').innerHTML = `<ul> ${
    options.technologyList.map(val => {
       return `<li><strong> ${val}</strong></li>`;
     }).join('')}  </ul> `;

$modal.querySelector('[data-links]').innerHTML = `<ul><li><a class="level-left" href='${options.links.github}'>Github</a></li>
    <li><a class="level-left" href='${options.links.projectSite}'>Project Site.</a></li></ul>`;



} else if (template === 'skills') {


   let skilzRender = [];
  $modal.querySelector('[data-modaltitle]').innerHTML = options.modalTitle;
  $modal.querySelector('[data-projecttitle]').innerHTML = options.projectName;
  $modal.querySelector('[data-projectDescription]').innerHTML = `<p>${options.projectDescription}</p>`;

  Object.keys(options.skilzData).forEach(key => {
    let value = options.skilzData[key];

   skilzRender.push( `<tr><td><span class="tag is-medium ${value.color || 'is-light'}">${key}</span></td><td class='tooltip'><span class="tooltiptext">${value.precentage}%</span><progress class="progress is-small ${value.color || ''}" value=${value.precentage} max="100"></progress></td><td>${value.description}</td></tr>`)

})

$modal.querySelector('[data-tablecontent]').innerHTML = skilzRender.join(' ')

} else if (template === 'warnMsg') {
  $modal.querySelector('[data-modaltitle]').innerHTML = options.modalTitle;
  $modal.querySelector('[data-header]').innerHTML = options.modalHeader;
  $modal.querySelector('[data-maincontent]').innerHTML = options.modalContent;
  $modal.querySelector('[data-secondmsg]').innerHTML = options.modalSecondContent;

}

}

 });
}

const contModal = cM.contentModal()
