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
            }
        );
    }


    angular.module('AppService').service('ArticlesService', ArticlesService);
})(window.angular);