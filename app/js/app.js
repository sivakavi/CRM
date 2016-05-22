var CRM = angular.module('CRM', ['ui.router', 'ui.materialize', 'gridshore.c3js.chart', 'datatables', 'angular-svg-round-progressbar', 'ui.calendar', '720kb.datepicker']);
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
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "template/main.html",
      controller: 'MainCtrl'
    })
    .state('app.dashboard', {
      url: "/dashboard",
      templateUrl: "template/dashboard.html",
      controller: 'GraphCtrl',
      resolve: {
          authenticated: authenticated
      }
    })
    .state('app.customers', {
      url: "/customers",
      templateUrl: "template/customers.html",
      controller: 'CustomerCtrl',
      resolve: {
          authenticated: authenticated
      }
    })
      .state('app.viewcustomer', {
          url: "/customer/:id",
          templateUrl: "template/viewcustomer.html",
          controller: 'ViewCustomerCtrl',
          resolve: {
              authenticated: authenticated
          }
      })
    .state('app.staff', {
      url: "/staff",
      templateUrl: "template/staff.html",
      controller: 'StaffCtrl',
      resolve: {
          authenticated: authenticated
      }
    })
    .state('app.appoinment', {
      url: "/appoinment",
      templateUrl: "template/appoinment.html",
      controller: 'UiCalendarCtrl',
      resolve: {
          authenticated: authenticated
      }
    })
    .state('app.case', {
        url: "/case",
        abstract: true,
        templateUrl: "template/case.html"
      
    })
      .state('app.case.list', {
          url: "/case/list",
          views: {
              'caseTables': {
                  templateUrl: "template/case-list.html"
              }
          },
          resolve: {
              authenticated: authenticated
          }

      })
    .state('app.addcase', {
        url: "/addcase",
        templateUrl: "template/addcase.html",
        controller: 'CaseCtrl',
        resolve: {
            authenticated: authenticated
        }
    })
    .state('app.editcase', {
        url: "/editcase",
        templateUrl: "template/editcase.html",
        controller: 'CaseCtrl'
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
      controller: 'StaffCtrl',
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
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.closecase', {
          url: "/closecase",
          templateUrl: "template/closecase.html",
          controller: 'ClosecaseCtrl',
          resolve: {
              authenticated: authenticated
          }
      })

      .state('app.allopencase', {
          url: "/opencase",
          templateUrl: "template/opencase.html",
          controller: 'OpencaseCtrl',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.allclosecase', {
          url: "/closecase",
          templateUrl: "template/closecase.html",
          controller: 'ClosecaseCtrl',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.customerlist', {
          url: "/customerlist",
          templateUrl: "template/customerlist.html",
          controller: 'CustomerlistCtrl',
          resolve: {
              authenticated: authenticated
          }
      })
      .state('app.hotcustomerlist', {
          url: "/hotcustomerlist",
          templateUrl: "template/hotcustomerlist.html",
          controller: 'HotCustomerlistCtrl',
          resolve: {
              authenticated: authenticated
          }
      })

    .state('app.manage', {
        url: "/manage",
        templateUrl: "template/manage.html",
        controller: 'ManageCtrl',
        resolve: {
            authenticated: authenticated
        }
    });
}).run(['$rootScope', '$http', '$state', '$stateParams', function ($rootScope, $http, $state, $stateParams) {
    $rootScope.isLoading = function () {
        console.log($http.pendingRequests.length !== 0);
        return $http.pendingRequests.length !== 0;
        //return true;
    };
}]);