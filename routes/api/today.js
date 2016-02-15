var express = require('express');
var router = express.Router();
var Losungen = require('../../data');
/* GET home page. */
router.get('/', function(req, res, next) {
    var date = new Date();
    Losungen.get(date.getFullYear(),date.getMonthFormatted(),date.getDate(),function(data){

            res.json(data);

    });
});

module.exports = router;
