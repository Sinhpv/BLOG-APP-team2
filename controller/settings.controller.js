((angular) => {
    // Declaration
    angular.module('mock-app').controller('SettingsController', Controller);
    // Controller
    Controller.$inject = ['$scope', 'AuthService', 'user', '$state']; //Dependencies injection
    function Controller($scope, AuthService, user, $state) {
        $scope.user = user;
        $scope.update = ()=>{
            AuthService.updateSettings(user).then(()=>{
                $state.go('profiles',{username: user.username});
            });
        };    
        $scope.signOut = ()=>{
            AuthService.signOut();
        };    
    }
})(window.angular);
