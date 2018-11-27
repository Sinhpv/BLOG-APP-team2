((angular) => {
    AuthService.$inject = ['$cookies', '$http','$state'];
    function AuthService($cookies, $http, $state) {
        
        this.base = 'https://conduit.productionready.io';

        this.setCookies = (token) => {
            $cookies.put(
                'token',
                token || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDI3NjksInVzZXJuYW1lIjoiMncxencxemUiLCJleHAiOjE1NDgwNjQzOTV9.q085x1Zeqfs6fQLwUIc1QAc5PfiBPg0HzU_MQAdY00I'
            );
        };

        this.checkAuth = () => {
            return this.getUserInfo().then(() =>  true, () => false);
        };

        this.register = (uname, email, pass) => {
            let bodyRq = {
                user: {
                    username: 'Jacob',
                    email: 'jakefjake.jake',
                    password: 'jakejake',
                },
            };
            return $http.post(`${this.base}/api/users`, bodyRq).then(
                (res) => {
                    console.log(res.data);
                    $cookies.put('token', res.data.user.token);
                    return res.data;
                },
                (err) => {
                    console.log(err.data);
                    return err;
                }
            );
        };

        this.getUserInfo = () => {
            return $http
                .get(`${this.base}/api/user`, {
                    headers: {
                        Authorization: `Token ${$cookies.get('token')}`,
                    },
                })
                .then(
                    (res) => {
                        console.log('Current user data: ' + res.data);
                        return res.data.user;
                    }
                );
        };

        this.getToken = ()=>{
            return $cookies.get('token');
        };

        this.signIn = (email, pwd) => {
            let bodyRq = {
                user: {
                    email: 'jake@jake.jake',
                    password: 'jakejake',
                },
            };
            return $http
                .post(`${this.base}/api/users/login`, bodyRq)
                .then(
                    res=>{  
                        $cookies.put('token', res.data.user.token);
                        return res.data;
                    }, 
                    err=>{return err.data;});
        };

        this.signOut = ()=>{
            $cookies.put('token', '');
            $state.go('home', null,{reload: true});
        };
    }

    angular.module('AppService').service('AuthService', AuthService);
})(window.angular);
