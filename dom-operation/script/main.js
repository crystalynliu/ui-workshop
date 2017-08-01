(function () {
  var addBtnEl = document.querySelector('#add-button');
  var popoverEl = document.querySelector('#popover');
  var itemListEl = document.querySelector('#itemList');
  addBtnEl.addEventListener('click', function () {
    var currentStyle = popoverEl.style.display;
    popoverEl.style.display = currentStyle && currentStyle === 'block' ? 'none' : 'block';
    popoverEl.querySelector('input').focus();
  });

  var confirmBtnEl = popoverEl.querySelector('#confirm');
  var cancelBtnEl = popoverEl.querySelector('#cancel');
  confirmBtnEl.addEventListener('click', function () {
    var inputValue = popoverEl.querySelector('input').value;
    if(inputValue){
      itemListEl.appendChild(createItem(inputValue));
    }
    popoverEl.style.display = 'none';
  })

  cancelBtnEl.addEventListener('click', function () {
    popoverEl.style.display = 'none';
  });

  itemListEl.addEventListener('click', function (event) {
    if(event.target.matches('.delete')){
      var parent = event.target.parentElement;
      itemListEl.removeChild(parent);
      event.stopPropagation();
    }
  })

  function createItem (items) {
    var fragment = document.createDocumentFragment();
    items.split(',').forEach(function (item) {
      var li = document.createElement('li');
      li.innerHTML = item + '<span class="delete">X</span>';
      fragment.appendChild(li);
    })
    return fragment;
  }
})()
