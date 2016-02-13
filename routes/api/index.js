var express = require('express');
var router = express.Router({mergeParams:true});
var today = require('./today');

var Losungen = require('../../data');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'API' });
    console.log(req.params);
});

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
    var date = new Date(req.params.year,req.params.month-1,req.params.day,1,0,0);
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
