((angular)=>{
    // Controller
    Controller.$inject = ['$scope','isAuth', 'user', 'AuthService']; //Dependencies injection
    function Controller($scope, isAuth, user, AuthService){
        $scope.isAuth = isAuth;
        $scope.signOut = ()=>{
            AuthService.signOut();
        };
        $scope.user = user;
    }

    // Declaration
    angular.module('mock-app').controller('MainController', Controller);

})(window.angular);