

var leadSource = [
    { 'lead_id': '1', 'lead_name': 'Web' },
    { 'lead_id': '2', 'lead_name': 'Google' },
    { 'lead_id': '3', 'lead_name': 'Facebook' },
    { 'lead_id': '4', 'lead_name': 'Twitter' }
];

var userRole = [
    { 'role_id': '1', 'role_type': 'Admin' },
    { 'role_id': '2', 'role_type': 'Staff' }
];

var appoinmentStatus = [
    { 'status_id': '1', 'status_name': 'Confirmed' },
    { 'status_id': '2', 'status_name': 'Pending' },
    { 'status_id': '3', 'status_name': 'Inprogress' },
    { 'status_id': '4', 'status_name': 'Cancelled' }
];

var caseObj = [
    { 'id': '1', 'casename': 'Case Name', 'cdate': '21/04/2016', 'edate': '25/04/2016', 'customer': '2', 'cmobile': '9629129377', 'assignee': '2', 'status': '3', 'description': 'Case Details' },
    { 'id': '2', 'casename': 'Case Name', 'cdate': '23/04/2016', 'edate': '26/04/2016', 'customer': '13', 'cmobile': '9629129377', 'assignee': '3', 'status': '3', 'description': 'Case Details' },
    { 'id': '3', 'casename': 'Case Name', 'cdate': '24/04/2016', 'edate': '26/04/2016', 'customer': '10', 'cmobile': '9629129377', 'assignee': '4', 'status': '3', 'description': 'Case Details' },
    { 'id': '4', 'casename': 'Case Name', 'cdate': '26/04/2016', 'edate': '29/04/2016', 'customer': '6', 'cmobile': '9629129377', 'assignee': '3', 'status': '3', 'description': 'Case Details' },
    { 'id': '5', 'casename': 'Case Name', 'cdate': '29/04/2016', 'edate': '30/04/2016', 'customer': '11', 'cmobile': '9629129377', 'assignee': '2', 'status': '3', 'description': 'Case Details' },
];


var productObj = [
    { 'id': '1', 'pname': 'Monitor', 'category': '1', 'brand':'Dell', 'prize':'$ 500'},
    { 'id': '2', 'pname': 'Mouse', 'category': '1', 'brand': 'Dell', 'prize': '$ 50' },
    { 'id': '3', 'pname': 'Mobile', 'category': '3', 'brand': 'Sony', 'prize': '$ 1000' },
    { 'id': '4', 'pname': 'RAM', 'category': '1', 'brand': 'Dell', 'prize': '$ 300' },
    { 'id': '5', 'pname': 'Hard Disk', 'category': '1', 'brand': 'Dell', 'prize': '$ 500' },
];


CRM.controller('LoginCtrl', function ($rootScope, $scope, $state, loginService) {
    $scope.userd = {
        "user_name": "",
        "password": ""
    };
    $scope.login = function (params) {
        loginService.login(params).then(function (res) {
            if (res.data.status) {
                Materialize.toast('Invalid Username and Password', 3000);
            } else {
                localStorage.setItem('user_id', res.data.id);
                Materialize.toast('Login Success!!', 3000);
                $state.go('app.dashboard');
            }
            
        }, function (err) {
            console.log(err)
        });
    };
    
});
CRM.controller('GraphCtrl', function ($rootScope, $scope, $state, HTTPService) {
    $scope.getTodoList = function () {
        HTTPService.getTodo().then(function (res) {
            console.log(res);
            $scope.todoList = res.data;
        }, function (err) {
            console.log(err);
        });
    }
    $scope.getTodoList();

    $scope.addTodo = function () {
        var params = {
            title: $scope.todayTask,
            status: '0',
            uid: localStorage.getItem('user_id')
        }
        HTTPService.addTodo(params).then(function (res) {
            $scope.todayTask = "";
            $scope.getTodoList();
        }, function (err) {
            $scope.todayTask = "";
            console.log(res);
        });
    }
    $scope.editTodo = function (list) {
        var params = {
            title: list.title,
            status: '1',
            id: list.id,
            uid: localStorage.getItem('user_id')
        }
        HTTPService.editTodo(params).then(function (res) {
            $scope.todayTask = "";
            $scope.getTodoList();
        }, function (err) {
            $scope.todayTask = "";
            console.log(res);
        });
    }
    
});

