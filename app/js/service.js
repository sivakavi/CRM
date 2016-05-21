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
                        url: domainURL+"todo/"+todo.id,
                        data:todo
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