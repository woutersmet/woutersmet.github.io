function debug(smt){
  console.log(smt);
}

/*
* global data
 */

global = { system : {}, app : {}};

global.system.fieldtypes = [
    {name : 'text', label : 'text', glyphicon : 'pencil'},
    {name : 'longtext', label : 'longtext', glyphicon : 'pencil'},
    {name : 'number', label : 'number', glyphicon : 'pencil'},
    {name : 'date', label : 'date', glyphicon : 'pencil'},
    {name : 'picklist', label : 'picklist', glyphicon : 'pencil'},
    {name : 'relation', label : 'relation', glyphicon : 'pencil'},
  ]

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
        ]
      },
      {
        id : 2,
        name : 'company',
        pluralname : 'companies',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['internet','retail','agriculture']}},
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
      }
  ];

  function getObjectById(id){
    for(i in global.app.objects) {
          if(global.app.objects[i].id == id) {
              return global.app.objects[i];
          }
      }
  }
