"use-strict";

var CommentList = React.createClass({
    render: function render(){
        var commentNodes = this.props.data.map(function mapComments(comment){
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

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

var CommentBox = React.createClass({
    getInitialState: function getInitialState(){
        return { data: []};
    },
    loadCommentsFromServer: function loadCommentsFromServer(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function commentLoadSuccess(data) {
                this.setState({data: data});
            }.bind(this),
            error: function commentLoadError(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
            complete: function commentLoadComplete(){
                setTimeout(this.loadCommentsFromServer, this.props.pollInterval || 2000);
            }.bind(this)
        });
    },
    handleCommentSubmit: function handleCommentSubmit(comment){
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function successSubmitComment(data){
                this.setState({data: data});
            }.bind(this),
            error: function errorSubmitComment(xhr, status, err){
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
        // TODO: submit to the server and refresh the list
    },
    componentDidMount: function componentDidMount(){
        this.loadCommentsFromServer();
    },
    render: function render(){
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

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

ReactDOM.render(
    <CommentBox url="/api/comments.json" pollInterval={60000} />,
    document.getElementById('content')
);