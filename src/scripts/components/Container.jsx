import React from 'react';
import {withRouter, State, Navigation, Link} from 'react-router';
import AuthActions from '../actions/AuthActions.jsx';
import {AdminNavBar, NavBar} from './NavBar.jsx';
var Container = React.createClass({
    render: function render(){
        return (
            <div>
                <header>
                    <div className="logo col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <Link to="/">Logo</Link>
                    </div>
                    <NavBar />
                    <form className="pull-right  col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <input className="pull-right" type="text" placeholder="Suche" />
                    </form>
                </header>
                {this.props.children}
            </div>
        );
    }
});

var AdminContainer = withRouter(React.createClass({
    mixins : [
        State,
        Navigation
    ],
    logout : function logout(){
        AuthActions.logout();
        setTimeout(function(){
            this.props.router.replace("/login");
        }.bind(this), 100);
    },
    render : function render(){
        return (
            <div>
                <header>
                    <AdminNavBar />
                    <div className="btn btn-default" onClick={this.logout} >Logout</div>
                </header>
                
                {this.props.children}
            </div>
        );
    }
}));
export {Container, AdminContainer};