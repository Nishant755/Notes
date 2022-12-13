const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    tittle: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    isdelete: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('notes', UserSchema)