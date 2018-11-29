((angular) => {
    'use strict';
    angular
        .module('stateModule', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider) {
            let authState = {
                    name: 'auth',
                    abstract: true,
                    resolve: {
                        isAuth: function(AuthService, ArticlesService, profileService) {
                            ArticlesService.resetHeader();
                            profileService.resetHeader();
                            return AuthService.checkAuth();
                        },
                        user : function(AuthService) {
                            return AuthService.getUserInfo();
                        }
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
                        profile: function(profileService,$stateParams) {
                            return profileService.getProfile($stateParams.username)
                                .then(user => user.data.profile);
                        }
                    }
                };

            $stateProvider
                .state(authState)
                .state(homeState)
                .state(signState)
                .state(profilesState);
            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.otherwise('/home');
        });
})(window.angular);