CRM.controller('MainCtrl', function ($rootScope, $scope, $state, $http) {
    $scope.isMobile = false;

    $scope.logout = function () {
        localStorage.removeItem('user_id');
        $state.go('login');
    };

    $rootScope.$on('CurrentUser', function (event, args) {
        $scope.userinfo = args;
        console.log(args);
    });
    // media query event handler
if (matchMedia) {
  var mq = window.matchMedia("(max-width: 992px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}

// media query change
function WidthChange(mq) {

  if (mq.matches) {
    $scope.isMobile = true;
  } else {
    $scope.isMobile = false;
  }

}

// $(window).on('resize', function() {
//     var width = $(window).innerWidth();
//     console.log(width);
//     if (width > 992) {
//         $scope.isMobile = false;
//       } else if(width <= 992) {
//         $scope.isMobile = true;
//       }
//             });


});


CRM.controller('CustomerCtrl', function ($rootScope, $scope, $state) {

    $scope.customerlist = customerObj;
    
    $scope.singleCustomer = {
        'id': '',
        'fname': '',
        'lname': '',
        'phone': '',
        'mobile': '',
        'email': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'country': '',
        'pincode': '',
        'dob': '',
        'gender': '',
        'occupation': '',
        'lead_id': '',
        'member_id': '',
        'interest': '',
        'photo': ''
    };

    $scope.clickCustomer = function () {
        $("#customerHead").empty();
        $("#customerHead").append("Add Customer");
        $("#viewsection").hide();
        $("#addeditsection").show();
        $scope.singleCustomer = {};
    };
    
    $scope.customerEdit = function (customer) {
        $("#customerHead").empty();
        $("#customerHead").append("Edit Customer");
        $("#viewsection").hide();
        $("#addeditsection").show();
        $scope.singleCustomer = customer;
        $('ul.tabs').tabs('select_tab', 'test2');
    };

    $scope.customerView = function (customer) {
        $("#customerHead").empty();
        $("#customerHead").append("View Customer");
        $("#addeditsection").hide();
        $("#viewsection").show();
        $scope.singleCustomer = customer;
        $('ul.tabs').tabs('select_tab', 'test2');
    };

});


CRM.controller('StaffCtrl', function ($rootScope, $scope, $state) {

    $scope.stafflist = userObj;

    $scope.singleStaff = {
        'id': '',
        'fname': '',
        'lname': '',
        'phone': '',
        'mobile': '',
        'email': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'country': '',
        'pincode': '',
        'dob': '',
        'gender': '',
        'photo': '',
        'role_id': '',
        'username': '',
        'password': '',
        'host': '',
        'port': '',
        'smtp_name': '',
        'smtp_pass': ''
    };

    $scope.clickStaff = function () {
        $("#staffHead").empty();
        $("#staffHead").append("Add Staff");
        $("#viewsection").hide();
        $("#addeditsection").show();
        $scope.showconfirmpassword = true;
        $scope.singleStaff= {};
    };

    $scope.staffEdit = function (staff) {
        $("#staffHead").empty();
        $("#staffHead").append("Edit Staff");
        $("#viewsection").hide();
        $("#addeditsection").show();
        $scope.showconfirmpassword = false;
        $scope.singleStaff = staff;
        $('ul.tabs').tabs('select_tab', 'test2');
    };

    $scope.staffView = function (staff) {
        $("#staffHead").empty();
        $("#staffHead").append("View Staff");
        $("#addeditsection").hide();
        $("#viewsection").show();
        $scope.showconfirmpassword = true;
        $scope.singleStaff = staff;
        $('ul.tabs').tabs('select_tab', 'test2');
    };

});


CRM.controller('ManageCtrl', function ($rootScope, $scope, $state, HTTPService) {
    $scope.userRoleList = userRole;
    $scope.leadSourceList = leadSource;
    $scope.appoinmentStatusList = appoinmentStatus;

    $scope.editProduct=false;
    $scope.editMembership=false;
    
    function loadProductCategoryData(){

        HTTPService.getProductCategory().then(function (res) {
            $scope.productCategoryList = res.data;
        }, function (err) {
            console.log(err)
        });

    }

    function loadMembershipData(){

        HTTPService.getMembership().then(function (res) {
            $scope.memberTypeList = res.data;
        }, function (err) {
            console.log(err)
        });

    }

    loadProductCategoryData();
    loadMembershipData();

    $scope.productCategoryEdit=function(productCategory){
        $scope.editProduct=true;
        $scope.productCategory=productCategory;
    }

    $scope.addProductCategory = function(productCategory){
        if(!$scope.editProduct){
        HTTPService.addProductCategory(productCategory).then(function (res) {
            if(res.data.status=="1"){
                Materialize.toast('Product Category added successfully', 2000);
                loadProductCategoryData();
                $scope.productCategory={};
                $scope.editProduct=false;
            }else{
                $scope.productCategory={};
                loadProductCategoryData();
                $scope.editProduct=false;
            }
        }, function (err) {
            console.log(err);
            $scope.productCategory={};
            loadProductCategoryData();
            $scope.editProduct=false;
        });
    }else if($scope.editProduct){
        HTTPService.editProductCategory(productCategory).then(function (res) {
            if(res.data.status=="1"){
                Materialize.toast('Product Category edited successfully', 2000);
                loadProductCategoryData();
                $scope.productCategory={};
                $scope.editProduct=false;
            }else{
                $scope.productCategory={};
                loadProductCategoryData();
                $scope.editProduct=false;
            }
        }, function (err) {
            console.log(err);
            $scope.productCategory={};
            loadProductCategoryData();
            $scope.editProduct=false;
        });
    }

    }

    $scope.membershipEdit=function(member){
        $scope.editMembership=true;
        $scope.membership=member;
    }

    $scope.addMembership = function(membership){
        if(!$scope.editMembership){
        HTTPService.addMembership(membership).then(function (res) {
            if(res.data.status=="1"){
                Materialize.toast('Membership added successfully', 2000);
                loadMembershipData();
                $scope.membership={};
                $scope.editMembership=false;
            }else{
                $scope.membership={};
                loadMembershipData();
                $scope.editMembership=false;
            }
        }, function (err) {
            console.log(err);
            $scope.membership={};
            loadMembershipData();
            $scope.editMembership=false;
        });
    }else if($scope.editMembership){
        HTTPService.editMembership(membership).then(function (res) {
            if(res.data.status=="1"){
                Materialize.toast('Membership edited successfully', 2000);
                loadMembershipData();
                $scope.membership={};
                $scope.editMembership=false;
            }else{
                $scope.membership={};
                loadMembershipData();
                $scope.editMembership=false;
            }
        }, function (err) {
            console.log(err);
            $scope.membership={};
            loadMembershipData();
            $scope.editMembership=false;
        });
    }

    }


});

CRM.controller('UiCalendarCtrl',
    function ($scope, $compile, $timeout, uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        $scope.appointmentlist = appointmentObj;

        $scope.switchtotable = function () {
            $("#calandermode").hide();
            $("#tablemode").show();
        };

        $scope.switchtocalander = function () {
            $("#tablemode").hide();
            $("#calandermode").show();
        };


        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        $scope.events = [
            { title: 'All Day Event', start: new Date(y, m, 1) },
            { title: 'Long Event', start: new Date(y, m, 22), end: new Date(y, m, 22) },
            { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
            { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
            { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
            { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        ];
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
                { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
                { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            $timeout(function () {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };
        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                selectable: true,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                select: function(start, end, allDay) {
                    uiCalendarConfig.calendars.availabilityCalendar.fullCalendar('refetchEvents');
                },

                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    });

CRM.controller('ApplicationCtrl', function ($rootScope, $scope, $state, AuthFactory) {
    $scope.userinfo = AuthFactory.getCurrentUser();
    $scope.isStaff = $scope.userinfo.role != '2' ? true : false;
    console.log($scope.currentUser);
});


CRM.controller('CaseCtrl', function ($rootScope, $scope, $state) {
    $('.modal-trigger').leanModal();
    $scope.caselist = caseObj;

    $scope.customername = customerObj;
    $scope.assigneename = userObj;

});

CRM.controller('ProductCtrl', function ($rootScope, $scope, $state) {
    
    $('.modal-trigger').leanModal();

    $scope.productlist = productObj;
       
});

CRM.filter('leadSource', function () {
    return function (number) {
        for (var i = 0; i < leadSource.length; i++) {
            if (leadSource[i].lead_id == number) {
                return leadSource[i].lead_name;
            }
        }
    }
});

CRM.filter('userRole', function() {
    return function(number){
    
        for(var i=0;i<userRole.length;i++){
            if (userRole[i].role_id == number) {
                return userRole[i].role_type;
            }
        }
    }
});

CRM.filter('memberType', function () {
    return function (number) {

        for (var i = 0; i < memberType.length; i++) {
            if (memberType[i].member_id == number) {
                return memberType[i].member_type;
            }
        }
    }
});

CRM.filter('genderType', function () {

    var genderSource = [
    { 'id': '1', 'type': 'Male' },
    { 'id': '2', 'type': 'Female' },
    { 'id': '3', 'type': 'Other' }
    ];

    return function (number) {

        for (var i = 0; i < genderSource.length; i++) {
            if (genderSource[i].id == number) {
                return genderSource[i].type;
            }
        }
    }
});


CRM.filter('statusType', function () {
    return function (number) {
        for (var i = 0; i < appoinmentStatus.length; i++) {
            if (appoinmentStatus[i].status_id == number) {
                return appoinmentStatus[i].status_name;
            }
        }
    }
});

CRM.filter('customerType', function () {
    return function (number) {
        for (var i = 0; i < customerObj.length; i++) {
            if (customerObj[i].id == number) {
                return customerObj[i].fname + " " + customerObj[i].lname;
            }
        }
    }
});

CRM.filter('staffType', function () {
    return function (number) {
        for (var i = 0; i < userObj.length; i++) {
            if (userObj[i].id == number) {
                return userObj[i].fname + " " + customerObj[i].lname;
            }
        }
    }
});

CRM.filter('productType', function () {
    return function (number) {
        for (var i = 0; i < productCategory.length; i++) {
            if (productCategory[i].product_id == number) {
                return productCategory[i].product_name;
            }
        }
    }
});
