import React from 'react';
import {withRouter, State, Navigation} from 'react-router';
import Reflux from 'reflux';
import AuthStore from '../stores/AuthStore.jsx';
import AuthActions from '../actions/AuthActions.jsx';
var LoginPage = withRouter(React.createClass({
    mixins: [
        State,
        Navigation,
        Reflux.connect(AuthStore, "loginStatus"),
        Reflux.ListenerMixin
    ],
    componentDidMount: function componentDidMount(){
        if(AuthStore.loggedIn()){
            this.redirectToAdminPage();
        }else{
            this.listenTo(AuthStore, this._onAuthChange);
        }
    },
    _onAuthChange: function _onAuthChange(auth){
        this.setState(auth);
        if(this.state.loggedIn){
           this.redirectToAdminPage();
        }
    },
    redirectToAdminPage: function redirectToAdminPage(){
        this.props.router.push('/admin');
    },
    login: function login(e){
        e.preventDefault();
        console.log("trying to login");
        if(this.refs.username.value == "123" && this.refs.password.value == "456"){
            console.log("login successful");
            AuthActions.login(this.refs.username.value, this.refs.password.value);
        }
        
    },
    render : function render(){
        var errorMessage;
        if(this.state.error){
            errorMessage = (
                <div className="state-error">{this.state.error}</div>
            );
        }
        return (
            <div>
                {errorMessage}
                <form>
                    <div className="form-group">
                        <input type="text" ref="username" placeholder="Username" />
                        <input type="password" ref="password" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login}>Login</button>
                </form>
            </div>
        )
    }
}));
export default LoginPage;