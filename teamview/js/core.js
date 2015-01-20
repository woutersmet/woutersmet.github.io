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

global.app.appname = "CRM";

global.app.data =
  {
    'contacts' : [
              {name : 'Wouter Smet', email : 'woutersmet@gmail.com'},
              {name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
            ],
    'companies' : [
          {name : 'Oracle', industry : 'B2B'},
          {name : 'McDonalds', industry : 'food'},
    ],
    'deals' : [
          {name : 'Oracle', stage : 'new'},
          {name : 'McDonalds', stage : 'closed lost'},
    ],
  };

global.app.objects = [
      {
        id : 1,
        name : 'contact',
        pluralname : 'contacts',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'role', label : 'role', type : 'picklist', options : {picklistvalues : ['new','open','closed']}},
          {name : 'email', label : 'email', type : 'email'},
          {name : 'phone', label : 'phone', type : 'text'},
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      },
      {
        id : 2,
        name : 'company',
        pluralname : 'companies',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'date created', type : 'date'},
          {name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['B2B','food','internet','retail','agriculture']}},
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
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'stage', label : 'stage', type : 'picklist', options : {picklistvalues : ['new','open','closed won', 'closed lost']}},
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
  ];

  function getObjectList(pluralname){
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
