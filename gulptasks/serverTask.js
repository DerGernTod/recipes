const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const couch = require('./couch');
const tags = require('../api/tags');
const ingredients = require('../api/ingredients');
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

    app.get('/api/tags/get', tags.get);
    
    app.post('/api/tags/add', tags.add);
    app.post('/api/tags/edit', tags.edit);
    app.get('/api/tags/latest', tags.latest);
    app.post('/api/tags/delete', tags.remove);

    app.post('/api/ingredients/add', ingredients.add);
    app.post('/api/ingredients/edit', ingredients.edit);
    app.get('/api/ingredients/latest', ingredients.latest);
    app.post('/api/ingredients/delete', ingredients.remove);

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