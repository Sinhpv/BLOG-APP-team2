(() => {
    angular
        .module('mock-app')
        .controller('ctrlEditorArticle', function(
            editorService,
            $scope,
            $state,
            $stateParams,
            article
        ) {
            $scope.article = article;
            if (!$scope.article) {
                $scope.article = {
                    title: '',
                    description: '',
                    body: '',
                    tagList: []
                };
            }
            let tmp = new Set();
            $scope.addTag = function() {
                if ($scope.tagField != undefined){
                    tmp.add($scope.tagField);
                    $scope.article.tagList = [...tmp];
                    $scope.tagField = '';
                }
            };

            $scope.removeTag = function(tag) {
                $scope.article.tagList = $scope.article.tagList.filter((tagg) => tagg != tag)
            };

            $scope.publishArticle = function() {
                // Request body
                let data = {
                    article: {
                        title: $scope.article.title,
                        description: $scope.article.description,
                        body: $scope.article.body,
                        tagList: $scope.article.tagList,
                    },
                };

                // Go to newly created article
                if ($stateParams.slug == undefined) {
                    editorService.createArticle(data).then(
                        ({data:{article:{slug: slug}}}) => {
                            $state.go('article', { slug });
                        },
                        (err) => {
                            $scope.errors = err.data.errors;
                        }
                    );
                // Go to edited article                
                } else {
                    editorService.editArticle(data, $stateParams.slug).then(
                        ({data:{article:{slug: slug}}}) => {
                            $state.go('article', { slug });
                        },
                        (err) => {
                            $scope.errors = err.data.errors;
                        }
                    );
                }
            };
        });
})();
