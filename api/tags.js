const couch = require("../gulptasks/couch.js");
module.exports = {
    addTag : function addTag(req, res){
        var tagName = req.body.tagName;
        var time = req.body.timestamp;
        couch.addTag(req.body, (result) => {
            res.send(result);
        });
    },
    latestTags : function latestTags(req, res){
        couch.viewTags((result) => {
            res.send(result);
        });
    }
};