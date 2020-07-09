const pL = {}

function _createModal(options){

     const modal = document.createElement('div');
     modal.classList.add('abmodal');
     modal.insertAdjacentHTML('afterbegin',`
     <div class="modal_custome" id='artGaleryModa' data-close='true'>
                  <div class="modal-content is-vcentered">
                    <div class="item-slide" data-content>
                    </div>
                  </div>
                  <a class="prev" onclick="moveImage('prev')">&#10094;</a>
                  <a class="next" onclick="moveImage('next')">&#10095;</a>
                <span class="modal-close is-large" data-close='true'>&times</span>
              </div>
     `)

$('main').insertNode(modal);

return modal;

}


//--------------------------------------------------
pL.modalArtGalery = function(options){

const $modal = _createModal(options);
const modal = {
  open() {
    $modal.classList.add('open')
  },
  close() {
    $modal.classList.remove('open')


  },
  setContent(html) {
    $modal.querySelector('[data-content]').innerHTML = html
  }
}

$modal.addEventListener('click', event => {
  if (event.target.dataset.close) {
    modal.close()
  }
})

 return modal;
}

const galModal = pL.modalArtGalery()
