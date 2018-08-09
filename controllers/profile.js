const moment = require("moment");

const db = require("../models");
const sanitize = require("../helpers/sanitize");

const getProfile = async (req, res, next) => {
    try {
        const user = await db.User.findById(req.params.profileid);
        res.render("profile/index", {id: "profile", user, moment});
    }
    catch(err) {
        return next(err);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = {
            firstname: sanitize(req.body.firstname),
            lastname: sanitize(req.body.lastname),
            email: sanitize(req.body.email),
            birthday: sanitize(req.body.birthday),
            gender: sanitize(req.body.gender)
        }
        if(req.file) {
            updatedUser.image = `/images/${req.file.filename}`;
        }
        const user = await db.User.findByIdAndUpdate(req.params.profileid, updatedUser);
        req.flash("success", "Success updated Profile");
        res.redirect("/profile/" + user._id);

    }
    catch(err) {
        return next(err);
    }
}

const editProfile = async (req, res, next) => {
    try {
        const user = await db.User.findById(req.params.profileid);
        res.render("profile/edit", {id: "edit-profile", user});
    }
    catch(err) {
        return next(err);
    }
}

const deleteProfile = async (req, res, next) => {
    try {
        const user = await db.User.findByIdAndRemove(req.params.profileid);
        db.Camp.remove({"author.id": user._id});
        db.Comment.remove({"author.id": user._id});
        req.logout();
        req.flash("success", "Success deleted your Account");
        res.redirect("/campgrounds")
    }
    catch(err) {
        return next(err);
    }
}

module.exports = {
    getProfile,
    updateProfile,
    editProfile,
    deleteProfile
}