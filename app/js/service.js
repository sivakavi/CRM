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