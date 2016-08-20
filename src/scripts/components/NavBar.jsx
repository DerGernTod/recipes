import React from 'react';
import {Link} from 'react-router';
var NavBar = React.createClass({
    render: function render(){
        return (
            <nav className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <Link to="/list" activeClassName="active" className="col-xs-12 col-sm-4 col-md-4 col-lg-4">Rezepte</Link>
                <Link to="/random"  activeClassName="active" className="col-xs-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">Zufallsrezepte</Link>
                <Link to="/search"  activeClassName="active" className="col-xs-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">Zutatensuche</Link>
            </nav>
        );
    }
});
var AdminNavBar = React.createClass({
    render: function render(){
        return (
            <nav className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <Link to="/admin/recipes" activeClassName="active" className="col-xs-12 col-sm-4 col-md-4 col-lg-4">Rezepte</Link>
                <Link to="/admin/ingredients"  activeClassName="active" className="col-xs-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">Zutaten</Link>
                <Link to="/admin/tags"  activeClassName="active" className="col-xs-12 col-xs-12 col-sm-4 col-md-4 col-lg-4">Tags</Link>
            </nav>
        );
    }
});
export {NavBar, AdminNavBar};