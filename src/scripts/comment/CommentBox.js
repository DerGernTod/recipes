"use-strict";
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