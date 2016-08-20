import React from 'react';
import {AdminSearch} from '../../components/Search.jsx';
var AdminRecipesPage = React.createClass({
    render : function render(){
        return (
            <div className="adminContainer center-block">
                <AdminSearch createLink="/admin/recipes/id/new" />
                {this.props.children}
            </div>
        );
    }
});
var AdminRecipesSearchPage = React.createClass({
    render : function render(){
        return (
            <div>
                AdminRecipesSearchPage
            </div>
        );
    }
});
var AdminRecipesLatestPage = React.createClass({
    render : function render(){
        return (
            <div>
                AdminRecipesLatestPage
            </div>
        );
    }
});
var AdminRecipesIdPage = React.createClass({
    prepTimes : {
        min: 5,
        max: 360,
        steps: 5
    },
    getInitialState: function getInitialState(){
        return {time: this.prepTimes.min};
    },
    handleTimeChange : function handleTimeChange(e){
        var val = parseInt(e.target.value);
        if(val
        && val <= this.prepTimes.max 
        && val >= this.prepTimes.min){
            this.setState({time: val});
        }
    },
    render : function render(){
        var formData = {};
        if(this.props.params.recipeId.toLowerCase() == "new"){
            formData.test = "leeeeeeeer";
        }else{
            //todo: search db for id, if unavailable show error
            var dbResult = { valid : false }
            if(!dbResult.valid){
                return (
                    <div>error, recipe not found!</div>
                );
            }
        }

        return (
            
            <div>
                AdminRecipesIdPage {formData.test}
                <form>
                    <input className="form-control" type="text" placeholder="Titel" />
                    
                    //todo: zutatenkomponente
                    <textarea className="form-control" placeholder="Zubereitung"></textarea>
                    <div className="form-group">
                        <label for="preparationTime">Zubereitungszeit</label>
                        <div className="clearfix form-inline">
                            <input className="form-control" 
                                id="preparationTime" type="range" min="5" max="360" step="5"
                                onChange={this.handleTimeChange} 
                                value={this.state.time}  />
                            <input className="form-control" type="text" min="5" max="360" step="5" value={this.state.time} onChange={this.handleTimeChange}/>
                        </div> 
                    </div>
                    
                    //todo: tags komponente
                    //todo: bildergallerie
                    
                </form>
            </div>
        );
    }
});
export {AdminRecipesIdPage, AdminRecipesLatestPage, AdminRecipesPage, AdminRecipesSearchPage};