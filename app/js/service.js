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

   this.getTodo = function() {
      return $http({
                        method: "get",
                        url: domainURL+"todo"
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
    
   this.setAppoinment = function (params) {
       return $http({
           method: "post",
           url: domainURL + "appoinment",
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

   this.getCustomer = function () {
       return $http({
           method: "get",
           url: domainURL + "customer"
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