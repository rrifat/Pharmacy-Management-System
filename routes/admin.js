const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var db = require('../db');
var async = require('async');
var mysql = require('mysql');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
    res.render('view_admin');
});

router.get('/user', function (req, res) {
    res.render('view_welcome');
});

router.get('/logout', function (req, res) {
        res.redirect('/login');
});


router.get('/sale', function (req, res) {
    var query = "SELECT b.*, m.Medicine_Name, s.Supplier_Name FROM batch b INNER JOIN medicine_information m on b.Medicine_ID = m.ID INNER JOIN supplier s on b.Supplier_ID = s.ID";

    db.getData(query, null, function (rows) {
        var data = {
            'batch': rows
        };
        res.render('new_sale', data);
    });
});

router.post('/sale', function (req, res) {
    var billInfo = {
        invoice_no :      req.body.invoice_number,
        total_amount:     req.body.totalAmount,
        discount:         req.body.discount,
        discount_amount:  req.body.discountAmount,
        total_payable:    req.body.totalPayable,
        paid:             req.body.paid,
        returned :        req.body.return,
        date :            req.body.entry_date
    };
    console.log(billInfo);
    var query = "INSERT INTO Bill_Information SET ?";
    db.getData(query, [billInfo], function (rows) {
        console.log(rows);
        res.redirect('/admin/sale');
    });
});

router.get('/saleshistory', function (req, res) {
    var query = "SELECT * FROM bill_information";
    db.getData(query, null, function (rows) {
        var data = {
            'billInfo': rows
        };
        res.render('sales_history', data);
    });
});



router.get('/genericname', function (req, res) {
    var query = "SELECT * FROM drug_generic_name";
    db.getData(query, null, function (rows) {
        var data = {
            'generic': rows
        };
        res.render('generic_name_index', data);
    });
});

router.get('/genericname/create', function (req, res) {
    res.render('generic_name_create');
});

router.post('/genericname/create', function (req, res) {
    var generic = {
        generic_name     : req.body.generic_name,
        description      : req.body.description
    };
    console.log(generic);
    var query = "INSERT INTO drug_generic_name SET ?";
    db.getData(query, [generic], function (rows) {
        console.log(rows);
        res.redirect('/admin/genericname');
    });
});

router.get('/genericname/edit/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM drug_generic_name WHERE ID = ? ";

    db.getData(query, [id], function (rows) {
        var data = {'genericNameEdit': rows[0]};
        res.render('generic_name_edit', data);
    });
});

router.post('/genericname/edit/:id', function (req, res) {

        var id = req.params.id;
        var genericUpdate = {
            Generic_Name : req.body.generic_name,
            Description : req.body.description,
        };
        var query = "UPDATE drug_generic_name SET ? WHERE ID = ?";
        db.getData(query, [genericUpdate,id], function (rows) {
        res.redirect('/admin/genericname');
        });

});

router.get('/genericname/delid=:id', function (req, res) {
        var id = req.params.id;
        var query = "DELETE FROM drug_generic_name WHERE ID = ?";
        db.getData(query, [id], function (rows) {
        res.redirect('/admin/genericname');
        });
});


router.get('/batch', function (req, res) {
    var query = "SELECT b.*, m.Medicine_Name, s.Supplier_Name FROM batch b INNER JOIN medicine_information m on b.Medicine_ID = m.ID INNER JOIN supplier s on b.Supplier_ID = s.ID";
    db.getData(query, null, function (rows) {
        var data = {
            'batch': rows
        };
        console.log(data);
        res.render('batch_index', data);
    });
});

router.get('/batch/create', function (req, res) {

  var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'pharmacy'
  });

  var medicineName = "SELECT * FROM Medicine_Information";
  var supplier = "SELECT * FROM Supplier";
  async.parallel([
      function (callback) {
      connection.query(medicineName,callback)
      },
      function (callback) {
      connection.query(supplier,callback)
      }], function (err, rows) {
      //console.log(RowDataPacket);
      res.render('batch_create', {medicinename: rows[0][0], suppliername: rows[1][0]});
      }
  );
});

