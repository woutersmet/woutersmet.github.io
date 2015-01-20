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

global.app.data =
  {
    'contacts' : [
              {id:1, name : 'Wouter Smet', email : 'woutersmet@gmail.com'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
            ],
    'companies' : [
          {id:1,name : 'Oracle', industry : 'B2B'},
          {id:2,name : 'McDonalds', industry : 'food'},
    ],
    'deals' : [
          {id:1,name : 'Oracle', stage : 'new'},
          {id:2,name : 'McDonalds', stage : 'closed lost'},
    ],
  };

global.app.widgets = [
      {id : 1, label : 'Widget 1',value : 35, severity : 'low'},
      {id : 1, label : 'Widget 2',value : 12, severity : 'medium'},
      {id : 1, label : 'Widget 3',value : 35.2, severity : 'high'}
    ];

global.app.objects = [
      {
        id : 1,
        name : 'contact',
        pluralname : 'contacts',
        fields : [
          {id: 1, name : 'name', label : 'name', type : 'text'},
          {id: 2, name : 'datecreated', label : 'datecreated', type : 'date'},
          {id: 3, name : 'role', label : 'role', type : 'picklist', options : {picklistvalues : ['new','open','closed']}},
          {id: 4, name : 'email', label : 'email', type : 'email'},
          {id: 5, name : 'phone', label : 'phone', type : 'text'},
        ],
        layouts : {
              detail : [
                {
                  type : 'dualpanel',
                  left : ['name', 'email', 'phone'],
                  right : ['role', 'datecreated']
                }
              ]
            }
      },
      {
        id : 2,
        name : 'company',
        pluralname : 'companies',
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
        pluralname : 'deals',
        fields : [
          {id : 1, name : 'name', label : 'name', type : 'text'},
          {id : 2, name : 'datecreated', label : 'datecreated', type : 'date'},
          {id : 3, name : 'stage', label : 'stage', type : 'picklist', options : {picklistvalues : ['new','open','closed won', 'closed lost']}},
        ]
      },
      {
        id : 4,
        name : 'lead',
        pluralname : 'leads',
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
        pluralname : 'tasks',
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
  ];

  function getObjectItems(pluralname){
    return global.app.data[pluralname];
  }

  function getObjectById(id){
    for(i in global.app.objects) {
          if(global.app.objects[i].id == id) {
              return global.app.objects[i];
          }
      }
  }
  function getObjectByPluralName(pluralname){
    for(i in global.app.objects) {
          if(global.app.objects[i].pluralname == pluralname) {
              return global.app.objects[i];
          }
      }
  }

  function getObjectByPluralNameAndId(pluralname,objectid){
      var data = global.app.data[pluralname];
      for(i in data) {
          if(data[i].id == objectid) {
              return data[i];
          }
      }
  }


