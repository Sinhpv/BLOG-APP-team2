(() => {
    angular.module('blogApp')
    .config(function($stateProvider){

        var arrState = [
            {
                name: 'profiles',
                url: '/@:username',
                templateUrl: 'template/profile.html',
                controller: 'ctrlProfile'
            },

            {
                name: 'profiles.mine',
                url: '',
                templateUrl: 'template/profile.article.html',
                controller: 'ctrlMine'
            },

            {
                name: 'profiles.favorites',
                url:'/favorites',
                templateUrl: 'template/profile.article.html',
                controller: 'ctrlFavorites'
            }
        ]

        arrState.forEach(function(state) {
            $stateProvider.state(state);
        });
    
    });
})();

