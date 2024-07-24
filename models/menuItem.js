const mongoose = require('mongoose')

const menuItem = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        required: true,
        enum: ['sweet ', 'spicy', 'sour'],

    },
    is_drink: {
        type: Boolean,
        required: true,
        default: false
    },
    num_sales: {
        type: Number,
        default: 0
    }

})
module.exports = mongoose.model('menuItem', menuItem)
