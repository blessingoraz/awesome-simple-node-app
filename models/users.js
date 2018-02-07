const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    create_at: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;
