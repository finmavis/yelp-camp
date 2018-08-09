const mongoose = require("mongoose");

const campSchema = new mongoose.Schema({
    name: {type: String, required: [true, "can't be blank"]},
    description: {type: String, required: [true, "can't be blank"]},
    features: [String],
    activities: [String],
    image: [String],
    price: {type: Number, required: [true, "can't be blank"]},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstname: String,
        lastname: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Camp", campSchema);