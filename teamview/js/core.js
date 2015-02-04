function debug(smt){
  console.log(smt);
}

function getSideBarLinks(section){
  if (section == 'settings'){
    return [
      {
        toplink : {label : 'System Settings', url : 'settings'},
        sublinks : [
          {label : 'Organisation overview', url : 'settings/org'},
          {label : 'Manage Apps', url : 'settings/apps'},
          {label : 'Manage Users', url : 'settings/users'},
          {label : 'Manage Objects', url : 'settings/objects'}
        ]
      },
      {
        toplink : {label : 'Personal Settings', url : ''},
        sublinks : [
          {label : 'Account / preferences', url : 'settings/preferences'},
          {label : 'Profile', url : 'settings/profile'}
        ]
      }
    ];
  }
  else {
    return [
      {
        toplink : {label : 'link 1', url : '/app/settings/YES'},
        sublinks : [
          {label : 'link 1', url : '/app/settings/YES'},
          {label : 'link 2', url : '/app/settings/YES'},
          {label : 'link 3', url : '/app/settings/YES'},
        ]
      }
    ];
  }
}

  function getViewByObjectAndName(objectname,viewname){
    for (i in global.app.objects){
      if (global.app.objects[i].name == objectname){
        var object = global.app.objects[i];
        for (j in object.views){
          if (object.views[j].name == viewname){
            var view = object.views[j];
            return view;
          }
        }
      }
    }
  }

  function getItemList(objectname,view){

    //get items (should be filtered by the view filter!)
    var items = global.app.data[objectname];

    if (typeof view == 'undefined'){
      return items;
    }
    else {
      debug(view.columns);
      var itemlist = [];
      var filtereditem = [];
      for (j in items){
        filtereditem = [];
        for (k in view.columns){
          column = view.columns[k];
          filtereditem.push(items[j][column]);
        }
        itemlist.push({id : items[j].id, values : filtereditem});
      }
      //rearrange by view columns
      debug(itemlist);
      return itemlist;
    }
  }

  function getObjectById(id){
    for(i in global.app.objects) {
          if(global.app.objects[i].id == id) {
              return global.app.objects[i];
          }
      }
  }

  function getObjectByName(name){
    for(i in global.app.objects) {
          if(global.app.objects[i].name == name) {
              return global.app.objects[i];
          }
      }
  }

  function getItemByObjectNameAndItemId(name,itemid){
      var data = global.app.data[name];
      for(i in data) {
          if(data[i].id == itemid) {
              return data[i];
          }
      }
  }

  function getContextualNavItems(section){
    if (typeof section == 'undefined') return;
    var items = [
      {section : 'dynamic link 1', link : 'settings/objects/list'},
      {section : 'dynamic link 2', link : 'settings/objects/list'},
      {section : 'dynamic link 3', link : 'settings/objects/list'}
    ];

    return items;
  }

//source:
 function applyAppStyles(){
   var css = '';//h1 { background: red; }';
    css += 'a { color: '+global.app.appcolors.links+'; }';
    css += '.background-primary, .background-primary { background-color:'+global.app.appcolors.primary+' !important; }';
    css += '.background-secondary,.background-secondary a { background-color:'+global.app.appcolors.secondary+' !important; }';
    //css += 'button.btn-default, a.btn-default { background-color:'+global.app.appcolors.secondary+' !important;color:white; }';

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
 }

function createFilledLayout(layout,item){
    debug(layout);
    var filledlayout = {topleft : [],topright : [], detailleft : [], detailright : []};

    var field;
    for (i in layout.top.left){
        field = layout.top.left[i];
        filledlayout.topleft.push({name : field, value : item[field]});
    }

    for (i in layout.top.right){
        field = layout.top.right[i];
        filledlayout.topright.push({name : field, value : item[field]});
    }

    for (i in layout.detail.left){
        field = layout.detail.left[i];
        filledlayout.detailleft.push({name : field, value : item[field]});
    }

    for (i in layout.detail.right){
        field = layout.detail.right[i];
        filledlayout.detailright.push({name : field, value : item[field]});
    }

  return filledlayout;
}
