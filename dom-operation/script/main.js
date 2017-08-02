(function () {
  var addBtnEl = document.querySelector('#add-button');
  var popoverEl = document.querySelector('#popover');
  var itemListEl = document.querySelector('#itemList');
  var confirmBtnEl = popoverEl.querySelector('#confirm');
  var cancelBtnEl = popoverEl.querySelector('#cancel');
  var inputEl = popoverEl.querySelector('input');

  addBtnEl.addEventListener('click', togglePopover);
  confirmBtnEl.addEventListener('click', handleAddResource);
  cancelBtnEl.addEventListener('click', closePopover);
  itemListEl.addEventListener('click', handleDeleteResource);

  function handleAddResource () {
    itemListEl.appendChild(createResourceDoms(inputEl.value));
    closePopover();
  }

  function handleDeleteResource (event) {
    if(event.target.matches('.delete')){
      var parent = event.target.parentElement;
      itemListEl.removeChild(parent);
      event.stopPropagation();
    }
  }

  function togglePopover () {
    var currentStyle = popoverEl.style.display;
    if(currentStyle && currentStyle === 'block'){
      closePopover();
    } else {
      openPopover();
    }
  }

  function openPopover () {
    popoverEl.style.display = 'block';
    popoverEl.querySelector('input').focus();
  }

  function closePopover () {
    popoverEl.style.display = 'none';
    inputEl.value = '';
  }

  function createResourceDoms (items) {
    var fragment = document.createDocumentFragment();
    items.split(',').forEach(function (item) {
      var formatItem = item.trim();
      if(formatItem){
        fragment.appendChild(createElement('<li>'+ formatItem +'<span class="delete">X</span></li>'));
      }
    })
    return fragment;
  }

  function createElement (template) {
    var div = document.createElement('div');
    div.innerHTML = template;
    return div.firstChild;
  }
})()
