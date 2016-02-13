var express = require('express');
var router = express.Router();
var Losungen = require('../../data');
/* GET home page. */
router.get('/', function(req, res, next) {
    var date = new Date();
    Losungen.get(date,function(data){
        if(data.error){
            res.send(data.error.code);
        }
        else{
            res.json(data);
        }
    });
});

module.exports = router;
