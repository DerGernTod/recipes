import React from 'react';
import {withRouter, State, Navigation} from 'react-router';
import $ from 'jquery';
import EditableDeletable from '../../components/admin/EditableDeletable.jsx';
import {AdminSearch} from '../../components/Search.jsx';
var AdminIngredientsPage = React.createClass({
    componentDidMount : function componentDidMount(){

    },
    addIngredient : function addIngredient(){
        $('.simpleList li:first-child div.text').text("");
        $('.simpleList li:first-child').show();
        $('.simpleList li:first-child div.text').focus();
    },
    render : function render(){
        return (
            <div className="adminContainer center-block">
                <AdminSearch focus="true" createFunction={this.addIngredient} />
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
var AdminIngredientsLatestPage = withRouter(React.createClass({
    //TODO: store input elements in this component and handle inputmode/textmode there. less jquery!
    mixins : [
        State,
        Navigation
    ],
    getInitialState : function getInitialState(){
        return { ingredients : []};
    },
    componentDidMount : function componentDidMount(){
        $.get("/api/ingredients/latest").done((response => {
            if(response.success){
                var newObj = [];
                var data = response.response;
                for(var i in data){
                    if(data.hasOwnProperty(i)){
                        var curObj = data[i];
                        newObj[i] = {
                            id : curObj.id,
                            name : curObj.value.ingredientName
                        };      
                    }
                }
                this.setState({ingredients : newObj});
            }else{
                console.log("Error getting latest ingredients: ", response);
            }
        }).bind(this));
        $(this.refs.addIngredientLi).hide();
    },
    addComplete : function addComplete(id, name){
        $(this.refs.addIngredientLi).hide();
        if(!id || !name){
            return;
        }
        var ingredients = this.state.ingredients;
        ingredients = ingredients.slice(0);
        ingredients.unshift({id : id, name : name});
        this.setState({ingredients:[]});
        this.setState({ingredients : ingredients});
    },
    ingredientDeleted : function ingredientDeleted(entry){
        var ingredients = this.state.ingredients.slice(0);
        var index = ingredients.indexOf(entry);
        $(this.refs.addIngredientLi).hide();
        if(index != -1){
            ingredients.splice(index, 1);
            this.setState({ingredients:[]});
            this.setState({ingredients: ingredients});
        }
    },
    render : function render(){
        var entries = [];
        for(var i in this.state.ingredients){
            entries.push((
                <li key={"ingredient_" + i}>
                    <EditableDeletable stateId={i} onDelete={this.ingredientDeleted} deleteUrl="/api/ingredients/delete" updateUrl="/api/ingredients/edit" entry={this.state.ingredients[i]} />
                </li>
            ));
        }
        var emptyEntry = {
            id : "new", 
            name : ""
        };
        return (
            <ul className="simpleList">
                <li ref="addIngredientLi" key="ingredients_add">
                    <EditableDeletable ref="addIngredient" updateUrl="/api/ingredients/add" onEditComplete={this.addComplete} entry={emptyEntry}/>
                </li>
                {entries}
            </ul>
        );
    }
}));
export {AdminIngredientsLatestPage, AdminIngredientsPage, AdminIngredientsSearchPage};