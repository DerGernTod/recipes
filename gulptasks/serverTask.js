const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const couch = require('./couch');
function serverTask(){
    var app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.get('/', function handleRoot(req, res){
        res.send('Hello World!');
    });
    function comments(req, res){
        var comment = req.body;
        if(comment.author){
            couch.addComment(comment, function addCommentCallback(err, doc){
                if(err){
                    console.error(err);
                }else{
                    req.body = "";
                    console.log("added comment: " + JSON.stringify(doc));
                }
                comments(req, res);
            });
        }else{
            couch.getComments(function commentsCallback(comments){
                res.send(JSON.stringify(comments));
            });
        }
    }
    app.post('/api/comments', comments);
    app.get('/api/comments', comments);


    app.listen(3000, function listen(){
        console.log('Example app listening on port 3000!');
    });
}

module.exports = serverTask;