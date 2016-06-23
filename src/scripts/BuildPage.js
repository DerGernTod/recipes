
ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={40000} />,
    document.getElementById('content')
);