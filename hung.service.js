angular.module('myAppArticle').factory('appService', function ($http) {
    let baseUrl = 'https://conduit.productionready.io/api';
    let header = {
        'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDI3NjUsInVzZXJuYW1lIjoiSlFLQTIiLCJleHAiOjE1NDg0MTA2NjZ9.GCKLhh7qucQNXDrTLc6FW49B97ShggYjNe3U70-hRRM'
    }

    let service = {
        getArticle: function (slug) {
            let req = {
                method: 'GET',
                url: `${baseUrl}/articles/${slug}`,
                headers: header
            }
            return $http(req)
        },
        deleteArticle: function (slug) {
            let req = {
                method: 'DELETE',
                url: `${baseUrl}/articles/${slug}`,
                headers: header
            }
            return $http(req)
        },
        getArticleNoToken: function (slug) {
            return $http.get(`${baseUrl}/articles/${slug}`)
        },
        getComments: function (slug) {
            return $http.get(`${baseUrl}/articles/${slug}/comments`)
        },
        getProfile: function (username) {
            let req = {
                method: 'GET',
                url: `${baseUrl}/profiles/${username}`,
                headers: header
            }
            return $http(req)
        },
        follow: function (username) {
            let req = {
                method: 'POST',
                url: `${baseUrl}/profiles/${username}/follow`,
                headers: header
            }
            return $http(req)
        },
        unFollow: function (username) {
            let req = {
                method: 'DELETE',
                url: `${baseUrl}/profiles/${username}/follow`,
                headers: header
            }
            return $http(req)
        },
        favorite: function (slug) {
            let req = {
                method: 'POST',
                url: `${baseUrl}/articles/${slug}/favorite`,
                headers: header
            }
            return $http(req)
        },
        unFavorite: function (slug) {
            let req = {
                method: 'DELETE',
                url: `${baseUrl}/articles/${slug}/favorite`,
                headers: header
            }
            return $http(req)
        },
        comment: function (slug, dataComment) {
            let req = {
                method: 'POST',
                url: `${baseUrl}/articles/${slug}/comments`,
                headers: header,
                data: {
                    'comment': {
                        'body': dataComment
                    }
                }
            }
            return $http(req)
        },
        deleteComment: function (slug, id) {
            let req = {
                method: 'DELETE',
                url: `${baseUrl}/articles/${slug}/comments/${id}`,
                headers: header
            }
            return $http(req)
        }
    }
    return service
})

