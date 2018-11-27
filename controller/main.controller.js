((angular)=>{
    // Controller
    Controller.$inject = ['$scope','isAuth', 'AuthService']; //Dependencies injection
    function Controller($scope, isAuth, AuthService){
        $scope.isAuth = isAuth;
        $scope.signOut = ()=>{
            AuthService.signOut();
        };
    }

    // Declaration
    angular.module('mock-app').controller('MainController', Controller);

})(window.angular);