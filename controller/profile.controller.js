(() => {
    window.angular.module('mock-app')
        .controller('ctrlProfile', function(profileService, user, isAuth, profile, $stateParams,$state, $scope){
            $scope.profile = profile;
            $scope.username = $stateParams.username;
            $scope.isMyProfile = $scope.username === user.username;
            $scope.isAuth = isAuth;
            $scope.isLoading = false;


            $scope.changeFollow = function () {
                if ($scope.isAuth) {
                    $state.go('sign', { signMode: 'login' });
                    return;
                }

                $scope.isLoading = true;
                if ($scope.profile.following == true) {
                    profileService.unFollow($scope.username).then((profile) => {
                        $scope.profile = profile.data.profile;
                        $scope.isLoading = false;
                    });
                } else {
                    profileService.follow($scope.username).then((profile) => {
                        $scope.profile = profile.data.profile;
                        $scope.isLoading = false;
                    });
                }
            };


        
        });
})();



