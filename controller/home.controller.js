((angular)=>{
    // Controller
    Controller.$inject = ['$scope', 'isAuth', 'ArticlesService']; //Dependencies injection
    function Controller($scope, isAuth, ArticlesService){
        $scope.isAuth = isAuth;
        $scope.tag = '';
        $scope.changeTag = (val)=>{
            $scope.tag = new String(val);
        };
        $scope.tags = [];
        ArticlesService.Articles.getAllTags().$promise.then(({tags: tags})=>{
            $scope.tags = tags;
        });
    }

    // Declaration
    angular.module('mock-app').controller('HomeController', Controller);

})(window.angular);