((angular) => {
    AuthService.$inject = ['$cookies', '$http','$state', '$q'];
    function AuthService($cookies, $http, $state, $q) {
        
        this.base = 'https://conduit.productionready.io';

        this.setCookies = (token) => {
            $cookies.put(
                'token',
                token || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDI3NjksInVzZXJuYW1lIjoiMncxencxemUiLCJleHAiOjE1NDgwNjQzOTV9.q085x1Zeqfs6fQLwUIc1QAc5PfiBPg0HzU_MQAdY00I'
            );
        };

        this.checkAuth = () => this.getUserInfo().then(() =>  true, () => false);

        this.register = (username, email, password) => 
            $http.post(`${this.base}/api/users`, {user: {username, email, password}})
                .then(
                    (res) => {
                        $cookies.put('token', res.data.user.token);
                        $state.go('home', null,{reload: true});
                        return res.data;
                    },
                    (err) => $q.reject(err.data));

        this.getUserInfo = () => 
            $http.get(`${this.base}/api/user`, {
                headers: {Authorization: `Token ${$cookies.get('token')}`,
                }
            }).then(res => res.data.user);
    

        this.getToken = () => $cookies.get('token');


        this.signIn = (email, password) => 
            $http.post(`${this.base}/api/users/login`, {user: {email, password}})
                .then(
                    res=>{  
                        $cookies.put('token', res.data.user.token);
                        $state.go('home', null,{reload: true});
                        return res.data;
                    }, 
                    err=> $q.reject(err.data)) ;
        

        this.signOut = ()=>{
            $cookies.put('token', '');
            $state.go('home', null,{reload: true});
        };
    }

    angular.module('AppService').service('AuthService', AuthService);
})(window.angular);
