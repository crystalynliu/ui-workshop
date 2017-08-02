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
    return items.split(',').map(function (item) {
      var formatItem = item.trim();
      return formatItem ? createElement(resourceTemplate(formatItem)) : formatItem;
    }).reduce(function (fragment, itemDom) {
      if(itemDom){
        fragment.appendChild(itemDom);
      }
      return fragment;
    }, document.createDocumentFragment());
  }

  function resourceTemplate (str) {
    return '<li>'+ str +'<span class="delete">X</span></li>';
  }

  function createElement (template) {
    var div = document.createElement('div');
    div.innerHTML = template;
    return div.firstChild;
  }
})()
