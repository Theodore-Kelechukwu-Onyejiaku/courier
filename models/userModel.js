const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String},
    name: {type: String},
    password: {type: String},
    realPassword: {type: String},
    admin: {type: Boolean, default:true}
})

module.exports = mongoose.model("User", userSchema);