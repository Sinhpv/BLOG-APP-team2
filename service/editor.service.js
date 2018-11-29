(() => {
    
    angular.module('blogApp')
    .factory('editorService', function($http){
        let baseURL = 'https://conduit.productionready.io/api';
        let header = {
            'content-type': 'application/json', 
            headers: {
                'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDI3NjQsInVzZXJuYW1lIjoiZGFyY2g5eCIsImV4cCI6MTU0Nzk1ODY1Mn0._gFOIiAr0vrUHzL2npYsYOD5X3jxn_jnzQ_HvGrTXRo'
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