router.post('/batch/create', function (req, res) {
    var batch = {
        Batch_ID            : req.body.batch_id,
        Quantity            : req.body.quantity,
        Cost_Price          : req.body.cost_price,
        Sell_Price          : req.body.sell_price,
        Production_Date     : req.body.production_date,
        Expire_Date         : req.body.expire_date,
        Medicine_ID         : req.body.medicine_name,
        Supplier_ID         : req.body.supplier_name
    };
    console.log(batch);
    var query = "INSERT INTO Batch SET ?";
    db.getData(query, [batch], function (rows) {
        console.log(rows);
        res.redirect('/admin/batch');
    });
});


router.get('/batch/edit/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM batch WHERE Batch_ID = ? ";

    db.getData(query, [id], function (rows) {
        var data = {'batchInfoEdit': rows[0]};
        res.render('batch_edit', data);
    });
});

router.post('/batch/edit/:id', function (req, res) {

        var id = req.params.id;
        var batchUpdate = {
            Sell_Price : req.body.sellPrice,
        };
        var query = "UPDATE batch SET ? WHERE Batch_ID = ?";
        db.getData(query, [batchUpdate,id], function (rows) {
        res.redirect('/admin/batch');
   });

});

router.get('/batch/delid=:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        var query = "DELETE FROM batch WHERE Batch_ID = ?";
        db.getData(query, [id], function (rows) {
        res.redirect('/admin/batch');
        });
});

router.get('/category', function (req, res) {
    var query = "SELECT * FROM category";
    db.getData(query, null, function (rows) {
        var data = {
            'category': rows
        };
        res.render('category_index', data);
    });
});

router.get('/category/create', function (req, res) {
    res.render('category_create');
});

router.post('/category/create', function (req, res) {
    var category = {
        category  : req.body.category,
    };
    var query = "INSERT INTO category SET ?";
    db.getData(query, [category], function (rows) {
        console.log(rows);
        res.redirect('/admin/category');
    });
});


router.get('/category/edit/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM category WHERE ID = ? ";

    db.getData(query, [id], function (rows) {
        var data = {'categoryEdit': rows[0]};
        res.render('category_edit', data);
    });
});

router.post('/category/edit/:id', function (req, res) {

        var id = req.params.id;
        var categoryUpdate = {
            Category : req.body.category,
        };
        var query = "UPDATE category SET ? WHERE ID = ?";
        db.getData(query, [categoryUpdate,id], function (rows) {
        res.redirect('/admin/category');
   });

});

router.get('/category/delid=:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        var query = "DELETE FROM Category WHERE ID = ?";
        db.getData(query, [id], function (rows) {
        res.redirect('/admin/category');
        });
});


router.get('/manufacturer', function (req, res) {
    var query = "SELECT * FROM manufacturer";
    db.getData(query, null, function (rows) {
        var data = {
            'manufacturer': rows
        };
        res.render('manufacturer_index', data);
    });
});

router.get('/manufacturer/create', function (req, res) {
    res.render('manufacturer_create');
});

router.post('/manufacturer/create', function (req, res) {
    var manufacturer = {
        manufacturer_name  : req.body.manufacturer_name,
    };
    var query = "INSERT INTO manufacturer SET ?";
    db.getData(query, [manufacturer], function (rows) {
        console.log(rows);
        res.redirect('/admin/manufacturer');
    });
});


router.get('/manufacturer/edit/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM manufacturer WHERE ID = ? ";

    db.getData(query, [id], function (rows) {
        var data = {'manufacturerNameEdit': rows[0]};
        res.render('manufacturer_edit', data);
    });
});

router.post('/manufacturer/edit/:id', function (req, res) {

        var id = req.params.id;
        var manufacturerUpdate = {
            Manufacturer_Name : req.body.manufacturer_name,
        };
        var query = "UPDATE manufacturer SET ? WHERE ID = ?";
        db.getData(query, [manufacturerUpdate,id], function (rows) {
        res.redirect('/admin/manufacturer');
   });

});

router.get('/manufacturer/delid=:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        var query = "DELETE FROM Manufacturer WHERE ID = ?";
        db.getData(query, [id], function (rows) {
        res.redirect('/admin/manufacturer');
        });
});




router.get('/medicine', function (req, res) {
    var query = "SELECT m.*, g.Generic_Name, z.Manufacturer_Name, p.Category FROM medicine_information m INNER JOIN drug_generic_name g on m.Generic_ID = g.ID INNER JOIN manufacturer z on m.Manufacturer_ID = z.ID INNER JOIN category p on m.Category_ID = p.ID";
    db.getData(query, null, function (rows) {
        var data = {
            'medicine': rows
        };
        res.render('medicine_index', data);
    });
});

