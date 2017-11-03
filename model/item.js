/**
 * Created by Ansh Mehta on 11/1/2017.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var itemSchema = new Schema({
    itemName: {
        type: String
    },
    itemNumber: {
        type: String
    },
    itemPrice: {
        type: Number
    }
});

module.exports = mongoose.model('item', itemSchema);