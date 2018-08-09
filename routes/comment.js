const express = require("express");
const router = express.Router({mergeParams:true});

const auth = require("../middlewares/auth");
const comment = require("../controllers/comment");

router.route("/")
    .post(auth.isLoggedin, comment.createComment);

router.route("/:commentid")
    .put(auth.checkCommentOwner, comment.updateComment)
    .delete(auth.checkCommentOwner, comment.deleteComment);

module.exports = router;