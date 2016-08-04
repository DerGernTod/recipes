const couch = require("../gulptasks/couch.js");
module.exports = {
    addTag : function addTag(req, res){
        couch.addTag(req.body, data => res.send(data));
    },
    latestTags : function latestTags(req, res){
        couch.viewTags(data => res.send(data));
    },
    deleteTag : function deleteTag(req, res){
        couch.removeTag(req.body, data => res.send(data));
    }
};