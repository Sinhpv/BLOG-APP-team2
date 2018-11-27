((angular)=>{
    // Controller
    Controller.$inject = ['$scope', 'isAuth']; //Dependencies injection
    function Controller($scope, isAuth){
        $scope.isAuth = isAuth;
        $scope.tag = '';
        $scope.changeTag = (val)=>{
            $scope.tag = new String(val);
            console.log('Tag changed to '+ val);
            
        };
    }

    // Declaration
    angular.module('mock-app').controller('HomeController', Controller);

})(window.angular);