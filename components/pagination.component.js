((angular)=>{
    //Component's Controller
    function componentsCtrl($scope){
        $scope.list = [];

        this.$onInit = ()=>{

        };

        this.$onChanges = ({totalPages: tp})=>{
            // console.dir(changes);
            if (tp) {
                $scope.pageRange(tp.currentValue);                
            }
        };

        $scope.pageRange = function(num){
            $scope.list = new Array(num);
        };
    }
    //Component construction
    let components = {
        bindings: {changePage: '<', currentPage: '<', totalPages: '<'},
        templateUrl: 'template/pagination.template.html',
        controller: componentsCtrl,
        controllerAs: '$ctrl',
    };

    //Declaration
    angular.module('mock-app').component('pagination', components);

})(window.angular);