var RecipeGridView = React.createClass({
    render : function render(){
        var widthImgStyle = {
            width : "33%"
        };
        var widthWrapperStyle = {
            width: "100%"
        };
        return (
            <div className="recipeGridPreview col-md-4 col-xs-12 col-sm-6 col-lg-3">
                <div style={widthWrapperStyle}>
                    <img className="pull-left" style={widthImgStyle} src={this.props.recipe.images.gridPreview} />
                    <h3>
                        {this.props.recipe.title}
                    </h3>
                </div>
                <p>
                    {this.props.recipe.text}
                </p>
            </div>
        );
    }
});