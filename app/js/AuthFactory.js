angular.module('CRM')
    .factory('AuthFactory', ['$q', '$rootScope', '$http', '$state',
        function ($q, $rootScope, $http, $state) {

            var factory = {
                isLoggedIn: isLoggedIn
            };

            function isLoggedIn() {
                return $http.get(window.domainURL + 'user/'+localStorage.getItem(user_id)).success(function (res) {
                }).error(function (err) {
                    $state.go('login');
                    // if(err.status == 401) {
                    //     $state.go('login');
                    // }
                });
            };
            return factory;
        }]);