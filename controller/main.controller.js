((angular)=>{
    // Controller
    Controller.$inject = ['$scope','isAuth', 'AuthService', '$state']; //Dependencies injection
    function Controller($scope, isAuth, AuthService, $state){
        $scope.isAuth = isAuth;
        $scope.signOut = ()=>{
            AuthService.signOut();
        };
    }

    // Declaration
    angular.module('mock-app').controller('MainController', Controller);

})(window.angular);