router.get('/medicine/create', function (req, res) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pharmacy'
    });

    var generic = "SELECT * FROM drug_generic_name";
    var manufacturer = "SELECT * FROM manufacturer";
    var category = "SELECT * FROM category";
    async.parallel([
        function (callback) {
        connection.query(generic,callback)
        },
        function (callback) {
        connection.query(manufacturer,callback)
        },
        function (callback) {
        connection.query(category,callback)
        }], function (err, rows) {
        //console.log(RowDataPacket);
        res.render('medicine_create', {genericname: rows[0][0], manufacturername: rows[1][0], categoryname:rows[2][0]});
        }
    );

});

router.post('/medicine/create', function (req, res) {
    var medicine = {
        Medicine_Name       : req.body.medicine_name,
        Category_ID         : req.body.category,
        Generic_ID          : req.body.generic_name,
        Manufacturer_ID     : req.body.manufacturer_name
    };
    console.log(medicine);
    var query = "INSERT INTO Medicine_Information SET ?";
    db.getData(query, [medicine], function (rows) {
        console.log(rows);
        res.redirect('/admin/medicine');
    });
});

router.get('/medicine/edit/:id', function (req, res) {

    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password: '',
        database: 'pharmacy'
    });

    var id = req.params.id;
    var query = "SELECT * FROM medicine_information WHERE ID = ? ";
    var genricName = "SELECT * FROM drug_generic_name";
    var manufacturerName = "SELECT * FROM manufacturer";
    var categoryName = "SELECT * FROM category";


    async.parallel([
        function (callback) {
          connection.query(query, [id], callback)
        },
        function (callback) {
          connection.query(genricName, callback)
        },
        function (callback) {
          connection.query(manufacturerName, callback)
        },
        function (callback) {
          connection.query(categoryName, callback)
        }], function (err, rows) {
            res.render('medicine_edit', {medInfo: rows[0][0], dGenericName: rows[1][0], manuName: rows[2][0], cateName: rows[3][0]});
        }
    );
});

router.post('/medicine/edit/:id', function (req, res) {

        var id = req.params.id;
        var medicineUpdate = {
        Medicine_Name : req.body.medicine_name,
        Category_ID : req.body.categoryname,
        Generic_ID : req.body.genericName,
        Manufacturer_ID: req.body.manuName
      };
      var query = "UPDATE medicine_information SET ? WHERE ID = ?";
      db.getData(query, [medicineUpdate, id], function (rows) {
      res.redirect('/admin/medicine');
      });

});


router.get('/medicine/delid=:id', function (req, res) {
        var id = req.params.id;
        var query = "DELETE FROM medicine_information WHERE ID = ?";
        db.getData(query, [id], function (rows) {
        res.redirect('/admin/medicine');
        });
});



router.get('/usermanagement', function (req, res) {

    var query = "SELECT A.Name,A.Email,A.Gender,A.Date_of_Birth,A.Age,A.Address,A.Contact,A.Blood_Group,A.Marital_Status,A.Join_Date,A.Salary,A.Username,B.Password,B.Usertype FROM user_information A INNER JOIN user_access B ON A.Username=B.Username;";
    db.getData(query, null, function (rows) {
        var data = {
            'userInformation': rows
        };
        res.render('user_management_index', data);
    });
});

router.get('/usermanagement/create', function (req, res) {
    res.render('user_management_create');
});

router.post('/usermanagement/create', function (req, res) {
    var user_infromation = {
        Name                : req.body.name,
        Email               : req.body.email,
        Gender              : req.body.gender,
        Date_of_Birth       : req.body.user_dob,
        Age                 : req.body.age,
        Address             : req.body.address,
        Contact             : req.body.contact,
        Blood_Group         : req.body.blood_group,
        Marital_Status      : req.body.marital_status,
        Join_Date           : req.body.join_date,
        Salary              : req.body.salary,
        Username            : req.body.username
    };
    var user_access = {
        Username            : req.body.username,
        Password            : req.body.password,
        Usertype            : req.body.usertype,
    };
    console.log(user_infromation);
    console.log(user_access);
    var userAccessQuery = "INSERT INTO User_Access SET ?";
    var userInfoQuery   = "INSERT INTO User_Information SET ?";

    db.getData(userAccessQuery, [user_access], function (rows) {
        db.getData(userInfoQuery, [user_infromation], function (err, rows){
            res.redirect('/admin/usermanagement');
        });
    });
});

