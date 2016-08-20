import React from 'react';
import {AdminSearch} from '../../components/Search.jsx';
var AdminIngredientsPage = React.createClass({
    render : function render(){
        return (
            <div className="adminContainer center-block">
                <AdminSearch createLink="/admin/ingredients/id/new" />
                {this.props.children}
            </div>
        );
    }
});
var AdminIngredientsSearchPage = React.createClass({
    render : function render(){
        return (
            <div>
                adminingredientpage
            </div>
        );
    }
});
var AdminIngredientsLatestPage = React.createClass({
    render : function render(){
        return (
            <div>
                adminingredientpage
            </div>
        );
    }
});
var AdminIngredientsIdPage = React.createClass({
    render : function render(){
        return (
            <div>
                adminingredientpage
            </div>
        );
    }
});
export {AdminIngredientsIdPage, AdminIngredientsLatestPage, AdminIngredientsPage, AdminIngredientsSearchPage};