(function () {
  // document.addEventListener('DOMContentLoaded', ready);
  var rootEl = document.querySelector('#root');

  bindingEventListener(rootEl, 'click', '.add-button', togglePopover);
  bindingEventListener(rootEl, 'click', '.delete', deleteResource);
  bindingEventListener(rootEl, 'click', '.confirm', addResource);
  bindingEventListener(rootEl, 'click', '.cancel', closePopover);

  function togglePopover (event) {
    var containerEl = findParent(event.target, '.container');
    if(containerEl.querySelector('.popover')){
      removePopover(containerEl)
    }else {
      addPopover(containerEl);
    }
  }

  function bindingEventListener (target, event ,selector, callBack) {
    target.addEventListener(event, function (e) {
      if(e.target.matches(selector)){
        callBack(e);
        e.stopPropagation();
      }
    },false);
  }

  function addResource (event) {
    var container = findParent(event.target, '.container');
    var inputValue = container.querySelector('input').value;
    if(!inputValue){
      return;
    }
    var resourceNames = inputValue.split(',');
    var itemListEl = container.querySelector('.item-list');
    itemListEl.appendChild(createResourceDoms(resourceNames));
    container.removeChild(container.querySelector('.popover'));
  }

  function closePopover (event) {
    removePopover(findParent(event.target, '.container'));
  }

  function removePopover (containerEl) {
    containerEl.removeChild(containerEl.querySelector('.popover'));
  }

  function addPopover (containerEl) {
    var popoverElement = createPopover();
    containerEl.appendChild(popoverElement);
  }

  function deleteResource (event) {
    var resourceItemEl = findParent(event.target, '.resource-item');
    resourceItemEl.parentElement.removeChild(resourceItemEl);
  }

  function findParent (element, selector) {
    var parentEl = element.parentElement;
    while(!parentEl.matches(selector)){
      if(!parentEl){
        break;
      }
      parentEl = parentEl.parentElement;
    }
    return parentEl;
  }

  function createResourceDoms (items) {
    return items.map(function (item) {
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
    return '<li class="resource-item">'+ str +'<span class="delete">X</span></li>';
  }

  function createElement (template) {
    var div = document.createElement('div');
    div.innerHTML = template;
    return div.firstChild;
  }

  function createPopover () {
    var template = ['<div class="popover">',
      '<div class="popover-body"><input type="text"/></div>',
      '<div class="popover-footer">',
      '<button class="btn btn-primary confirm">Confirm</button>',
      '<button class="btn btn-default cancel">Cancel</button>',
      '</div></div>'].join('');
    return createElement(template);
  }
})()