router.get('/usermanagement/edit/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM user_information WHERE Username = ? ";

    db.getData(query, [id], function (rows) {
        var data = {'userInfoEdit': rows[0]};
        res.render('user_management_edit', data);
    });
});

router.post('/usermanagement/edit/:id', function (req, res) {

        var id = req.params.id;
        var userUpdate = {
            Name : req.body.name,
            Email : req.body.email,
            Age : req.body.age,
            Address : req.body.address,
            Contact : req.body.contact,
            Salary : req.body.salary,
        };
        var query = "UPDATE user_information SET ? WHERE Username = ?";
        db.getData(query, [userUpdate,id], function (rows) {
        res.redirect('/admin/usermanagement');
   });

});

router.get('/usermanagement/delid=:id', function (req, res) {
        var id = req.params.id;
        var query = "DELETE FROM user_access WHERE Username = ?";
        var query2 = "DELETE FROM user_information WHERE Username = ?";

        db.getData(query, [id], function (rows) {
            db.getData(query2, [id], function (rows) {
                  res.redirect('/admin/usermanagement');
                });
        });
});



router.get('/supplier', function (req, res) {
    var query = "SELECT * FROM Supplier";
    db.getData(query, null, function (rows) {
        var data = {
            'supplier': rows
        };
        res.render('supplier_index', data);
    });
});

router.get('/supplier/create', function (req, res) {
    res.render('supplier_create');
});

router.post('/supplier/create', function (req, res) {
    var supplier = {
        Supplier_Name       : req.body.supplier_name,
        Contact             : req.body.contact,
        Email               : req.body.email,
    };
    console.log(supplier);
    var query = "INSERT INTO Supplier SET ?";
    db.getData(query, [supplier], function (rows) {
        console.log(rows);
        res.redirect('/admin/supplier');
    });
});

router.get('/supplier/edit/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM Supplier WHERE ID = ? ";

    db.getData(query, [id], function (rows) {
        var data = {'supplierEdit': rows[0]};
        res.render('supplier_edit', data);
    });
});

router.post('/supplier/edit/:id', function (req, res) {

        var id = req.params.id;
        var supplierUpdate = {
            Supplier_Name : req.body.supplier_name,
            Contact : req.body.contact,
            Email : req.body.email,
        };
        var query = "UPDATE Supplier SET ? WHERE ID = ?";
        db.getData(query, [supplierUpdate,id], function (rows) {
        res.redirect('/admin/supplier');
        });

});

router.get('/supplier/delid=:id', function (req, res) {
        var id = req.params.id;
        var query = "DELETE FROM supplier WHERE ID = ?";
        db.getData(query, [id], function (rows) {
        res.redirect('/admin/supplier');
        });
});



router.get('/add_batch', function (req, res) {
    var query = "SELECT mdicine_name FROM medicine_information";
    db.getData(query, null, function (rows) {
        //console.log(rows);
        var data = {'medName': rows};
        res.render('view_add_batch', data);
    });
});

router.get('/add_batch/:id', function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM medicine_information WHERE medicine_id = ?";
    db.getData(query, [id], function (rows) {
        var data = {'mname': rows[0]};
        res.render('view_add_batch', data);
        //res.redirect('/admin/add_medicine');
    });
});

router.post('/add_batch/:id', function (req, res) {
    var id = req.params.id;
    var batchInfo = {
        batch_id       : req.body.batch_id,
        stored_qty     : req.body.stored_qty,
        cost_price     : req.body.cost_price,
        sell_price     : req.body.sell_price,
        production_date: req.body.production_date,
        expire_date    : req.body.expire_date,
        purchase_id    : req.body.purchase_id,
        medicine_id    : req.body.medicine_id
    };
    console.log(batchInfo);
    //var query = "SELECT * FROM medicine_information WHERE medicine_id = ?";
    //db.getData(query, [id], function (rows) {
    //    var data = {'mname': rows[0]};
    //    res.render('view_add_batch', data);
    res.redirect('/admin/add_medicine');
    //});
});

module.exports = router;
