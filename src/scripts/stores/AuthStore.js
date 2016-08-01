var AuthStore = Reflux.createStore({
    listenables : AuthActions,
    init : function init(){
        this.jwt = localStorage.getItem('jwt');
        this.claims = this.parseJwt();
        this.error = false;
        this.loading = false;
    },
    getState : function getState(){
        return {
            loading: this.loading,
            error: this.error,
            user: this.userFromClaims(),
            loggedIn: this.loggedIn()
        };
    },
    userFromClaims : function userFromClaims(){
        return this.claims;
    },    
    loggedIn : function loggedIn(){
        return this.claims !== null;
    },
    changed : function changed(){
        this.trigger(this.getState());
    },
    onLogin : function onLogin(user, password){
        this.loading = true;
        this.changed();
        //TODO: api call
        setTimeout(function loginProxy(){
            AuthActions.login.completed({
    "jwt": "DOESNTMATTER.eyJleHAiOi0xLCJpZCI6IjEiLCJuYW1lIjoiR29vbGV5IiwiZW1haWwiOiJnb29sZXlAcHJlYWN0LmNvbSJ9.DOESNTMATTER"
  });
        }, 100);
    },
    onLoginCompleted : function onLoginCompleted(authResponse){
        if(authResponse){
            this.jwt = authResponse.jwt;
            this.claims = this.parseJwt();
            this.error = false;
            localStorage.setItem('jwt', this.jwt);
        }else{
            this.error = 'Passwort oder Benutzername ungültig.'
        }
        this.loading = false;
        this.changed();
    },
    onLogout : function onLogout(){
        this.jwt = null;
        this.claims = null;
        this.error = false;
        this.loading = false;
        localStorage.removeItem('jwt');
    },
    parseJwt : function parseJwt(){
        if(this.jwt === null) { 
            return null;
        }
        return JSON.parse(atob(this.jwt.split('.')[1]));
    }
});