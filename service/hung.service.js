window.angular
    .module('AppService')
    .factory('appService', function($http, AuthService) {
        let baseUrl = 'https://conduit.productionready.io/api',
            headers = {};
        let service = {
            resetHeader: () => {
                let auth = AuthService.getToken();
                if (auth) {
                    headers['Authorization'] = `Token ${auth}`;
                }
            },
            getArticle: function(slug) {
                let req = {
                    method: 'GET',
                    url: `${baseUrl}/articles/${slug}`,
                    headers,
                };
                return $http(req);
            },
            deleteArticle: function(slug) {
                let req = {
                    method: 'DELETE',
                    url: `${baseUrl}/articles/${slug}`,
                    headers,
                };
                return $http(req);
            },
            getArticleNoToken: function(slug) {
                return $http.get(`${baseUrl}/articles/${slug}`);
            },
            getComments: function(slug) {
                return $http.get(`${baseUrl}/articles/${slug}/comments`);
            },
            getProfile: function(username) {
                let req = {
                    method: 'GET',
                    url: `${baseUrl}/profiles/${username}`,
                    headers,
                };
                return $http(req);
            },
            follow: function(username) {
                let req = {
                    method: 'POST',
                    url: `${baseUrl}/profiles/${username}/follow`,
                    headers,
                };
                return $http(req);
            },
            unFollow: function(username) {
                let req = {
                    method: 'DELETE',
                    url: `${baseUrl}/profiles/${username}/follow`,
                    headers,
                };
                return $http(req);
            },
            favorite: function(slug) {
                let req = {
                    method: 'POST',
                    url: `${baseUrl}/articles/${slug}/favorite`,
                    headers,
                };
                return $http(req);
            },
            unFavorite: function(slug) {
                let req = {
                    method: 'DELETE',
                    url: `${baseUrl}/articles/${slug}/favorite`,
                    headers,
                };
                return $http(req);
            },
            comment: function(slug, dataComment) {
                let req = {
                    method: 'POST',
                    url: `${baseUrl}/articles/${slug}/comments`,
                    headers,
                    data: {
                        comment: {
                            body: dataComment,
                        },
                    },
                };
                return $http(req);
            },
            deleteComment: function(slug, id) {
                let req = {
                    method: 'DELETE',
                    url: `${baseUrl}/articles/${slug}/comments/${id}`,
                    headers,
                };
                return $http(req);
            },
        };
        return service;
    });
