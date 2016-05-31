

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
                Materialize.toast('Invalid Username and Password', 2000);
            } else {
                localStorage.setItem('user_id', res.data.id);
                Materialize.toast('Login Success!!', 2000);
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
    };
    //$scope.chkbox = true;
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
    $scope.editTodo = function (event,list) {
        var res = confirm("Are you sure to check it!!");
        if (res == true) {
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
        } else {
            angular.element(event.currentTarget).prop('checked', false);
        }
        
    }


    function getallcount() {
        HTTPService.getopencase(localStorage.getItem('user_id')).then(function (res) {
            //console.log("open----" + res.data.length);
            $scope.opencasecount = res.data.length;
        }, function (err) {
            console.log(err);
        });

        HTTPService.getcloasecase(localStorage.getItem('user_id')).then(function (res) {
            //console.log("close----" + res.data.length);
            $scope.qshow = false;
            $scope.closecasecount = res.data.length;

            var per = 0;
            var max = 100;
            var target = 50;

            $scope.percentage = 0;
            $scope.percentageset = 0;
            $scope.max = max;
            $scope.target = target;
            $scope.qty = per;

            if (res.data.length != 0) {

                for(var i=0;i<res.data.length;i++)
                {
                    per = per + parseInt(res.data[i].qty);
                }

                var percentage = (per / target) * max;

                //console.log("per---"+per);

                $scope.percentage = percentage;
                $scope.percentageset = percentage;
                $scope.max = max;
                $scope.target = target;
                $scope.qty = per;
                

                if ($scope.percentage >= $scope.max) {
                    $scope.percentageset = max;
                    $scope.qshow = true;
                }

            }

        }, function (err) {
            console.log(err);
        });

        HTTPService.getCustomer().then(function (res) {
            //console.log("cus----" + res.data.length);
            $scope.customercount = res.data.length;
        }, function (err) {
            console.log(err);
        });

        HTTPService.getHotCustomer().then(function (res) {
            //console.log("hot----" + res.data.length);
            $scope.hotcustomercount = res.data.length;
        }, function (err) {
            console.log(err);
        });

        HTTPService.getAppoinment().then(function (res) {
           // console.log("appoint----"+res.data.length);
            $scope.appoinmentcount = res.data.length;
        }, function (err) {
            console.log(err);
        });
    }

    getallcount();

    $scope.gotoOpencase = function () {
        $state.go('app.opencase');
    }

    $scope.gotoClosecase = function () {
        $state.go('app.closecase');
    }

    $scope.gotoCustomerList = function () {
        $state.go('app.customerlist');
    }

    $scope.gotoHotCustomerList = function () {
        $state.go('app.hotcustomerlist');
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


CRM.controller('CustomerCtrl', function ($rootScope, $scope, $state, HTTPService, $location) {

    $scope.customerlist = {};
    HTTPService.getCustomer().then(function (res) {
        $scope.customerlist = res.data;
    }, function (err) {
        $scope.customerlist = {};
        console.log(err);
    });
    
    $scope.customerEdit = function (cid) {
        $state.go('app.editcustomer', {
            id: cid
        });
    };

    $scope.customerView = function (cid) {
         $state.go('app.viewcustomer', {
            id: cid
        });
    };

    $scope.gotoAdd = function () {
        $state.go('app.addcustomer');
    };

});

CRM.controller('ViewCustomerCtrl', function ($rootScope, $scope, $state, HTTPService, $stateParams) {

    var param = $stateParams.id;

    $scope.singleCustomer = {};
    HTTPService.getSingleCustomer(param).then(function (res) {
        $scope.singleCustomer = res.data;
    }, function (err) {
        $scope.singleCustomer = {};
        console.log(err);
    });

    

});

CRM.controller('AddCustomerCtrl', function ($rootScope, $scope, $state, HTTPService, $stateParams) {

    $scope.singleCustomer = {
        address1: "",
        address2: "",
        city: "",
        country: "",
        dob: "",
        email: "",
        fname: "",
        gender: "",
        hot: "",
        interst: "",
        lead_source: "",
        lname: "",
        membership_id: "",
        mobile: "",
        occupation: "",
        phone: "",
        pincode: "",
        state: "",
        image: ""
    };

    $scope.getMembershipData = function () {
        HTTPService.getMembership().then(function (res) {
            $scope.membership = res.data;
        }, function (err) {
            $scope.membership = {};
            console.log(err);
        });
    };

    $scope.getMembershipData();

    $scope.addCustomer = function (singleCustomer) {
        $scope.cus = {
            address1: singleCustomer.address1,
            address2: singleCustomer.address2,
            city: singleCustomer.city,
            country: singleCustomer.country,
            dob: singleCustomer.dob,
            email: singleCustomer.email,
            fname: singleCustomer.fname,
            gender: singleCustomer.gender,
            hot: singleCustomer.hot == "" ? 0 : singleCustomer.hot,
            interst: singleCustomer.interst,
            lead_source: singleCustomer.lead_source,
            lname: singleCustomer.lname,
            membership_id: singleCustomer.membership_id,
            mobile: singleCustomer.mobile,
            occupation: singleCustomer.occupation,
            phone: singleCustomer.phone,
            pincode: singleCustomer.pincode,
            state: singleCustomer.state,
            image:""
        };

        //console.log(singleCustomer);
        //console.log($scope.cus);

        HTTPService.addCustomer($scope.cus).then(function (res) {
            //console.log(res);

            Materialize.toast('Customer added successfully !!', 2000);

            $state.go('app.customers');


        }, function (err) {
            //$scope.membership = {};
            Materialize.toast('Customer not added !!', 2000);
            console.log(err);
        });
        
    };

});


CRM.controller('EditCustomerCtrl', function ($rootScope, $scope, $state, HTTPService, $stateParams) {

    $scope.getMembershipData = function () {
        HTTPService.getMembership().then(function (res) {
            $scope.membership = res.data;
        }, function (err) {
            $scope.membership = {};
            console.log(err);
        });
    };

    $scope.getMembershipData();

    var param = $stateParams.id;

    $scope.singleCustomer = {};
    HTTPService.getSingleCustomer(param).then(function (res) {
        $scope.singleCustomer = res.data;
    }, function (err) {
        $scope.singleCustomer = {};
        console.log(err);
    });


    $scope.editCustomer = function (singleCustomer) {
        //$scope.cus = {
        //    address1: singleCustomer.address1,
        //    address2: singleCustomer.address2,
        //    city: singleCustomer.city,
        //    country: singleCustomer.country,
        //    dob: singleCustomer.dob,
        //    email: singleCustomer.email,
        //    fname: singleCustomer.fname,
        //    gender: singleCustomer.gender,
        //    hot: singleCustomer.hot == "" ? 0 : singleCustomer.hot,
        //    interst: singleCustomer.interst,
        //    lead_source: singleCustomer.lead_source,
        //    lname: singleCustomer.lname,
        //    membership_id: singleCustomer.membership_id,
        //    mobile: singleCustomer.mobile,
        //    occupation: singleCustomer.occupation,
        //    phone: singleCustomer.phone,
        //    pincode: singleCustomer.pincode,
        //    state: singleCustomer.state,
        //    image: ""
        //};

        //console.log(singleCustomer);
        //console.log($scope.cus);

        HTTPService.editCustomer(singleCustomer).then(function (res) {
            //console.log(res);

            Materialize.toast('Customer edited successfully !!', 2000);

            $state.go('app.customers');


        }, function (err) {
            //$scope.membership = {};
            Materialize.toast('Customer not edited !!', 2000);
            console.log(err);
        });

    };



});


CRM.controller('StaffCtrl', function ($rootScope, $scope, $state,HTTPService) {

    $scope.stafflist = {};
    HTTPService.getStaff().then(function (res) {
        $scope.stafflist = res.data;
    }, function (err) {
        $scope.stafflist = {};
        console.log(err);
    });

    $scope.staffEdit = function (cid) {
        $state.go('app.editstaff', {
            id: cid
        });
    };

    $scope.staffView = function (cid) {
        $state.go('app.viewstaff', {
            id: cid
        });
    };

    $scope.gotoAdd = function () {
        $state.go('app.addstaff');
    };
});

CRM.controller('AddStaffCtrl', function ($rootScope, $scope, $state, HTTPService, $stateParams) {

    $scope.singleStaff = {
        address1: "",
        address2: "",
        city: "",
        country: "",
        dob: "",
        doj: "",
        email: "",
        fname: "",
        gender: "",
        lname: "",
        mobile: "",
        phone: "",
        pincode: "",
        state: "",
        image: "",
        role: "2",
        user_name: "",
        password: "",
        cpassword:""
    };

   
    $scope.addStaff = function (singleStaff) {
        $scope.staf = {
            address1: singleStaff.address1,
            address2: singleStaff.address2,
            city: singleStaff.city,
            country: singleStaff.country,
            dob: singleStaff.dob,
            doj: singleStaff.doj,
            email: singleStaff.email,
            fname: singleStaff.fname,
            gender: singleStaff.gender,
            lname: singleStaff.lname,
            mobile: singleStaff.mobile,
            phone: singleStaff.phone,
            pincode: singleStaff.pincode,
            state: singleStaff.state,
            image: "",
            role: "2",
            user_name: singleStaff.username,
            password: singleStaff.password
        };

        
        HTTPService.addStaff($scope.staf).then(function (res) {
            Materialize.toast('Staff added successfully !!', 2000);
            $state.go('app.staff');


        }, function (err) {
            Materialize.toast('Staff not added !!', 2000);
            console.log(err);
        });

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
    function ($scope, $compile, $timeout, uiCalendarConfig, ModalService, HTTPService, AuthFactory) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        //$scope.appointmentlist = appointmentObj;
        $scope.userinfo = AuthFactory.getCurrentUser();
        $scope.events = [];
        $scope.switchtotable = function () {
            $("#calandermode").hide();
            $("#tablemode").show();
        };

        $scope.switchtocalander = function () {
            $("#tablemode").hide();
            $("#calandermode").show();
        };

        /* event source that contains custom events on the scope */
        $scope.getAppoinmentList = function () {
            HTTPService.getAppoinment().then(function (res) {
                console.log(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    $scope.events[i] = {
                        start: moment.utc(new Date(res.data[i].app_date + 'T' + res.data[i].app_time)),
                        end: moment.utc(new Date(new Date(res.data[i].app_date + 'T' + res.data[i].app_time).getTime()+30*60000))
                    }
                }
                console.log($scope.events);
            }, function (err) {

            });
        }
        $scope.getAppoinmentList();

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
            callback(events);
        };

        
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            alert(date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
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
            element.fullCalendar('changeView', 'agendaWeek');
            $compile(element)($scope);
        };
        $scope.setAppoinment = function (params, eventData) {
            HTTPService.setAppoinment(params).then(function (res) {
                uiCalendarConfig.calendars['calendar'].fullCalendar('renderEvent', eventData, true);
            }, function (err) {
                console.log(err);
                uiCalendarConfig.calendars['calendar'].fullCalendar('unselect');
            })
        };
        $scope.selectAppoinment = function (start, end) {
            var eventData;
            eventData = {
                title: "sample",
                start: start,
                end: end
            };
            //uiCalendarConfig.calendars['calendar'].fullCalendar('renderEvent', eventData, true);
            //uiCalendarConfig.calendars['calendar'].fullCalendar('unselect');
            ModalService.showModal({
                templateUrl: "template/confirmAppoinment.html",
                controller: "ConfirmAppointmentCtrl"
            }).then(function (modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function (result) {
                    if (result) {
                        if (result.self) {
                            var params = {
                                customer_id: result.customer,
                                user_id: $scope.userinfo.id,
                                app_date: moment.utc(start).format('YYYY-MM-DD'),
                                app_time: moment(start).format('HH:mm:ss'),
                                status: 'open'
                            };
                            $scope.setAppoinment(params, eventData);
                        } else {
                            var params = {
                                customer_id: result.customer,
                                user_id: result.user,
                                app_date: moment.utc(start).format('YYYY-MM-DD'),
                                app_time: moment(start).format('HH:mm:ss'),
                                status: 'open'
                            };
                            $scope.setAppoinment(params, eventData);
                        }
                        
                    } else {
                        uiCalendarConfig.calendars['calendar'].fullCalendar('unselect');
                    }
                });
            });
        };



        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: false,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'agendaWeek,agendaDay'
                },
                eventLimit: true,
                defaultView: 'agendaWeek',
                slotEventOverlap: false,
                selectable: true,
                selectHelper: true,
                select: $scope.selectAppoinment,
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events];
    });

