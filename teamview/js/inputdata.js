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

global.system.sidebarlinks = {
  'settings' :
    [
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
    ]
  };

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
  {themename: 'engagor', primary : "#414f59", secondary: '#b7ca33', links : '#3bb9bb'},
  {themename: 'tadabon', primary : "#116183", secondary: 'rgb(194,152,93)', links : '#428bca'}
  ]

/*
* SPECIFIC APP
 */

global.org = {
  name : 'tadabon',
  label : 'TadaBon',
  language : "en"
}

global.org.apps = {
  crm : {
    name : "crm",
    label : "Customer Relations",
    description : "For managing our Customer Relations",
    objects : ['contact','company','deal','lead', 'product'],
    appcolors : {themename : 'podio',primary : "#5092BD", secondary: '#5FC660', links : '#3376A4'}
  },
  accounting : {
    name : "accounting",
    label : "Accounting",
    description : "For managing our Accounting",
    objects : ['company','invoice','estimate','product','line_item','payment'],
    appcolors : {themename : 'forest', primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'}
  },
  humanresources : {
    name : "humanresources",
    label : "human resources",
    description : "For managing our human resources",
    objects : ['employee','time_off_request', 'job_application','onboarding_step','offboarding_step'],
    appcolors : {themename: 'grayscale', primary : "#666", secondary: '#999', links : '#888'}
  },
  projects : {
    name : "projects",
    label : "projects",
    description : "For managing our projects",
    objects : ['project','milestone','task','file'],
    appcolors : {themename : 'forest', primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'}
  },
}

global.org.users = [
  {firstname : 'Wouter', lastname : 'Smet', email : 'woutersmet@gmail.com', role : 'owner'},
  {firstname : 'Jochen', lastname : 'Boeykens', email : 'jochen.boeykens@gmail.com', role : 'admin'},
  {firstname : 'John', lastname : 'Doe', email : 'john.doe@gmail.com', role : 'user'},
  {firstname : 'Jane', lastname : 'Doe', email : 'jane.doe@gmail.com', role : 'user'}
];

global.app = {
  name : "crm",
  label : "Customer Relations"
};

//global.app.appcolors = {themename : 'forest', primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'};
//global.app.appcolors = {themename: 'engagor', primary : "#414f59", secondary: '#b7ca33', links : '#3bb9bb'};
//global.app.appcolors = {themename: 'tadabon', primary : "#116183", secondary: '#dddd88', links : '#428bca'};
//global.app.appcolors = {primary : "#738E73", secondary: '#D39B7E', links : '#78AD7B'}; //forest
global.app.appcolors = {themename : 'podio',primary : "#5092BD", secondary: '#5FC660', links : '#3376A4'};

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
    'project' : [
          {id:1,name : 'Website for client 1', status : 'completed'},
          {id:2,name : 'McDonalds summer campaign', status : 'in progress'}
      ]

  };

global.app.reports = [
  {id : 1, name : 'report_1', label : 'report 1', type : 'timeseries'},
  {id : 1, name : 'report_2', label : 'report 2', type : 'column'},
  {id : 1, name : 'report_3', label : 'report 3', type : 'summary'},
];

global.app.widgets = [
      {id : 1, colwidth : 6, type : 'feed', name : 'widget_1', label : 'Feed',value : 35, severity : 'low', link : 'app/task'},
      {id : 2, colwidth : 6, type : 'number', name : 'widget_2', label : 'Widget 2',value : 12, severity : 'medium', link : 'app/company'},
      {id : 3, colwidth : 4, type : 'number', name : 'widget_3', label : 'Widget 3',value : 35.2, severity : 'high', link : 'app/contact'},
      {id : 4, colwidth : 4, type : 'number', name : 'widget_4', label : 'Widget 4',value : 0.2, severity : 'medium', link : 'app/contact'}
    ];

global.app.objects = [
      {
        id : 1,
        name : 'contact',
        label : 'contact',
        plurallabel : 'contacts',
        icon : 'user',
        fields : [
          {id: 1, name : 'firstname', label : 'first name', type : 'text'},
          {id: 2, name : 'lastname', label : 'last name', type : 'text'},
          {id: 3, name : 'datecreated', label : 'date created', type : 'date'},
          {id: 4, name : 'role', label : 'role', type : 'picklist', options : {picklistvalues : ['new','open','closed']}},
          {id: 5, name : 'email', label : 'email', type : 'email'},
          {id: 6, name : 'phone', label : 'phone', type : 'text'},
          {id: 7, name : 'company', label : 'company', type : 'relation'},
        ],
        views : [
          {name : 'contact_all', label : 'All contacts', filter : [], columns : ['name','email','phone']},
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
        label : 'company',
        plurallabel : 'companies',
        icon : 'globe',
        activenav : 'activenav', //makes no sense of course, this is UI stuff not data/object definition
        fields : [
          {id : 1, name : 'name', label : 'naam', type : 'text'},
          {id : 2, name : 'country', label : 'land', type : 'text'},
          {id : 3, name : 'datecreated', label : 'date created', type : 'date'},
          {id : 3, name : 'createdby', label : 'created by', type : 'user'},
          {id : 4, name : 'type', label : 'type', type : 'picklist', options : {picklistvalues : ['prospect','customer','partner']}},
          {id : 5, name : 'industry', label : 'industry', type : 'picklist', options : {picklistvalues : ['B2B','food','internet','retail','agriculture']}},
        ],
        views : [
          {name : 'company_all', label : 'All companies', filter : [], columns : ['name','industry']},
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
          {name : 'deal_all', label : 'All deals', filter : [], columns : ['name','stage']}
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
          {name : 'lead_all', label : 'All leads', filter : [], columns : ['name','company','email']}
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
        views : [
          {name : 'task_all', label : 'All tasks', filter : [], columns : ['name','assignedto', 'status']}
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
        plurallabel : 'projects',
        icon : 'tasks',
        fields : [
          {name : 'name', label : 'name', type : 'text'},
          {name : 'comments', label : 'comments', type : 'longtext'},
          {name : 'assignedto', label : 'assigned to', type : 'user'},
          {name : 'datecreated', label : 'datecreated', type : 'date'},
          {name : 'status', label : 'status', type : 'picklist', options : {picklistvalues : ['not started yet','in progress','completed','invoiced']}},
        ],
        views : [
          {name : 'project_all', label : 'All projects', filter : [], columns : ['name','status']}
        ],
        layouts : {
            detail : {
                top: { left : ['name','assignedto'], right : ['status']},
                detail: { left : ['comments']}
              }
          }
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
