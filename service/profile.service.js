(() => {
    window.angular
        .module('AppService')
        .factory('profileService', function($http, AuthService) {
            let baseURL = 'https://conduit.productionready.io/api',
                headers = {},
                resetHeader = () => {
                    let auth = AuthService.getToken();
                    if (auth) {
                        headers['Authorization'] = `Token ${auth}`;
                    }
                };
            let service = {
                resetHeader,

                getProfile: function(username) {
                    let req = {
                        method: 'GET',
                        url: `${baseURL}/profiles/${username}`,
                        headers
                    };
                    return $http(req);
                },
                getArticle: function(slug) {
                    let req = {
                        method: 'GET',
                        url: `${baseURL}/articles/${slug}`,
                        headers,
                    };
                    return $http(req);
                },
                getMyArticle: function(username) {
                    let req = {
                        method: 'GET',
                        url: `${baseURL}/articles?author=${username}`,
                    };
                    return $http(req);
                },
                getFavoriteArticle: function(username) {
                    let req = {
                        method: 'GET',
                        url: `${baseURL}/articles?favorited=${username}`,
                    };
                    return $http(req);
                },
                follow: function(username) {
                    let req = {
                        method: 'POST',
                        url: `${baseURL}/profiles/${username}/follow`,
                        headers
                    };
                    return $http(req);
                },
                unFollow: function(username) {
                    let req = {
                        method: 'DELETE',
                        url: `${baseURL}/profiles/${username}/follow`,
                        headers
                    };
                    return $http(req);
                },
            };

            return service;
        });
})();
