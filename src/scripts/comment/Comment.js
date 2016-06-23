"use-strict";
var Comment = React.createClass({
    rawMarkup: function rawMarkup(){
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return{ __html: rawMarkup };
    },
    render: function render(){
        var md = new Remarkable();
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});