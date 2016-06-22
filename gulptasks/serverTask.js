const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
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

        fs.readFile("api/comments.json", "utf8", function fileCallback(error, data){
            if(comment.author){
                var oldData = data;
                var parsedData = JSON.parse(data);
                parsedData.push(comment);
                var newData = JSON.stringify(parsedData);
                
                fs.writeFile("api/comments.json", newData, (err) => {
                    if(err){
                        res.send(oldData);
                    }else{
                        res.send(newData);
                    }
                });
            }else{
                res.send(data);
            }
            
        });
    }
    app.post('/api/comments', comments);
    app.get('/api/comments', comments);


    app.listen(3000, function listen(){
        console.log('Example app listening on port 3000!');
    });
}

module.exports = serverTask;