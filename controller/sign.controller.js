((angular) => {
    // Controller
    Controller.$inject = ['$scope', 'AuthService', '$uiRouterGlobals']; //Dependencies injection
    function Controller($scope, AuthService, $uiRouterGlobals) {
        $scope.mode = $uiRouterGlobals.params.signMode;
        $scope.errors = {email:[], password: []};
        $scope.fields = {
            email: '',
            usn: '',
            pwd: '',
        };

        $scope.sign = () => {
            switch ($scope.mode) {
            case 'login':
                AuthService.signIn(
                    $scope.fields.email,
                    $scope.fields.pwd
                ).catch((err)=>{$scope.errors = err.errors;});
                break;
            case 'register':
                AuthService.register(
                    $scope.fields.usn,
                    $scope.fields.email,
                    $scope.fields.pwd
                ).catch((err)=>{$scope.errors = err.errors;});
                break;
            }
        };
    }

    // Declaration
    angular.module('mock-app').controller('SignController', Controller);
})(window.angular);
