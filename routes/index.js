var express = require('express');
var router = express.Router();

var order = require('../model/orders.js');
var item = require('../model/item.js');
var randomstring = require("randomstring");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FoodPark' });
});
// to see all the orders
router.get('/orders/', function(req, res, next) {
    order.find({}).exec(function(error,allOrders) {
        res.render('orders', {
            order: allOrders,
            title:'Orders | FoodPark' ,
            msg:""
        });
    });
});
// to see all the orders
router.post('/orderAdded', function(req, res, next) {
    var orderNo = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });
    var data = new order({
        customerName: req.body.customerName,
            customerContact: req.body.customerContact,
            orderDetail: {
                item : req.body.orderItem,
                qty : req.body.qty,
                price : req.body.priceOfOrder
            },
            orderNo : orderNo,
            tableNumber: req.body.tableNumber,
            totalPrice: req.body.qty *  req.body.priceOfOrder
    });
    data.save(function (err, doc) {
        if (err) {
            throw err;
        }
        else {
            order.find({}).exec(function(error,allOrders){
                res.render('orders',{
                    title: 'FoodPark' ,
                    order : allOrders,
                    msg : "Order Placed Successfully."
                });
            });
        }
    });
});
//to edit an orders
router.get('/editOrder/:_id',function(req,res,next){
    var editId=req.params._id;
    order.find({'_id' : editId}).exec(function(error,oneOrder){
        res.render('editOrder',{
            title: 'FoodPark | Edit Order' ,
            order : oneOrder[0],
            msg : ""
        });
    });
})
router.post('/editOrder/:_id', function(req, res, next) {
    var editId = req.params._id;
    var data=req.body;
    order.update({'_id' : editId},
        {$set: {
            customerName: data.customerName,
            customerContact : data.customerContact,
            orderDetail: {
                item : data.orderItem,
                qty : data.qty,
                price : data.priceOfOrder
            },
            tableNumber: data.tableNumber,
            totalPrice: data.qty *  data.priceOfOrder
        }},
        function (err, data) {
            if(err){
                throw err;
            }
            res.redirect('/orders');
    });

});


// MENU Part
// to see the menu
// to add items to the menu
// to edit te items and prices in the menu
//to delete an item from the menu

// to see the menu
router.get('/menu', function(req, res, next) {
    item.find({}).exec(function(err,doc){
        if (err)
            throw err;
        res.render('menu',{
            title : "FoodPark | Menu",
            item : doc
        });
    });
});
// to add items to the menu
router.post('/addedItem', function(req, res, next) {
    var itemNo = randomstring.generate({
        length: 5,
        charset: 'numeric'
    });
    var data = new item({
        itemName: req.body.itemName,
        itemNumber: itemNo,
        itemPrice : req.body.itemPrice
    });
    data.save(function (err, success) {
        if (err) {
            throw err;
        }
        else {
            item.find({}).exec(function(error,allItem){
                res.render('menu',{
                    title: 'FoodPark' ,
                    item : allItem,
                    msg : "Item added Successfully."
                });
            });
        }
    });
});
router.get('/editItem/:_id',function(req,res,next){
    var editId=req.params._id;
    item.find({'_id' : editId}).exec(function(error,oneItem){
        res.render('editMenu',{
            title: 'FoodPark | Edit Menu' ,
            item : oneItem[0]
        });
    });
})
// to edit te items and prices in the menu
router.post('/editItem/:_id', function(req, res, next) {
    var editId = req.params._id;
    var data=req.body;
    item.update({'_id' : editId},
        {$set: {
            itemName: req.body.itemName,
            itemContact: req.body.itemContact,
            itemPrice : req.body.itemPrice
        }},
        function (err, data) {
            if(err){
                throw err;
            }
            res.redirect('/menu');
        });
});
//to delete an item from the menu
router.get('/delete/:_id', function(req, res, next) {
    item.find({'_id': req.params._id}).remove().exec(function(err,data){
        console.log(data);
        if(err)
            throw err;
        res.redirect('/menu');
    });
});
//to delete an order
router.get('/:_id', function(req, res, next) {
    var editId = req.params._id;
    order.update({'_id' : editId},
        {$set: {delivered : true}},
        function (err, data) {
            if(err){
                throw err;
            }
            order.find({}).exec(function(error,allOrders){
                res.render('orders',{
                    title: 'FoodPark' ,
                    order : allOrders,
                    msg : "Order Added to delivered list Successfully."
                });
            });
        });
});

module.exports = router;
