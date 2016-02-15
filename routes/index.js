var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'LosungenAPI'});
});

router.get('/impressum', function (req, res, next) {
    res.render('impressum', {title: 'LosungenAPI | Impressum'});
});
module.exports = router;
