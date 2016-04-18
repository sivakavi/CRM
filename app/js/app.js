var CRM = angular.module('CRM', ['ui.router', 'ui.materialize', 'datatables']);
CRM.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "template/login.html",
      controller: 'loginCtrl'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "template/main.html"
    })
    .state('app.dashboard', {
      url: "/dashboard",
      templateUrl: "template/dashboard.html"
    })
    .state('app.customers', {
      url: "/customers",
      templateUrl: "template/customers.html"
    })
    .state('app.staff', {
      url: "/staff",
      templateUrl: "template/staff.html"
    })
    .state('app.appoinment', {
      url: "/appoinment",
      templateUrl: "template/appoinment.html"
    })
    .state('app.case', {
      url: "/case",
      templateUrl: "template/case.html"
    })
    .state('app.profile', {
      url: "/profile",
      templateUrl: "template/profile.html"
    });
});