((angular)=>{

    ArticlesService.$inject = ['$resource', 'AuthService'];
    function ArticlesService($resource, AuthService) {
        let baseURL = 'https://conduit.productionready.io/api/articles',
            headers = {};
        this.resetHeader = ()=>{
            let auth = AuthService.getToken();
            if (auth) {
                headers['Authorization'] = `Token ${auth}`;
            }
        };
        this.Articles = $resource('',null,
            {
                'getArticles': { method: 'GET', url: `${baseURL}`,headers},
                'getAnArticle' : {method: 'GET', url:`${baseURL}/:slug`},
                'createArticle' : {method: 'POST', url:`${baseURL}`, headers},
                'getFeedArticles' : {method: 'GET', url:`${baseURL}/feed`, headers} ,
                'getAllTags': {method: 'GET', url: 'https://conduit.productionready.io/api/tags' },
                'likeArticle': {method: 'POST', url: `${baseURL}/:slug/favorite`, headers},
                'unlikeArticle': {method: 'DELETE', url: `${baseURL}/:slug/favorite`, headers}
            }
        );
    }


    angular.module('AppService').service('ArticlesService', ArticlesService);
})(window.angular);