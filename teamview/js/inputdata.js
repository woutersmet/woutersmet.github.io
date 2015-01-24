'use strict';
/*
* global data
 */

var global = {};

/*
* SYSTEM
 */

global.system = {};
global.system.fieldtypes = [
    {name : 'text', label : 'Text', glyphicon : 'pencil'},
    {name : 'longtext', label : 'Long Text', glyphicon : 'pencil'},
    {name : 'number', label : 'Number', glyphicon : 'pencil'},
    {name : 'currency', label : 'Currency', glyphicon : 'pencil'},
    {name : 'date', label : 'Date', glyphicon : 'pencil'},
    {name : 'picklist', label : 'Picklist', glyphicon : 'pencil'},
    {name : 'relation', label : 'Relation', glyphicon : 'pencil'},
    {name : 'user', label : 'App User', glyphicon : 'pencil'},
  ];

global.system.translations = {
    en : {
      'actions' : 'actions',
      'app name' : 'app name',
      'app colors' : 'app colors',
      'app settings' : 'app settings',
      'create new view' : 'create new view',
      'dashboard' : 'dashboard',
      'del' : 'del',
      'edit' : 'edit',
      'global links' : 'global links',
      'more...' : 'more...',
      'log out' : 'log out',
      'manage team' : 'manage team',
      'my account' : 'my account',
      'my views' : 'my views',
      'new' : 'new',
      'reports' : 'reports',
      'settings' : 'settings',
      'switch to app' : 'switch to app',
      'overview' : 'overview',
      'search' : 'search',
      'team views' : 'team views'
    },
    nl : {
      'actions' : 'acties',
      'app name' : 'app naam',
      'app language' : 'app taal',
      'app colors' : 'app kleuren',
      'app settings' : 'app instellingen',
      'back to list' : 'terug naar lijst',
      'create new view' : 'nieuwe weergave aanmaken',
      'dashboard' : 'dashboard',
      'del' : 'verwijderen',
      'edit' : 'bewerken',
      'global links' : 'globale links',
      'log out' : 'uitloggen',
      'my account' : 'mijn account',
      'team beheren' : 'team beheren',
      'more...' : 'meer...',
      'my views' : 'mijn weergaven',
      'new' : 'nieuw',
      'objects' : 'objecten',
      'overview' : 'overzicht',
      'primary' : 'primair',
      'secondary' : 'secondair',
      'links' : 'links',
      'reports' : 'rapporten',
      'search' : 'zoeken',
      'settings' : 'instellingen',
      'switch to app' : 'naar andere app',
      'team views' : 'team weergaven'
    }
  };

global.system.colorthemes = [
  {themename : 'bootstrap',primary : "#111", secondary: '#428bca', links : '#337ab7'},
  {themename : 'podio',primary : "#5092BD", secondary: '#5FC660', links : '#3376A4'},
  {themename : 'forest', primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'},
  {themename: 'vivid', primary : "#933", secondary: '#999', links : '#27d'},
  {themename: 'grayscale', primary : "#666", secondary: '#999', links : '#888'},
  ]

/*
* SPECIFIC APP
 */

global.org = {
  name : 'tadabon',
  label : 'TadaBon'
}

global.org.apps = {
  crm : {
    name : "crm",
    label : "Customer Relations",
    language : "nl",
    objects : ['contact','company','deal','lead', 'product']
  },
  accounting : {
    name : "accounting",
    label : "Accounting",
    language : "nl",
    objects : ['company','invoice','estimate','product','line_item','payment']
  },
}

global.app = {
  name : "crm",
  label : "Customer Relations",
  language : "nl"
};

global.app.appcolors = {themename : 'podio',primary : "#5092BD", secondary: '#5FC660', links : '#3376A4'}; //podio
//global.app.appcolors = {primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'}; //forest
//global.app.appcolors = {primary : "#933", secondary: '#999', links : '#27d'}; //dark grey boring

global.app.data =
  {
    'contact' : [
              {id:1, name : 'Wouter Smet', email : 'woutersmet@gmail.com', phone : '+53124123'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
              {id:2,name : 'John Doe', email : 'johndoe@oracle.com', phone : '+12345'},
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
        plurallabel : 'contacten',
        icon : 'user',
        fields : [
          {id: 1, name : 'firstname', label : 'voornaam', type : 'text'},
          {id: 2, name : 'lastname', label : 'familienaam', type : 'text'},
          {id: 3, name : 'datecreated', label : 'datecreated', type : 'date'},
          {id: 4, name : 'role', label : 'role', type : 'picklist', options : {picklistvalues : ['new','open','closed']}},
          {id: 5, name : 'email', label : 'email', type : 'email'},
          {id: 6, name : 'phone', label : 'phone', type : 'text'},
          {id: 7, name : 'company', label : 'company', type : 'relation'},
        ],
        views : [
          {name : 'contact_all', label : 'Alle contacten', filter : [], columns : ['name','email','phone']},
          {name : 'managers', label : 'Managers', filter : {role : 'manager'}, columns : ['name','email']},
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
        label : 'bedrijf',
        plurallabel : 'bedrijven',
        icon : 'home',
        fields : [
          {id : 1, name : 'name', label : 'naam', type : 'text'},
          {id : 2, name : 'country', label : 'land', type : 'text'},
          {id : 3, name : 'datecreated', label : 'date created', type : 'date'},
          {id : 3, name : 'createdby', label : 'created by', type : 'user'},
          {id : 4, name : 'type', label : 'type', type : 'picklist', options : {picklistvalues : ['prospect','customer','partner']}},
          {id : 5, name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['B2B','food','internet','retail','agriculture']}},
        ],
        views : [
          {name : 'company_all', label : 'Alle bedrijven', filter : [], columns : ['name','industry']},
        ],
        layouts : {
              detail : {
                  top: { left : ['name','type','industry'], right : ['owner','country']},
                  detail: { left : ['datecreated'], right : ['createdby']}
                }
            }
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
          {id : 4, name : 'owner', label : 'owner', type : 'user'},
        ],
        views : [
          {name : 'deal_all', label : 'Alle deals', filter : [], columns : ['name','stage']}
        ],
      },
      {
        id : 4,
        name : 'lead',
        label : 'lead',
        icon : 'user',
        plurallabel : 'leads',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'email', label : 'email', type : 'email'},
          {name : 'phone', label : 'phone', type : 'text'},
          {name : 'company', label : 'company', type : 'text'},
          {name : 'status', label : 'status', type : 'picklist', options : {picklistvalues : ['new','qualified','unqualified']}},
          {name : 'owner', label : 'owner', type : 'user'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['internet','retail','agriculture']}},
        ],
        views : [
          {name : 'lead_all', label : 'Alle leads', filter : [], columns : ['name','company','email']}
        ],
        layouts : [
            {type : 'list', label : 'Default List View', name : 'default_list_view'},
            {type : 'detail', label : 'Default Detail View', name : 'default_detail_view'}
        ]
      },
      {
        id : 5,
        name : 'task',
        label : 'taak',
        plurallabel : 'taken',
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
        label : 'project',
        plurallabel : 'projecten',
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
