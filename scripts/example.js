"use-strict";

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


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
    render: function render(){
        return (
            <div className="commentForm">
                Hello CommentForm!
            </div>
        );
    }  
});

var CommentBox = React.createClass({
    getInitialState: function getInitialState(){
        return { data: []};
    },
    componentDidMount: function componentDidMount(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function render(){
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
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
    <CommentBox url="/api/comments.json" />,
    document.getElementById('content')
);