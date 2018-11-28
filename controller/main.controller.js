((angular)=>{
    // Controller
    Controller.$inject = ['$scope','isAuth', 'user', 'AuthService', '$state']; //Dependencies injection
    function Controller($scope, isAuth, user, AuthService, $state){
        $scope.isAuth = isAuth;
        $scope.signOut = ()=>{
            AuthService.signOut();
        };
        $scope.user = user;
    }

    // Declaration
    angular.module('mock-app').controller('MainController', Controller);

})(window.angular);