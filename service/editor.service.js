(() => {
    window.angular
        .module('AppService')
        .factory('editorService', function($http, AuthService) {
            let baseURL = 'https://conduit.productionready.io/api',
                headers = {};

            let service = {
                resetHeader : () => {
                    let auth = AuthService.getToken();
                    if (auth) {
                        headers['Authorization'] = `Token ${auth}`;
                    }
                },
                createArticle: function(data) {
                    let req = {
                        method: 'POST',
                        url: `${baseURL}/articles`,
                        data: data,
                        headers
                    };
                    return $http(req);
                },
                editArticle: function(data, slug) {
                    let req = {
                        method: 'PUT',
                        url: `${baseURL}/articles/${slug}`,
                        data: data,
                        headers
                    };
                    return $http(req);
                },
            };

            return service;
        });
})();
