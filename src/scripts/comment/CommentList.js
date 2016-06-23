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