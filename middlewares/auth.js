const db = require("../models");

const authObj = {};

authObj.isLoggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Please login first");
    res.redirect("/login");
};

authObj.checkCampOwner = function(req, res, next){
    if(req.isAuthenticated()){
        db.Camp.findById(req.params.campid, function(err, camp){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(camp.author.id.equals(req.user._id) || req.user.role === "admin"){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("/login");
    }
}

authObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        db.Comment.findById(req.params.commentid, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id) || req.user.role === "admin"){
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("/login");
    }
}

authObj.checkUserOwner = function(req, res, next){
    if(req.isAuthenticated()){
        db.User.findById(req.params.profileid, function(err, user){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                if(user._id.equals(req.user._id) || req.user.role === "admin"){
                    next();
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("/login");
    }
}

module.exports = authObj;