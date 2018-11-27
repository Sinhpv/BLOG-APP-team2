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
                signState = {
                    name: 'sign',
                    parent: 'auth',
                    url: '/{signMode}',
                    templateUrl: 'template/sign.template.html',
                    controller: 'SignController'
                };

            $stateProvider
                .state(authState)
                .state(homeState)
                .state(signState);
            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.otherwise('/home');
        });
})(window.angular);
