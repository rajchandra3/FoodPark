/**
 * Created by Ansh Mehta on 11/1/2017.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var orderSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerContact : {
        type: Number
    },
    tableNumber : {
        type: Number
    },
    orderNo : {
        type : String
    },
    orderTime :{
        type: Date,
        default : Date.now
    },
    orderDetail : [{
        item: {type: String},
        qty: {type: Number},
        price: {type: Number}
    }],
    totalPrice: {
        type: Number
    },
    delivered : {
        type: Boolean,
            default : false
    }
});



var order = mongoose.model('order', orderSchema);


module.exports = order;