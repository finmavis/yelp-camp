const mongoose = require("mongoose");

const Camp = require("./campground");
const Comment = require("./comment");
const User = require("./user");

const config = require("../config");

mongoose.connect(config.db.url, {useNewUrlParser: true})
    .then(console.log("Database Connected to " + config.db.url))
    .catch(err => console.log(err.message));

mongoose.Promise = global.Promise;

module.exports = {
    Camp,
    Comment,
    User
}