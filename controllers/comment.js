const ObjectId = require("mongoose").Types.ObjectId;

const db = require("../models");
const sanitize = require("../helpers/sanitize");

const createComment = async (req, res, next) => {
    try {
        const newComment = {
            text: sanitize(req.body.review)
        }

        const campDB = db.Camp.findById(req.params.campid);
        const commentDB = db.Comment.create(newComment);
        const camp = await campDB;
        const comment = await commentDB;
        comment.author.id = req.user._id;
        comment.author.firstname = req.user.firstname;
        comment.author.lastname = req.user.lastname;
        comment.author.image = req.user.image;
        comment.save();
        camp.comments.push(comment);
        camp.save();
        req.flash("success", "Success added new comment!");
        res.redirect("/campgrounds/" + camp._id);
    }
    catch(err) {
        return next(err);
    }
}

const updateComment = async (req, res, next) => {
    try {
        const newComment = {
            text: sanitize(req.body.updatereview)
        }

        const comment = await db.Comment.findByIdAndUpdate(req.params.commentid, newComment);
        req.flash("success", "Success edited your comment!");
        res.redirect("/campgrounds/" + req.params.campid)
    }
    catch(err) {
        return next(err);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const comment = await db.Comment.findByIdAndRemove(req.params.commentid);
        db.Camp.update({_id: req.params.campid}, {$pull: {comments: new ObjectId(comment._id)}});
        req.flash("success", "Success deleted your comment!");
        res.redirect("/campgrounds/" + req.params.campid)
    }
    catch(err) {
        return next(err);
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment
}