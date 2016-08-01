var RecipePage = React.createClass({
    render : function render(){
        //todo: check if recipe with id exists, else redirect to not found
        return (
            <div>this is a single recipe {this.props.params.recipeId || 'not found'}</div>
        );
    }
});