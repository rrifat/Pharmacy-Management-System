const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var db = require('../db');


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
    res.render('view_login', {
        title:'User Login',
        success: req.session.success,
        errors: req.session.errors
    });

    req.session.errors = null;
    req.session.success = null;
});





router.post('/add', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var userRole = req.body.selectrole;

    /*req.check('password', 'minimum 5 caharacer required').isLength({min: 5});
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    }
    else {
        req.session.success = true;
    }*/


    var query = "SELECT * FROM user_access WHERE username = ? AND password = ?";
    db.getData(query, [username, password], function (rows) {
            console.log(rows[0]);
            if (!rows[0]) {
                res.render('view_login', {
                title:'User Login',
              });
            }

            else {
                if (rows[0].Usertype == 'Admin') {
                    res.render('view_admin', {
                    });
                }

                else if (rows[0].Usertype == 'Staff') {
                    res.render('view_welcome', {
                    });
                }
            }
    });
});

    /*var query = "SELECT * FROM user_access WHERE username = ? AND password = ? AND usertype = ?";
    db.getData(query, [username, password, userRole], function (rows) {
        if (rows[0]) {
            res.render('view_admin', {
                success: req.session.success
            });
        } else {
            res.render('view_login', {
                title:'User Login',
                success: req.session.success,
                errors: req.session.errors
            });
        }
    });*/


module.exports = router;
