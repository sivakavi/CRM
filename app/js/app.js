var CRM = angular.module('CRM', ['ui.router', 'ui.materialize', 'gridshore.c3js.chart', 'datatables', 'angular-svg-round-progressbar', 'ui.calendar', '720kb.datepicker']);
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
      templateUrl: "template/main.html",
      controller: 'MainCtrl'
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
      templateUrl: "template/staff.html",
      controller: 'StaffCtrl'
    })
    .state('app.appoinment', {
      url: "/appoinment",
      templateUrl: "template/appoinment.html",
      controller: 'UiCalendarCtrl'
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
          }

      })
    .state('app.addcase', {
        url: "/addcase",
        templateUrl: "template/addcase.html",
        controller: 'CaseCtrl'
    })
    .state('app.editcase', {
        url: "/editcase",
        templateUrl: "template/editcase.html",
        controller: 'CaseCtrl'
    })
      .state('app.product', {
          url: "/product",
          templateUrl: "template/product.html",
          controller: 'ProductCtrl'
      })
    .state('app.addproduct', {
        url: "/addproduct",
        templateUrl: "template/addproduct.html",
        controller: 'ProductCtrl'
    })
    .state('app.editproduct', {
        url: "/editproduct",
        templateUrl: "template/editproduct.html",
        controller: 'ProductCtrl'
    })
    .state('app.profile', {
      url: "/profile",
      templateUrl: "template/profile.html",
      controller: 'StaffCtrl'
    })
    .state('app.changepassword', {
        url: "/changepassword",
        templateUrl: "template/changepassword.html",
        controller: 'StaffCtrl'
    })
    .state('app.manage', {
        url: "/manage",
        templateUrl: "template/manage.html",
        controller: 'ManageCtrl'
    });
});