var CRM = angular.module('CRM', ['ui.router','ui.materialize','gridshore.c3js.chart', 'datatables', 'angular-svg-round-progressbar', 'ui.calendar']);
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
      controller: 'LoginCtrl'
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
      templateUrl: "template/customers.html",
      controller: 'CustomerCtrl'
    })
    .state('app.staff', {
      url: "/staff",
      templateUrl: "template/staff.html"
    })
    .state('app.appoinment', {
      url: "/appoinment",
      templateUrl: "template/appoinment.html",
      controller: 'UiCalendarCtrl'
    })
    .state('app.case', {
      url: "/case",
      templateUrl: "template/case.html"
    })
    .state('app.profile', {
      url: "/profile",
      templateUrl: "template/profile.html"
    }).state('app.manage', {
        url: "/manage",
        templateUrl: "template/manage.html",
        controller: 'ManageCtrl'
    });
});