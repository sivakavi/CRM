// Service list

// Get service for recent activities 
// $http.get("welcome.htm")
//     .then(function(response) {
//         $scope.myWelcome = response.data;
//     }, function(error){
        
//     });


CRM.service('loginService', function($http){
   this.login = function(credentials) {
      return $http({
                        method: "post",
                        url: domainURL+"login",
                        data: credentials
                    });
   }
});


CRM.service('HTTPService', function($http){

	// Todo api services 
   this.addTodo = function(todo) {
      return $http({
                        method: "post",
                        url: domainURL+"todo",
                        data: todo
                    });
   }

   this.getTodoUser = function (uid) {
      return $http({
                        method: "get",
                        url: domainURL + "getUserTodo/" + uid
                    });
   }

   this.getSingleTodo = function(id) {
      return $http({
                        method: "get",
                        url: domainURL+"todo/"+id
                    });
   }

   this.editTodo = function(todo) {
      return $http({
                        method: "post",
                        url: domainURL+"todo/edit/"+todo.id,
                        data:todo
                    });
   }


   //Product Category Services
   this.addProductCategory = function(category) {
      return $http({
                        method: "post",
                        url: domainURL+"category",
                        data: category
                    });
   }

   this.getProductCategory = function() {
      return $http({
                        method: "get",
                        url: domainURL+"category"
                    });
   }

   this.getSingleProductCategory = function(id) {
      return $http({
                        method: "get",
                        url: domainURL+"category/"+id
                    });
   }

   this.editProductCategory = function(category) {
      return $http({
                        method: "post",
                        url: domainURL+"category/edit/"+category.id,
                        data:category
                    });
   }


   //Membership services
   this.addMembership = function(membership) {
      return $http({
                        method: "post",
                        url: domainURL+"membership",
                        data: membership
                    });
   }

   this.getMembership = function() {
      return $http({
                        method: "get",
                        url: domainURL+"membership"
                    });
   }

   this.getSingleMembership = function(id) {
      return $http({
                        method: "get",
                        url: domainURL+"membership/"+id
                    });
   }

   this.editMembership = function(membership) {
      return $http({
                        method: "post",
                        url: domainURL+"membership/edit/"+membership.id,
                        data:membership
                    });
   }
    
   this.getAppoinment = function () {
       return $http({
           method: "get",
           url: domainURL + "appoinment"
       });
   }

   this.getAppoinmentUser = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "getAppoinmentUser/"+uid
       });
   }

   this.getAppoinmentUserOpen = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "getAppoinmentUserOpen/" + uid
       });
   }

   this.getAppoinmentUserUpcoming = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "getAppoinmentUserUpcoming/" + uid
       });
   }

   this.getAppoinmentUserClose = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "getAppoinmentUserClose/" + uid
       });
   }

   this.getSingleAppoinment = function (aid) {
       return $http({
           method: "get",
           url: domainURL + "appoinment/" + aid
       });
   }

   this.getSingleTicket = function (tid) {
       return $http({
           method: "get",
           url: domainURL + "ticket/" + tid
       });
   }

   this.getSingleCase = function (cid) {
       return $http({
           method: "get",
           url: domainURL + "case/" + cid
       });
   }
    
   this.setAppoinment = function (params) {
       return $http({
           method: "post",
           url: domainURL + "appoinment",
           data: params
       });
   }

   this.changeStatusAppoinment = function (id,status) {
       return $http({
           method: "post",
           url: domainURL + "appoinment/edit/"+id,
           data: {
               status:status
           }
       });
   }

   this.changeStatusCase = function (id,pid,qty,status) {
    
      return $http({
           method: "post",
           url: domainURL + "case/edit/"+id,
           data: {
               status:status,
               product_id:pid,
               qty:qty
           }
       });
   }

   
   this.changeStatusTicket = function (id,status) {
       return $http({
           method: "post",
           url: domainURL + "ticket/edit/"+id,
           data: {
               status:status
           }
       });
   }

   this.addCase = function (params) {

       var x = localStorage.getItem('user_id');

       params.status="open";
       params.user_id=x;

       return $http({
           method: "post",
           url: domainURL + "case",
           data: params
       });
   }
   this.getopencase = function (uid) {

       var url = "";
       if (uid == "all") {
           url = domainURL + "getOpenCase";
       } else {
           url = domainURL + "getOpenCaseUser/"+uid;
       } 

       return $http({
           method: "get",
           url: url
       });
   }

   this.addTicket = function (params) {

       var x = localStorage.getItem('user_id');
       params.status="open";
       params.user_id=x;

       return $http({
           method: "post",
           url: domainURL + "ticket",
           data: params
       });
   }
   this.getOpenTicket = function (uid) {

       var url = "";
       if (uid == "all") {
           url = domainURL + "getOpenTicket";
       } else {
           url = domainURL + "getOpenTicketUser/" + uid;
       }

       return $http({
           method: "get",
           url: url
       });
   }

   this.getCloseTicket = function (uid) {

       var url = "";
       if (uid == "all") {
           url = domainURL + "getCloseTicket";
       } else {
           url = domainURL + "getCloseTicketUser/" + uid;
       }

       return $http({
           method: "get",
           url: url
       });
   }

   this.getCancelCloseTicket = function (uid) {

       var url = "";
       url = domainURL + "getCancelCloseTicketUser/" + uid;
       return $http({
           method: "get",
           url: url
       });
   }

   this.getcloasecase = function (uid) {

       var url = "";
       if (uid == "all") {
           url = domainURL + "getCloseCase";
       } else {
           url = domainURL + "getCloseCaseUser/" + uid;
       }

       return $http({
           method: "get",
           url: url
       });
   }

   this.getcancelcloasecase = function (uid) {

       var url = "";
       url = domainURL + "getCancelCloseCaseUser/" + uid;
       return $http({
           method: "get",
           url: url
       });
   }

   this.getCustomer = function () {
       return $http({
           method: "get",
           url: domainURL + "customer"
       });
   }

   this.getLowProductList = function (qty) {
       return $http({
           method: "get",
           url: domainURL + "lessQty/"+qty
       });
   }

   this.getSingleCustomer = function (cid) {
       return $http({
           method: "get",
           url: domainURL + "customer/"+cid
       });
   }

   this.getHotCustomer = function () {
       return $http({
           method: "get",
           url: domainURL + "hotcustomer"
       });
   }

   this.getStaff = function () {
       return $http({
           method: "get",
           url: domainURL + "user"
       });
   }

   this.addCustomer = function (params) {
       return $http({
           method: "post",
           url: domainURL + "customer",
           data: params
       });
   }

   this.editCustomer = function (params) {
       return $http({
           method: "post",
           url: domainURL + "customer/edit/"+params.id,
           data: params
       });
   }

   this.addStaff = function (params) {
       return $http({
           method: "post",
           url: domainURL + "user",
           data: params
       });
   }

   this.editStaff = function (params) {
       return $http({
           method: "post",
           url: domainURL + "user/edit/" + params.id,
           data: params
       });
   }

   this.getSingleUser = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "user/" + uid
       });
   }

   this.getNotification = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "notification/" + uid
       });
   }

   this.getProduct = function () {
       return $http({
           method: "get",
           url: domainURL + "product"
       });
   }

   this.addProduct = function (params) {
       return $http({
           method: "post",
           url: domainURL + "product",
           data: params
       });
   }


   this.changeProductQty = function (id,qty) {
       return $http({
           method: "post",
           url: domainURL + "product/edit/"+id,
           data: {
               qty:qty
           }
       });
   }


   this.getFullReport = function () {
       return $http({
           method: "get",
           url: domainURL + "report"
       });
   }

   this.getReportYear = function (year) {
       return $http({
           method: "get",
           url: domainURL + "getReportYear/"+year
       });
   }

   this.getReportYearMonth = function (year,month) {
       return $http({
           method: "get",
           url: domainURL + "getReportYearMonth/"+year+"/"+month
       });
   }

   this.getReportProduct = function (pid) {
       return $http({
           method: "get",
           url: domainURL + "getReportProduct/"+pid
       });
   }

   this.getReportProductYear = function (pid,year) {
       return $http({
           method: "get",
           url: domainURL + "getReportProductYear/"+pid+"/"+year
       });
   }

   this.getReportProductYearMonth = function (pid,year,month) {
       return $http({
           method: "get",
           url: domainURL + "getReportProductYearMonth/"+pid+"/"+year+"/"+month
       });
   }

   this.getReportUser = function (uid) {
       return $http({
           method: "get",
           url: domainURL + "getReportUser/"+uid
       });
   }

   this.getReportUserYear = function (uid,year) {
       return $http({
           method: "get",
           url: domainURL + "getReportUserYear/"+uid+"/"+year
       });
   }

   this.getReportUserYearMonth = function (uid,year,month) {
       return $http({
           method: "get",
           url: domainURL + "getReportUserYearMonth/"+uid+"/"+year+"/"+month
       });
   }
   

});

CRM.factory('AuthFactory', ['$q', '$rootScope', '$http', '$state',
        function ($q, $rootScope, $http, $state) {
            var currentUser = '';
            var factory = {
                isLoggedIn: isLoggedIn,
                getCurrentUser: getUserInfo
            };
            
            var defer = $q.defer();
            function isLoggedIn() {
                var user_id = localStorage.getItem('user_id');
                if(user_id) {
                    var url = window.domainURL + 'user/' + user_id;
                    return $http.get(url).success(function (res) {
                        console.log(res);
                        currentUser = res;
                    }).error(function (err) {
                        $state.go('login');
                        // if(err.status == 401) {
                        //     $state.go('login');
                        // }
                    });
                } else {
                    defer.resolve(false);
                    $state.go('login');
                    return defer.promise;
                }
            };

            function getUserInfo() {
                return currentUser;
            };
            return factory;
        }]);




