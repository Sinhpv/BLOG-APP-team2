((angular) => {
    'use strict';
    angular
        .module('stateModule', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider) {
            let authState = {
                    name: 'auth',
                    abstract: true,
                    resolve: {
                        isAuth: function(AuthService, ArticlesService) {
                            ArticlesService.resetHeader();
                            return AuthService.checkAuth();
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
                articlesState = {
                    name: 'home.articles',
                    templateUrl: 'template/articles.template.html',
                    controller: '',
                };

            $stateProvider
                .state(authState)
                .state(homeState)
                .state(articlesState);
            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.otherwise('/home');
        });
})(window.angular);
