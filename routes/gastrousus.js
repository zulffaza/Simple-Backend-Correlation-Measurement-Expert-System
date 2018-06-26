let express = require('express');
let router = express.Router();

let gastroususService = require('../services/gastrousus-service');

router.get('/symptoms', function (req, res) {
    gastroususService.findSymptoms(function (returnObj) {
        res.status(200);
        res.json(returnObj);
    })
});

router.post('/check/:method', function (req, res) {
    let method = req.params.method.toLocaleLowerCase();
    let body = req.body;

    res.status(200);

    switch (method) {
        case 'inner-product':
            gastroususService.calculateInnerProduct(body, function (returnObj) {
                res.json(returnObj);
            });
            break;
        case 'cosine':
            gastroususService.calculateCosine(body, function (returnObj) {
                res.json(returnObj);
            });
            break;
        default:
            res.json({
                message: "Method not found..."
            });
    }
});

module.exports = router;
