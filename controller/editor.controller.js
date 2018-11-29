(() => {
    angular.module('blogApp')
    .controller('ctrlEditorArticle', function(editorService, $scope, $state, $stateParams){
        if(!$scope.article){
            $scope.article = {
                title: '',
                description: '',
                body: '',
                tagList: []
            }
        }else{
            // $scope.article = article;
            console.log("e");
        }
        
        $scope.addTag = function(){
            $scope.article.tagList.push($scope.tag);
        }

        $scope.removeTag = function(tag){
            $scope.article.tagList = $scope.article.tagList.filter((tagg) => tagg != tag)
        }

        $scope.publishArticle = function(){
            $scope.article.tagList.push($scope.tag);
            let data = {
                title: $scope.article.title,
                description: $scope.article.description,
                body: $scope.article.body,
                tagList: $scope.article.tagList
            }
            console.log(data.tagList);
            if ($stateParams.slug == undefined){
                editorService.createArticle(data).then(
                    (success) => {
                        $state.go('article', { slug: success.slug });
                    },
                    (err) => {
                        $scope.errors = err.data.errors;
                    }
                )
            }else{
                editorService.editArticle(data, $stateParams.slug).then(
                    (success) => {
                        $state.go('article', { slug: success.slug });
                    },
                    (err) => {
                        $scope.errors = err.data.errors;
                    }
                )
            }
        }
    })
    
})();



