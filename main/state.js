((angular) => {
    'use strict';
    angular
        .module('stateModule', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider) {
            let authState = {
                    name: 'auth',
                    abstract: true,
                    resolve: {
                        isAuth: function(
                            AuthService,
                            ArticlesService,
                            profileService,
                            appService,
                            editorService
                        ) {
                            ArticlesService.resetHeader();
                            profileService.resetHeader();
                            appService.resetHeader();
                            editorService.resetHeader();
                            return AuthService.checkAuth();
                        },
                        user: function(AuthService) {
                            return AuthService.getUserInfo().catch(() => {
                                return { username: '' };
                            });
                        },
                    },
                    templateUrl: 'template/app.template.html',
                    controller: 'MainController',
                    controllerAs: '$ctrl',
                },
                homeState = {
                    name: 'home',
                    parent: 'auth',
                    url: '/home',
                    templateUrl: '/template/home.template.html',
                    controller: 'HomeController',
                },
                signState = {
                    name: 'sign',
                    parent: 'auth',
                    url: '/{signMode}',
                    templateUrl: 'template/sign.template.html',
                    controller: 'SignController',
                },
                profilesState = {
                    name: 'profiles',
                    url: '/@:username',
                    parent: 'auth',
                    templateUrl: 'template/profile.html',
                    controller: 'ctrlProfile',
                    resolve: {
                        profile: function(profileService, $stateParams) {
                            return profileService
                                .getProfile($stateParams.username)
                                .then((user) => user.data.profile);
                        },
                    },
                },
                articleState = {
                    name: 'article',
                    url: '/article/:slug',
                    parent: 'auth',
                    templateUrl: 'template/article.template.html',
                    controller: function(
                        appService,
                        $scope,
                        isAuth,
                        user,
                        $stateParams,
                        $state
                    ) {
                        $scope.slug = $stateParams.slug;
                        $scope.isAuth = isAuth;
                        let username = user.username;

                        $scope.toSignup = function() {
                            $state.go('sign', { signMode: 'login' });
                        };

                        function getCommen() {
                            appService
                                .getComments($scope.slug)
                                .then((comments) => {
                                    $scope.comments = comments.data.comments;
                                    $scope.comments.map((comment) => {
                                        if (
                                            comment.author.username === username
                                        ) {
                                            return (comment.isMyComment = true);
                                        }
                                    });
                                });
                        }
                        if (isAuth) {
                            appService.getArticle($scope.slug).then((user) => {
                                $scope.article = user.data.article;
                                $scope.username =
                                    $scope.article.author.username;

                                if (username === $scope.username) {
                                    $scope.isMyArt = true;
                                    $scope.deleteArticle = function() {
                                        appService
                                            .deleteArticle($scope.slug)
                                            .then(() => {
                                                $state.go('profiles', {
                                                    username: $scope.username,
                                                });
                                            });
                                    };
                                }

                                $scope.isFavorite = !user.data.article
                                    .favorited;
                                $scope.favoriteCount =
                                    user.data.article.favoritesCount;

                                appService
                                    .getProfile($scope.username)
                                    .then((user) => {
                                        $scope.isFollow = !user.data.profile
                                            .following;
                                    });

                                $scope.changeFollow = function() {
                                    appService
                                        .getProfile($scope.username)
                                        .then((user) => {
                                            if (user.data.profile.following) {
                                                appService
                                                    .unFollow(
                                                        user.data.profile
                                                            .username
                                                    )
                                                    .then((profile) => {
                                                        $scope.isFollow = !profile
                                                            .data.profile
                                                            .following;
                                                    });
                                            } else {
                                                appService
                                                    .follow(
                                                        user.data.profile
                                                            .username
                                                    )
                                                    .then((profile) => {
                                                        $scope.isFollow = !profile
                                                            .data.profile
                                                            .following;
                                                    });
                                            }
                                        });
                                };

                                $scope.changeFavorite = function() {
                                    appService
                                        .getArticle($scope.slug)
                                        .then((user) => {
                                            if (user.data.article.favorited) {
                                                appService
                                                    .unFavorite($scope.slug)
                                                    .then((favo) => {
                                                        $scope.favoriteCount--;
                                                        $scope.isFavorite = !favo
                                                            .data.article
                                                            .favorited;
                                                    });
                                            } else {
                                                appService
                                                    .favorite($scope.slug)
                                                    .then((favo) => {
                                                        $scope.favoriteCount++;
                                                        $scope.isFavorite = !favo
                                                            .data.article
                                                            .favorited;
                                                    });
                                            }
                                        });
                                };

                                $scope.comment = function() {
                                    appService
                                        .comment($scope.slug, $scope.myComment)
                                        .then(() => {
                                            $scope.myComment = '';
                                            getCommen();
                                        });
                                };
                            });

                            appService
                                .getComments($scope.slug)
                                .then((comments) => {
                                    $scope.comments = comments.data.comments;
                                    $scope.comments.map((comment) => {
                                        if (
                                            comment.author.username === 'JQKA2'
                                        ) {
                                            return (comment.isMyComment = true);
                                        }
                                    });
                                    $scope.deleteComment = function(id) {
                                        appService
                                            .deleteComment($scope.slug, id)
                                            .then(() => {
                                                getCommen();
                                            });
                                    };
                                });
                        } else {
                            appService
                                .getArticleNoToken($scope.slug)
                                .then((user) => {
                                    $scope.article = user.data.article;
                                    $scope.username =
                                        $scope.article.author.username;
                                    $scope.favoriteCount =
                                        user.data.article.favoritesCount;
                                });

                            appService
                                .getComments($scope.slug)
                                .then((comments) => {
                                    $scope.comments = comments.data.comments;
                                });
                        }
                    },
                },
                settingsState = {
                    name: 'settings',
                    url: '/settings',
                    parent: 'auth',
                    controller: 'SettingsController',
                    templateUrl: 'template/setting.template.html'
                };

            $stateProvider
                .state(authState)
                .state(homeState)
                .state(signState)
                .state(profilesState)
                .state(articleState)
                .state(settingsState);

            // Dinh
            var arrState = [
                {
                    name: 'create',
                    parent: 'auth',
                    url: '/editor',
                    templateUrl: 'template/new.article.html',
                    controller: 'ctrlEditorArticle',
                },
                {
                    name: 'editor',
                    parent: 'auth',
                    url: '/editor/:slug',
                    templateUrl: 'template/new.article.html',
                    controller: 'ctrlEditorArticle',
                    resolve: {
                        article: function(ArticlesService, $stateParams) {
                            return ArticlesService.Articles.getAnArticle(
                                {slug:$stateParams.slug}
                            ).$promise.then(({article}) => article);
                        },
                    },
                },
            ];
            arrState.forEach(function(state) {
                $stateProvider.state(state);
            });

            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.otherwise('/home');
        });
})(window.angular);
