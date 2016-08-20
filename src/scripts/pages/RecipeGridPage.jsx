import React from 'react';
import RecipeGridView from '../components/RecipeComponents.jsx';
var RecipeGridPage = React.createClass({
    getInitialState: function getInitialState(){
        return { 
            recipes : [{
                id: 0,
                title: 'initial recipe', 
                text: 'some text for the initial recipe',
                images : {
                    gridPreview : '/img/recipes/0/preview.png' 
                }
            }]
        };
    },
    componentDidMount: function componentDidMount(){
        this.getRecipes();
    },
    getRecipes : function getRecipes(){
        this.setState({ recipes : MOCK_RECIPES});
    },
    render : function render(){
        var recipes = this.state.recipes.map(function mapRecipes(recipe){
            return (
                <RecipeGridView key={recipe.id} recipe={recipe} />
            );
        });
        return (
            <div className="container">
                {recipes}
            </div>
        );
    }
});
export default RecipeGridPage;
var MOCK_RECIPES = [
    {
        id: 1,
        title : 'loaded recipe 1',
        text : 'some text for loaded recipe 1',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 2,
        title : 'Österreichisches Erdapfelgulasch mit Karotten',
        text : 'omnomnom sehr sehr lecker! frisches gebäck dazu empfohlen',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 3,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 4,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 5,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 6,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 7,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 8,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    },
    {
        id: 9,
        title : 'loaded recipe 2',
        text : 'some text for loaded recipe 2',
        images : {
            gridPreview : '/img/recipes/0/preview.png' 
        }
    }
]