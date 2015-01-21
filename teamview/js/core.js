function debug(smt){
  console.log(smt);
}

/*
* global data
 */

global = { system : {}, app : {}};

global.system.fieldtypes = [
    {name : 'text', label : 'Text', glyphicon : 'pencil'},
    {name : 'longtext', label : 'Long Text', glyphicon : 'pencil'},
    {name : 'number', label : 'Number', glyphicon : 'pencil'},
    {name : 'date', label : 'Date', glyphicon : 'pencil'},
    {name : 'picklist', label : 'Picklist', glyphicon : 'pencil'},
    {name : 'relation', label : 'Relation', glyphicon : 'pencil'},
    {name : 'user', label : 'App User', glyphicon : 'pencil'},
  ]

global.app.appname = "Customer Relations";
global.app.appcolors = {primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'};

global.app.data =
  {
    'contact' : [
              {id:1, name : 'Wouter Smet', email : 'woutersmet@gmail.com'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
            ],
    'company' : [
          {id:1,name : 'Oracle', industry : 'B2B'},
          {id:2,name : 'McDonalds', industry : 'food'},
    ],
    'deal' : [
          {id:1,name : 'Oracle', stage : 'new'},
          {id:2,name : 'McDonalds', stage : 'closed lost'},
    ],
  };

global.app.reports = [
  {id : 1, name : 'report_1', label : 'report 1', type : 'timeseries'},
  {id : 1, name : 'report_2', label : 'report 2', type : 'column'},
  {id : 1, name : 'report_3', label : 'report 3', type : 'summary'},
];

global.app.widgets = [
      {id : 1, name : 'widget_1', label : 'Widget 1',value : 35, severity : 'low', link : 'app/task'},
      {id : 2, name : 'widget_2', label : 'Widget 2',value : 12, severity : 'medium', link : 'app/company'},
      {id : 3, name : 'widget_3', label : 'Widget 3',value : 35.2, severity : 'high', link : 'app/contact'},
      {id : 4, name : 'widget_4', label : 'Widget 4',value : 0.2, severity : 'medium', link : 'app/contact'}
    ];

global.app.objects = [
      {
        id : 1,
        name : 'contact',
        label : 'contact',
        plurallabel : 'contacts',
        icon : 'user',
        fields : [
          {id: 1, name : 'name', label : 'name', type : 'text'},
          {id: 2, name : 'datecreated', label : 'datecreated', type : 'date'},
          {id: 3, name : 'role', label : 'role', type : 'picklist', options : {picklistvalues : ['new','open','closed']}},
          {id: 4, name : 'email', label : 'email', type : 'email'},
          {id: 5, name : 'phone', label : 'phone', type : 'text'},
          {id: 5, name : 'company', label : 'company', type : 'relation'},
        ],
        layouts : {
              detail : {
                  top: { left : ['name','email','phone'], right : ['role','company']},
                  detail: { left : ['datecreated'], right : ['createdby']}
                }
            }
      },
      {
        id : 2,
        name : 'company',
        label : 'company',
        plurallabel : 'companies',
        icon : 'home',
        fields : [
          {id : 1, name : 'name', label : 'name', type : 'text'},
          {id : 2, name : 'datecreated', label : 'date created', type : 'date'},
          {id : 3, name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['B2B','food','internet','retail','agriculture']}},
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      },
      {
        id : 3,
        name : 'deal',
        label : 'deal',
        icon : 'star',
        plurallabel : 'deals',
        fields : [
          {id : 1, name : 'name', label : 'name', type : 'text'},
          {id : 2, name : 'datecreated', label : 'datecreated', type : 'date'},
          {id : 3, name : 'stage', label : 'stage', type : 'picklist', options : {picklistvalues : ['new','open','closed won', 'closed lost']}},
        ]
      },
      {
        id : 4,
        name : 'lead',
        label : 'lead',
        icon : 'user',
        plurallabel : 'leads',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'company', label : 'company', type : 'text'},
          {name : 'owner', label : 'owner', type : 'user'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['internet','retail','agriculture']}},
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      },
      {
        id : 5,
        name : 'task',
        label : 'task',
        plurallabel : 'tasks',
        icon : 'tasks',
        fields : [
          {name : 'subject', label : 'subject', type : 'text'},
          {name : 'comments', label : 'comments', type : 'longtext'},
          {name : 'assignedto', label : 'assigned to', type : 'user'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'status', label : 'status', type : 'picklist', options : {picklistvalues : ['todo','done']}},
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      },
      {
        id : 6,
        name : 'project',
        plurallabel : 'projects',
        icon : 'tasks',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'comments', label : 'comments', type : 'longtext'},
          {name : 'assignedto', label : 'assigned to', type : 'user'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'status', label : 'status', type : 'picklist', options : {picklistvalues : ['not started yet','in progress','completed','invoiced']}},
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      },
      {
        id : 6,
        name : 'deliverable',
        label : 'deliverable',
        plurallabel : 'deliverables',
        icon : 'star-empty',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'comments', label : 'comments', type : 'longtext'},
          {name : 'assignedto', label : 'assigned to', type : 'user'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'status', label : 'status', type : 'picklist', options : {picklistvalues : ['not started yet','in progress','completed','invoiced']}},
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      }
  ];

  function getObjectItems(name){
    return global.app.data[name];
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

  function getContextualNavItems(name){
    var items = [
      {name : 'dynamic link 1', link : 'settings/objects/list'},
      {name : 'dynamic link 2', link : 'settings/objects/list'},
      {name : 'dynamic link 3', link : 'settings/objects/list'}
    ];

    return items;
  }


//source:
 function applyAppStyles(){
   var css = '';//h1 { background: red; }';
    css += 'a { color: '+global.app.appcolors.links+'; }';
    css += '.background-primary, .background-primary { background-color:'+global.app.appcolors.primary+' !important; }';
    css += '.background-secondary,.background-secondary a { background-color:'+global.app.appcolors.secondary+' !important; }';

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
