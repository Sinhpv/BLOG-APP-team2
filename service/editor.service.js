(() => {
    
    angular.module('blogApp')
    .factory('editorService', function($http){
        let baseURL = 'https://conduit.productionready.io/api';
        let header = {
            'content-type': 'application/json', 
            headers: {
                'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDI3NjUsInVzZXJuYW1lIjoiSlFLQTIiLCJleHAiOjE1NDg0MTA2NjZ9.GCKLhh7qucQNXDrTLc6FW49B97ShggYjNe3U70-hRRM'
            }
        }
        let service = {
            createArticle: function (data){
                let req = {
                    method: "POST",
                    url: `${baseURL}/articles`,
                    data: data,
                    headers: header.headers
                }
                return $http(req)
            },
            editArticle: function (data, slug){
                let req = {
                    method: "PUT",
                    url: `${baseURL}/articles/${slug}`,
                    data: data,
                    headers: header.headers
                }
                return $http(req)
            },
        }

        return service
        
    })
    
})();