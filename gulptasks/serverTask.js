const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const couch = require('./couch');
const tags = require('../api/tags');
const path = require('path');
var server;
function serverTask(){
    app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:'qs'}));
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
    function adminLogin(req, res){
        var password = req.body.password;
        
        res.send({successful: true});
    }

    app.post('/api/addTag', tags.addTag);
    app.get('/api/latestTags', tags.latestTags);
    app.post('/api/deleteTag', tags.deleteTag);
    app.post('/api/comments', comments);
    app.post('/api/adminlogin', adminLogin);
    app.get('/api/comments', comments);


    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../src/index.html'));
    });
    server = app.listen(55555, function listen(){
        console.log('Example app listening on port 55555!');
    });
}
function serverStop(){
    server && server.close();
}
module.exports = {
    start : serverTask,
    stop : serverStop
}