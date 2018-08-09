const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"]},
    firstname: String,
    lastname: String,
    image: {type: String, default: "/images/profile-default.png"},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
    birthday: String,
    gender: String,
    join: {type: Date, default: Date.now},
    role: {type: String, default: "user"}
});

UserSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", UserSchema);