CRM.controller('ApplicationCtrl', function ($rootScope, $scope, $state, AuthFactory) {
    
    $scope.userinfo = AuthFactory.getCurrentUser();
    $scope.isStaff = $scope.userinfo.role != '2' ? true : false;
    console.log($scope.currentUser);
});

CRM.controller('ConfirmAppointmentCtrl', function ($rootScope, $scope, $state, AuthFactory, HTTPService, close) {
    $scope.close = function (result) {
        close(result, 200); 
    };
    $scope.getCustomer = function () {
        HTTPService.getCustomer().then(function (res) {
            $scope.customers = res.data;
        }, function (err) {
            console.log(err);
        });
        
    };
    $scope.getStaff = function () {
        HTTPService.getStaff().then(function (res) {
            $scope.staff = res.data;
        }, function (err) {
            console.log(err);
        });

    };
    $scope.getCustomer();
    $scope.getStaff();
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

CRM.controller('OpencaseCtrl', function ($rootScope, $scope, $state, HTTPService) {
    var x = localStorage.getItem('user_id');
    if ($state.current.name == 'app.allopencase') {
        x = "all";
    }
    $scope.opencaselist = {};
    HTTPService.getopencase(x).then(function (res) {
        $scope.opencaselist = res.data;
    }, function (err) {
        $scope.opencaselist = {};
        console.log(err);
    });

});

CRM.controller('ClosecaseCtrl', function ($rootScope, $scope, $state, HTTPService) {
    var x = localStorage.getItem('user_id');
    if ($state.current.name == 'app.allclosecase') {
        x = "all";
    }
    $scope.closecaselist = {};
    HTTPService.getcloasecase(x).then(function (res) {
        $scope.closecaselist = res.data;
    }, function (err) {
        $scope.closecaselist = {};
        console.log(err);
    });

});

CRM.controller('CustomerlistCtrl', function ($rootScope, $scope, $state, HTTPService) {
    
    $scope.customerlist = {};
    HTTPService.getCustomer().then(function (res) {
        $scope.customerlist = res.data;
    }, function (err) {
        $scope.customerlist = {};
        console.log(err);
    });

    $scope.customerView = function (cid) {
        //$state.go('app.opencase');
        $state.go('app.viewcustomer', {
            id: cid
        });
    };

});

CRM.controller('HotCustomerlistCtrl', function ($rootScope, $scope, $state, HTTPService) {

    $scope.hotcustomerlist = {};
    HTTPService.getCustomer().then(function (res) {
        $scope.hotcustomerlist = res.data;
    }, function (err) {
        $scope.hotcustomerlist = {};
        console.log(err);
    });

    $scope.customerView = function (cid) {
        //$state.go('app.opencase');
        $state.go('app.viewcustomer', {
            id: cid
        });
    };

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
