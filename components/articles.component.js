((angular) => {
    //Component's Controller
    componentsCtrl.$inject = ['$scope', '$state', 'ArticlesService']; //Dependencies injection
    function componentsCtrl($scope, $state, ArticlesService) {
        $scope.articlesData = {
            articles: [],
            articlesCount: 1,
            currentPage: 1,
            totalPage: 0,
        };
        $scope.listConfig = {
            type: 'none',
            tagTab: {
                show: false,
                tag: '',
            },
            isLoading: false,
            inProfile: false,
            usn: '',
        };
        $scope.updateArticles = ({ articles: atc, articlesCount: num }) => {
            $scope.listConfig.isLoading = false;
            $scope.articlesData = {
                articles: atc,
                articlesCount: num,
                totalPage: Math.floor(num / 20),
                currentPage: $scope.articlesData.currentPage,
            };
        };

        $scope.changeTab = function(type, tag) {
            $scope.listConfig.isLoading = true;
            $scope.listConfig.tagTab.show = false;
            let offset = ($scope.articlesData.currentPage - 1) * 20;

            if (
                $scope.listConfig.type !== type ||
                $scope.listConfig.tagTab.tag !== tag
            ) {
                $scope.listConfig.type = type;
                $scope.articlesData = {
                    articles: [],
                    articlesCount: 1,
                    currentPage: 1,
                    totalPage: 0,
                };
            }

            switch (type) {
            case 'global':
                ArticlesService.Articles.getArticles({
                    offset,
                }).$promise.then($scope.updateArticles);
                break;
            case 'feed':
                ArticlesService.Articles.getFeedArticles({
                    offset,
                }).$promise.then($scope.updateArticles);
                break;
            case 'owned':
                ArticlesService.Articles.getArticles({
                    author: $scope.listConfig.usn,
                    offset,
                }).$promise.then($scope.updateArticles);
                break;
            case 'fav':
                ArticlesService.Articles.getArticles({
                    favorited: $scope.listConfig.usn,
                    offset,
                }).$promise.then($scope.updateArticles);
                break;
            case 'tag':
                if (!tag) {
                    return;
                }
                $scope.listConfig.tagTab.show = true;
                $scope.listConfig.tagTab.tag = tag;
                ArticlesService.Articles.getArticles({
                    tag,
                    offset,
                }).$promise.then($scope.updateArticles);
            }
        };

        $scope.toggleLike = (slug, i) => {
            if (!this.isAuth) {
                $state.go('sign', { signMode: 'login' });
                return;
            }
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

        $scope.changePage = (num) => {
            $scope.articlesData.currentPage = num;
            $scope.changeTab(
                $scope.listConfig.type,
                $scope.listConfig.tagTab.tag
            );
        };

        this.$onInit = () => {
            if (this.usn) {
                $scope.listConfig.usn = this.usn;
                $scope.listConfig.inProfile = true;
                $scope.changeTab('owned');
            } else if (this.isAuth) {
                $scope.changeTab('feed');
            } else{
                $scope.changeTab('global');
            }
        };

        this.$onChanges = function({ tag }) {
            if (tag) {
                $scope.listConfig.tagTab.tag = tag;
                $scope.changeTab('tag', tag.currentValue);
            }
        };
    }

    //Component construction
    let components = {
        templateUrl: 'template/articles.template.html',
        controller: componentsCtrl,
        bindings: { isAuth: '<', tag: '<', usn: '<' },
        controllerAs: '$ctrl',
    };

    //Declaration
    angular.module('mock-app').component('articles', components);
})(window.angular);
