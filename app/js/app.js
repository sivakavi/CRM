var CRM = angular.module('CRM', ['ui.router']);
CRM.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "template/login.html"
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
    .state('list', {
      url: "/list",
      templateUrl: "template/dashboard.html"
    });
});