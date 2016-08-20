import React from 'react';
import CreateTagComponent from './CreateTagComponent.jsx';
var RecipeForm = React.createClass({
    render : function render(){
        return (
            <div>
                <form>
                    <input type="text" placeholder="Titel" />
                    <textarea placeholder="Zubereitung" />
                    <input type="file" />
                    <CreateTagComponent />
                </form>
            </div>
        );
    }
})
export default RecipeForm;