const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courierSchema = new Schema({
    sender_fullname: {type: String},
    sender_email: {type: String},
    sender_phone: {type: String},
    sender_address: {type: String},
    sender_country: {type: String},
    sender_state: {type: String},
    sender_zip_code: {type: String},
    secret_question: {type: String},

    receiver_fullname: {type: String},
    receiver_email: {type: String},
    receiver_phone: {type: String},
    receiver_address: {type: String},
    receiver_country: {type: String},
    receiver_state: {type: String},
    receiver_zip_code: {type: String},
    secret_answer: {type: String},

    package_description: {type: String},
    package_type: {type: String},
    duration: {type: String},
    time_initiated: {type: String},
    image: {type: String},
})

module.exports = mongoose.model("User", userSchema);