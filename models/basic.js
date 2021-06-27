const mongoose =  require('mongoose');

const basicSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{ type: String, required: true},
    age:{ type: Number, required: true},
    address:{type:String,required:true},
});


module.exports = mongoose.model('Basic', basicSchema);