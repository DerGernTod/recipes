var RecipePage = React.createClass({
    render : function render(){
        return (
            <div>this is a single recipe {this.props.params.recipeId || 'not found'}</div>
        );
    }
});