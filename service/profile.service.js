(() => {
    
    angular.module('blogApp')
    .factory('profileService', function($http){
        let baseURL = 'https://conduit.productionready.io/api';
        let header = {
            headers: {
                'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDI3NjUsInVzZXJuYW1lIjoiSlFLQTIiLCJleHAiOjE1NDg0MTA2NjZ9.GCKLhh7qucQNXDrTLc6FW49B97ShggYjNe3U70-hRRM'
            }
        }
        let service = {
            getProfile: function (username){
                let req = {
                    method: "GET",
                    url: `${baseURL}/profiles/${username}`
                }
                return $http(req)
            },
            getArticle: function (slug) {
                let req = {
                    method: 'GET',
                    url: `${baseURL}/articles/${slug}`,
                    headers: header.headers
                }
                return $http(req)
            },
            getMyArticle: function (username){
                let req = {
                    method: "GET",
                    url: `${baseURL}/articles?author=${username}`
                }
                return $http(req)
            },
            getFavoriteArticle: function (username){
                let req = {
                    method: "GET",
                    url: `${baseURL}/articles?favorited=${username}`
                }
                return $http(req)
            },
            follow: function (username) {
                let req = {
                    method: 'POST',
                    url: `${baseURL}/profiles/${username}/follow`,
                    headers: header.headers
                }
                return $http(req)
            },
            unFollow: function (username) {
                let req = {
                    method: 'DELETE',
                    url: `${baseURL}/profiles/${username}/follow`,
                    headers: header.headers
                }
                return $http(req)
            }
        }

        return service
        
    })
    
})();