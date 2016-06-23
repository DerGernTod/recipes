"use-strict";
var CommentForm = React.createClass({
    getInitialState: function getInitialState(){
        return {author: '', text: ''};
    },
    handleAuthorChange: function handleAuthorChange(e){
        this.setState({author: e.target.value});
    },
    handleTextChange: function handleTextChange(e){
        this.setState({text: e.target.value});
    },
    handleSubmit: function handleSubmit(e){
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if(!text || !author){
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function render(){
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input 
                    onChange={this.handleAuthorChange} 
                    value={this.state.author} 
                    type="text" 
                    placeholder="Your name" />
                <input 
                    onChange={this.handleTextChange} 
                    value={this.state.text} 
                    type="text" 
                    placeholder="Say something..." />
                <input type="submit" value="Post" />
            </form>
        );
    }  
});