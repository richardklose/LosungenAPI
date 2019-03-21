var express = require('express');
var router = express.Router({mergeParams:true});
var today = require('./today');

var Losungen = require('../../data');
/* GET home page. */
/*router.get('/', function(req, res, next) {
    res.render('api', { title: 'LosungenAPI | API Dokumentation' });
});*/

router.use('/today',today);

//add a route for each year with a valid xml file in data/xml
/*Losungen.availableYears(function(years){
    for(var i in years) {
        router.get('/' + years[i], function (req, res, next) {
            console.log(years[i]);
        });
    }
});*/

router.get('/:year/:month/:day',function(req,res,next){
    console.log(req.params);
    var y = req.params.year;
    var m = req.params.month;
    var d = req.params.day;
    Losungen.get(y,m,d,function(data){

            res.json(data);

    });
});



module.exports = router;
