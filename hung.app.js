angular.module('myAppArticle').config(function ($stateProvider) {
    let states = [
        {
            name: 'article',
            url: '/article',
            templateUrl: 'hung.template/article.html',
            controller: function (appService, $scope, $stateParams, $state) {
                $scope.slug = 'ahihi-ffyezc';
                $scope.isAuth = true;
                $scope.isMyArt = true;
                let isAuth = $scope.isAuth
                let username = 'JQKA2'

                $scope.toSignup = function () {
                    $state.go('signUp')
                }

                if (isAuth === true) {
                    function getCommen() {
                        appService.getComments($scope.slug).then((comments) => {
                            $scope.comments = comments.data.comments;
                            $scope.comments.map((comment) => {
                                if (comment.author.username === 'JQKA2') {
                                    return comment.isMyComment = true
                                }
                            })
                        })
                    }

                    appService.getArticle($scope.slug).then((user) => {
                        $scope.article = user.data.article;
                        $scope.username = $scope.article.author.username;

                        if (username === $scope.username) {
                            $scope.isMyArt = true;
                            $scope.deleteArticle = function () {
                                appService.deleteArticle($scope.slug).then(() => {
                                    /*******************************************go to your feed**************************** */

                                })
                            }
                            $scope.editArt = function () {
                                $scope.title = user.data.article.title;
                                $scope.body = user.data.article.body;
                                $scope.description = user.data.article.description;
                                /********************************************edit article *************************************/
                            }
                        }

                        $scope.isFavorite = !user.data.article.favorited;
                        $scope.favoriteCount = user.data.article.favoritesCount;

                        appService.getProfile($scope.username).then((user) => {
                            $scope.isFollow = !user.data.profile.following
                        })

                        $scope.changeFollow = function () {
                            appService.getProfile($scope.username).then((user) => {
                                if (user.data.profile.following) {
                                    appService.unFollow(user.data.profile.username).then((profile) => {
                                        $scope.isFollow = !profile.data.profile.following
                                    })
                                } else {
                                    appService.follow(user.data.profile.username).then((profile) => {
                                        $scope.isFollow = !profile.data.profile.following
                                    })
                                }
                            })
                        };

                        $scope.changeFavorite = function () {
                            appService.getArticle($scope.slug).then((user) => {

                                if (user.data.article.favorited) {
                                    appService.unFavorite($scope.slug).then((favo) => {
                                        $scope.favoriteCount--;
                                        $scope.isFavorite = !favo.data.article.favorited
                                    })
                                } else {
                                    appService.favorite($scope.slug).then((favo) => {
                                        $scope.favoriteCount++;
                                        $scope.isFavorite = !favo.data.article.favorited
                                    })
                                }
                            })
                        }

                        $scope.comment = function () {
                            appService.comment($scope.slug, $scope.myComment).then(() => {
                                $scope.myComment = ''
                                getCommen()
                            })
                        }
                    });

                    appService.getComments($scope.slug).then((comments) => {
                        $scope.comments = comments.data.comments;
                        $scope.comments.map((comment) => {
                            if (comment.author.username === 'JQKA2') {
                                return comment.isMyComment = true
                            }
                        })
                        $scope.deleteComment = function (id) {
                            appService.deleteComment($scope.slug, id).then(() => {
                                getCommen()
                            })
                        }
                    });
                } else {
                    appService.getArticleNoToken($scope.slug).then((user) => {
                        $scope.article = user.data.article;
                        $scope.username = $scope.article.author.username;
                        $scope.favoriteCount = user.data.article.favoritesCount
                    })

                    appService.getComments($scope.slug).then((comments) => {
                        $scope.comments = comments.data.comments;
                    })
                }

            }
        }
    ]
    states.forEach((state) => {
        $stateProvider.state(state)
    })
})