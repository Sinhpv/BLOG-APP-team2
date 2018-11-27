((angular) => {
    //Component's Controller
    componentsCtrl.$inject = ['$scope', 'AuthService', 'ArticlesService']; //Dependencies injection
    function componentsCtrl($scope, AuthService, ArticlesService) {
        $scope.articlesData = {
            articles: [],
            articlesCount: 1,
        };
        $scope.listConfig = {
            type: 'none',
            tagTab: {
                show: false,
                tag: 'programming',
            },
            isLoading: false,
            inProfile: false,
        };
        $scope.updateArticles = (res) => {
            $scope.articlesData.articles = res.articles;
            $scope.articlesData.articlesCount = res.articlesCount;
            $scope.listConfig.isLoading = false;
            console.log('Data updated');
        };

        $scope.changeTab = function(type, tag) {
            $scope.listConfig.isLoading = true;
            $scope.listConfig.type = type;
            $scope.articlesData.articles = [];
            $scope.listConfig.tagTab.show = false;
            switch (type) {
            case 'global':
                ArticlesService.Articles.getArticles()
                    .$promise.then($scope.updateArticles)
                    .catch(() => {
                        console.log('Error when get global');
                    });
                break;
            case 'feed':
                ArticlesService.Articles.getFeedArticles()
                    .$promise.then($scope.updateArticles)
                    .catch(() => {
                        console.log('Error when get feed');
                    });
                break;
            case 'tag':
                if (!tag || tag === '') {
                    console.log('Tag is not valid');
                    return;
                }
                $scope.listConfig.tagTab.show = true;
                $scope.listConfig.tagTab.tag = tag;
                ArticlesService.Articles.getArticles({ tag: tag })
                    .$promise.then($scope.updateArticles)
                    .catch(() => {
                        console.log('Error when get tag');
                    });
                break;
            }
        };

        $scope.toggleLike = (slug, i) => {
            $scope.articlesData.articles[i].isLoading = true;
            if ($scope.articlesData.articles[i].favorited) {
                ArticlesService.Articles.unlikeArticle(
                    { slug: slug },
                    null
                ).$promise.then(({ article: article }) => {
                    $scope.articlesData.articles[i] = article;
                });
            } else {
                ArticlesService.Articles.likeArticle(
                    { slug: slug },
                    null
                ).$promise.then(({ article: article }) => {
                    $scope.articlesData.articles[i] = article;
                });
            }
        };
        this.$onInit = () => {
            $scope.listConfig.tagTab.tag = this.tag;
            $scope.changeTab('global');
        };

        this.$onChanges = (changes) => {
            if (changes.tag) {
                console.log(changes.tag.currentValue);
                $scope.changeTab('tag', changes.tag.currentValue);
            }
        };
    }

    //Component construction
    let components = {
        templateUrl: 'template/articles.template.html',
        controller: componentsCtrl,
        bindings: { isAuth: '<', tag: '<' },
        controllerAs: '$ctrl',
    };

    //Declaration
    angular.module('mock-app').component('articles', components);
})(window.angular);
