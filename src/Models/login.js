const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
   email:{
    type:String,
    require:[true,"email id is must be prrsent"]
   },
   password:{
    type:String,
    require:[true,"password must be require for login"]
   }

})

module.exports = mongoose.model('login', NotesSchema)