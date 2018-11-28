(() => {
    angular.module('blogApp')
    .controller('ctrlProfile', function(profileService, $stateParams, $scope){
        $stateParams.username = 'bluebird';
        profileService.getProfile($stateParams.username).then(user => {
            $scope.profile = user.data.profile;
            $scope.changeFollow = function () {
                if ($scope.isFollow == true) {
                    profileService.unFollow(user.data.profile.username).then((profile) => {
                        $scope.isFollow = false;
                    })
                } else {
                    profileService.follow(user.data.profile.username).then((profile) => {
                        $scope.isFollow = true;
                    })
                }
            };
        })
        
    })
    .controller('ctrlMine', function(profileService, $stateParams, $scope){
        profileService.getMyArticle($stateParams.username).then(user => {
            $scope.articles = user.data.articles;
        })
    })
    .controller('ctrlFavorites', function(profileService, $stateParams, $scope){
        profileService.getFavoriteArticle($stateParams.username).then(user => {
            $scope.articles = user.data.articles;
        })
    })
    // .controller('ctrlProfileSub', function(profileService, $scope, $rootScope){
    //     $scope.slug = 'blue-bug-1zxvdn';
        
    //     $scope.likeArticle = function(){
    //         profileService.getArticle($scope.slug).then((user) => {
    //             let favoriteCount = user.data.article.favoritesCount;
    //             if (user.data.article.favorited) {
    //                 profileService.unFavorite($scope.slug).then((favo) => {
    //                     favoriteCount--;
    //                     // user.data.article.favoritesCount--;
    //                     user.data.article.favorited = !favo.data.article.favorited;
    //                 })
    //             } else {
    //                 profileService.favorite($scope.slug).then((favo) => {
    //                     favoriteCount++;
    //                     // user.data.article.favoritesCount++;
    //                     user.data.article.favorited = !favo.data.article.favorited;
    //                 })
    //             }
                
    //         })
    //         $rootScope.$digest();
    //     }
    // })
    
})();



