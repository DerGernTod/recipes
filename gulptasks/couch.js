"use-strict";
const cradle = require('cradle');
const db = new(cradle.Connection)('http://192.168.0.50', 5984,{
    auth: { username: 'recipes', password: 'recipes'}
}).database('recipes');

function initDesignDocuments(){
     db.save('_design/recipes', {
        views: {
            comments: {
                map: (function (doc) { 
                    if (doc.doctype == "Comment") { 
                        emit(doc.id, doc); 
                    } 
                }).toString()
            },
            tags: {
                map: (function (doc) {
                    if (doc.doctype == "Tag"){
                        emit(doc._id, doc);
                    }
                }).toString()
            },
            tagsLatest: {
                map: (function(doc){
                    if (doc.doctype == "Tag"){
                        emit(-doc.created, doc);
                    }
                }).toString()
            }
        }
    });
}

module.exports = {
    initDatabase: function initDatabase(){
        db.exists(function checkDbExistance(err, exists){
            if(err){
                console.log("error checking for db: " + err);
            }else{
                if(!exists){
                    db.create(function onDbCreate(err){
                        if(err){
                            console.log("error creating db: " + err);
                        }else{
                            console.log("successfully created database");
                            initDesignDocuments();
                        }
                    });
                }else{
                    console.log("couchdb exists and is reachable!");
                    initDesignDocuments();
                }
            }
        });
    },
    addTag: function addTag(data, callback){
        db.view('recipes/tags', {key : "tag_" + data.tagName}, (err, doc) => {
            if(err || doc.length){
                callback({success : false, message : "Tag '" + data.tagName + "' existiert bereits!"})
            }else{
                db.save('tag_' + data.tagName, {
                    doctype : "Tag",
                    created : data.timestamp
                }, (err, res) => {
                    callback({success : !err, message : err, response : res});
                });
            }
        });
    },
    viewTags: function viewTags(callback){
        db.view('recipes/tagsLatest', {}, (err, doc) => {
            callback(doc);
        });
    },
    /**
     * callback {function} takes an array argument which is passed to the callback
     */
    getComments: function getComments(callback){
        db.view('recipes/comments', {}, (err, doc) => {
            var result = [];
            if(!err){
                doc.forEach((value) => {
                    result.push(value);
                });
            }else{
                console.log("Error getting comments: " + err);
            }
            callback(result);
        });
    },
    addComment: function addComment(comment, callback){
        comment.doctype = "Comment";
        db.save(comment, callback);
    }
};