const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    realPassword: {type: String},
})

module.exports = mongoose.model("User", userSchema);