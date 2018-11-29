(() => {
    angular.module('blogApp')
    .config(function($stateProvider){
        var arrState = [
            {
                name: 'create',
                url: '/editor',
                templateUrl: 'template/new.article.html',
                controller: 'ctrlEditorArticle'
            },
            {
                name: 'editor',
                url: '/editor/:slug',
                templateUrl: 'template/new.article.html',
                controller: 'ctrlEditorArticle'
            }
        ]
        arrState.forEach(function(state) {
            $stateProvider.state(state);
        });
    
    });
})();

