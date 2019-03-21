const express = require('express');
const router = express.Router({mergeParams:true});
const Losungen = require('../data');

router.get('/today', function(req, res) {
    const date = new Date();
    Losungen.get(date.getFullYear(),date.getMonthFormatted(),date.getDayFormatted(),function(data){
        res.json(data);
    });
});

router.get('/:year/:month/:day',function(req,res,next){
    const y = req.params.year;
    const m = req.params.month;
    const d = req.params.day;
    Losungen.get(y,m,d,function(data){
            res.json(data);
    });
});

module.exports = router;
