var CRM = angular.module('CRM', ['ui.router', 'ui.materialize', 'gridshore.c3js.chart', 'datatables', 'angular-svg-round-progressbar', 'ui.calendar', '720kb.datepicker', 'angularModalService']);
CRM.config(function ($stateProvider, $urlRouterProvider) {
    var authenticated = ['$q', 'AuthFactory', function ($q, AuthFactory) {
        var deferred = $q.defer();
        AuthFactory.isLoggedIn()
            .then(function (isLoggedIn) {
                if (isLoggedIn) {
                    deferred.resolve();
                } else {
                    deferred.reject('Not logged in');
                }
            });
        return deferred.promise;
    }];
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "template/login.html",
      controller: 'LoginCtrl',
      pageTitle: 'Login'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "template/main.html",
      controller: 'MainCtrl'
    })
    .state('app.gmail', {
      url: "/gmailinfo",
      templateUrl: "template/gmaildetails.html",
      controller: 'GmailCtrl',
      pageTitle: 'Your Gmail details'
    })
    .state('app.dashboard', {
      url: "/dashboard",
      templateUrl: "template/dashboard.html",
      controller: 'GraphCtrl',
      pageTitle: 'Dashboard',
      resolve: {
          authenticated: authenticated
      }
    })
    .state('app.customers', {
      url: "/customers",
      templateUrl: "template/customers.html",
      controller: 'CustomerCtrl',
      pageTitle: 'Customers List',
      resolve: {
          authenticated: authenticated
      }
    })
      .state('app.viewcustomer', {
          url: "/customer/:id",
          templateUrl: "template/viewcustomer.html",
          controller: 'ViewCustomerCtrl',
          pageTitle: 'View Customer',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.editcustomer', {
          url: "/editcustomer/:id",
          templateUrl: "template/editcustomer.html",
          controller: 'EditCustomerCtrl',
          pageTitle: 'Edit Customer',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.addcustomer', {
          url: "/addcustomer",
          templateUrl: "template/addcustomer.html",
          controller: 'AddCustomerCtrl',
          pageTitle: 'Add Customer',
          resolve: {
              authenticated: authenticated
          }
      })
    .state('app.staff', {
      url: "/staff",
      templateUrl: "template/staff.html",
      controller: 'StaffCtrl',
      pageTitle: 'Staff List',
      resolve: {
          authenticated: authenticated
      }
    })
      .state('app.addstaff', {
          url: "/addstaff",
          templateUrl: "template/addstaff.html",
          controller: 'AddStaffCtrl',
          pageTitle: 'Add Staff',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.editstaff', {
          url: "/editstaff/:id",
          templateUrl: "template/editstaff.html",
          controller: 'EditStaffCtrl',
          pageTitle: 'Edit Staff',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.viewstaff', {
          url: "/staff/:id",
          templateUrl: "template/viewstaff.html",
          controller: 'ViewStaffCtrl',
          pageTitle: 'View Staff',
          resolve: {
              authenticated: authenticated
          }
      })
    .state('app.appoinment', {
      url: "/appoinment",
      templateUrl: "template/appoinment.html",
      controller: 'UiCalendarCtrl',
      pageTitle: 'Appointment',
      resolve: {
          authenticated: authenticated
      }
    })
    .state('app.case', {
        url: "/case",
        abstract: true,
        templateUrl: "template/case.html",
        controller: 'CaseCtrl',
      
    })
      .state('app.case.livecaselist', {
          url: "/case/livecaselist",
          pageTitle: 'Live Case List',
          views: {
              'caseTables': {
                  templateUrl: "template/livecaselist.html",
                  controller: 'LiveCaseCtrl'
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
      .state('app.case.liveticketlist', {
          url: "/case/liveticketlist",
          pageTitle: 'Live Ticket List',
          views: {
              'caseTables': {
                  templateUrl: "template/liveticketlist.html",
                  controller: 'LiveTicketCtrl'
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
      .state('app.case.pastcaselist', {
          url: "/case/pastcaselist",
          pageTitle: 'Past Case List',
          views: {
              'caseTables': {
                  templateUrl: "template/pastcaselist.html",
                  controller: 'PastCaseCtrl'
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
      .state('app.case.pastticketlist', {
          url: "/case/pastticketlist",
          pageTitle: 'Past Ticket List',
          views: {
              'caseTables': {
                  templateUrl: "template/pastticketlist.html",
                  controller: 'PastTicketCtrl'
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
      .state('app.case.addcase', {
          url: "/case/addcase",
          pageTitle: 'Add Case',
          views: {
              'caseTables': {
                  templateUrl: "template/addopencase.html",
                  controller: 'AddCaseCtrl'
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
      .state('app.case.addticket', {
          url: "/case/addticket",
          pageTitle: 'Add Ticket',
          views: {
              'caseTables': {
                  templateUrl: "template/addopenticket.html",
                  controller: 'AddTicketCtrl'
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
    
      .state('app.product', {
          url: "/product",
          templateUrl: "template/product.html",
          controller: 'ProductCtrl',
          resolve: {
              authenticated: authenticated
          }
      })
    .state('app.addproduct', {
        url: "/addproduct",
        templateUrl: "template/addproduct.html",
        controller: 'ProductCtrl',
        resolve: {
            authenticated: authenticated
        }
    })
    .state('app.editproduct', {
        url: "/editproduct",
        templateUrl: "template/editproduct.html",
        controller: 'ProductCtrl',
        resolve: {
            authenticated: authenticated
        }
    })
    .state('app.profile', {
      url: "/profile",
      templateUrl: "template/profile.html",
      controller: 'ProfileCtrl',
      pageTitle: 'Profile Page',
      resolve: {
          authenticated: authenticated
      }
    })
      .state('app.editprofile', {
          url: "/editprofile/:id",
          templateUrl: "template/edituserprofile.html",
          controller: 'EditProfileCtrl',
          pageTitle: 'Profile Edit',
          resolve: {
              authenticated: authenticated
          }
      })
    .state('app.changepassword', {
        url: "/changepassword",
        templateUrl: "template/changepassword.html",
        controller: 'StaffCtrl'
    })
      .state('app.opencase', {
          url: "/opencase",
          templateUrl: "template/opencase.html",
          controller: 'OpencaseCtrl',
          pageTitle: 'Open Case List',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.closecase', {
          url: "/closecase",
          templateUrl: "template/closecase.html",
          controller: 'ClosecaseCtrl',
          pageTitle: 'Close Case List',
          resolve: {
              authenticated: authenticated
          }
      })

      .state('app.allopencase', {
          url: "/opencase",
          templateUrl: "template/opencase.html",
          controller: 'OpencaseCtrl',
          pageTitle: 'Open Case List',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.allclosecase', {
          url: "/closecase",
          templateUrl: "template/closecase.html",
          controller: 'ClosecaseCtrl',
          pageTitle: 'Close Case List',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.customerlist', {
          url: "/customerlist",
          templateUrl: "template/customerlist.html",
          controller: 'CustomerlistCtrl',
          pageTitle: 'Customers List',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.hotcustomerlist', {
          url: "/hotcustomerlist",
          templateUrl: "template/hotcustomerlist.html",
          controller: 'HotCustomerlistCtrl',
          pageTitle: 'Hot Customers List',
          resolve: {
              authenticated: authenticated
          }
      })

    .state('app.manage', {
        url: "/manage",
        templateUrl: "template/manage.html",
        controller: 'ManageCtrl',
        pageTitle: 'Manage Setting',
        resolve: {
            authenticated: authenticated
        }
    });
}).run(['$rootScope', '$http', '$state', '$stateParams', function ($rootScope, $http, $state, $stateParams) {
    
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            $rootScope.pageTitle = toState.pageTitle;
            // transitionTo() promise will be rejected with
            // a 'transition prevented' error
            if(toState.name == 'app.gmail') {
                $rootScope.isGmailPage = true;
            }
        })
    $rootScope.isLoading = function () {
        //console.log($http.pendingRequests.length !== 0);
        return $http.pendingRequests.length !== 0;
        //return true;
    };
}]);