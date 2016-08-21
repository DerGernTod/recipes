var db = require("../gulptasks/couch").getDataBase();
module.exports = {
    
    add: function (req, res){
        var data = req.body;
        db.view('recipes/ingredients', {key : data.name}, (err, doc) => {
            if(err || doc.length){
                res.send({success : false, message : "Zutat '" + data.name + "' existiert bereits!"})
            }else{
                db.save({
                    doctype : "Ingredient",
                    created : Date.now(),
                    ingredientName : data.name
                }, (err, result) => {
                    res.send({success : !err, message : err, response : result});
                });
            }
        });
    },
    latest: function (req, res){
        db.view('recipes/ingredientsLatest', {}, (err, doc) => {
            res.send({
                success : !err,
                message : err,
                response : doc
            });
        });
    },
    remove: function (req, res){
        var data = req.body;
        db.remove(data.id, (err, result) => {
            res.send({
                success : !err,
                message : err
            });
        });
    },
    edit: function (req, res){
        var data = req.body;
        db.get(data.id, (err, result) => {
            db.view('recipes/ingredients', {key : data.name}, (err, doc) => {
                if(err || doc.length){
                    res.send({success : false, message : "Zutat '" + data.name + "' existiert bereits!"});
                }else{
                    result.ingredientName = data.name;
                    result.updated = Date.now();
                    db.save(data.id, result.rev, result,  (err2, res2) => {
                        res.send({
                            success : !(err2 && err),
                            message : err + ", " + err2,
                            response : result
                        });
                    });
                }
            });
        });
        
    },
    get: function (data, callback){

    }
};