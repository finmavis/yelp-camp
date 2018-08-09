const fs = require("fs");
const moment = require("moment");

const db = require("../models");
const sanitize = require("../helpers/sanitize");

const getCamps = async (req, res, next) => {
    try {
        const camps = await db.Camp.find({});
        res.render("camps/index", {id: "camps", camps});
    }
    catch(err) {
        return next(err);
    }
}

const createCamp = async (req, res, next) => {
    try {
        const newCamp = {
            name: sanitize(req.body.name),
            price: sanitize(req.body.price),
            description: sanitize(req.body.description),
            image: req.files.map(file => `/images/${file.filename}`),
            author: {
                id: req.user._id,
                firstname: req.user.firstname,
                lastname: req.user.lastname
            }
        }
        if(req.body.features.length > 1) {
            newCamp.features = req.body.features.map(feature => sanitize(feature));
        } else {
            newCamp.features = [sanitize(req.body.features)];
        }
        if(req.body.activities.length > 1) {
            newCamp.activities = req.body.activities.map(feature => sanitize(feature));
        } else {
            newCamp.activities = [sanitize(req.body.activities)];
        }

        const camp = await db.Camp.create(newCamp);
        req.flash("success", `Success created ${camp.name}`);
        res.redirect("/campgrounds");
    }
    catch(err) {
        return next(err);
    }
}

const newCamp = (req, res) => {
    res.render("camps/new", {id: "newCamps"});
}

const showCamp =  async (req, res, next) => {
    try {
        const camp = await db.Camp.findById(req.params.campid).populate("comments");
        res.render("camps/show", {id: "camps", camp, moment});
    }
    catch(err) {
        return next(err);
    }
}

const updateCamp = async (req, res, next) => {
    try {
        const editedCamp = {
            name: sanitize(req.body.name),
            price: sanitize(req.body.price),
            description: sanitize(req.body.description),
            image: req.body.images.concat(req.files.map(file => `/images/${file.filename}`))
        }
        if(req.body.features.length > 1) {
            editedCamp.features = req.body.features.map(feature => sanitize(feature));
        } else {
            editedCamp.features = [sanitize(req.body.features)];
        }
        if(req.body.activities.length > 1) {
            editedCamp.activities = req.body.activities.map(feature => sanitize(feature));
        } else {
            editedCamp.activities = [sanitize(req.body.activities)];
        }

        const camp = await db.Camp.findByIdAndUpdate(req.params.campid, editedCamp);
        req.flash("success", `Success updated ${camp.name}`);
        res.redirect("/campgrounds/" + camp._id);
    }
    catch(err) {
        return next(err);
    }
}

const editCamp = async (req, res, next) => {
    try {
        const camp = await db.Camp.findById(req.params.campid);
        res.render("camps/edit", {id: "editCamps", camp})
    }
    catch(err) {
        return next(err);
    }
}

const deleteCamp = async (req, res, next) => {
    try {
        const camp = await db.Camp.findByIdAndRemove(req.params.campid);
        camp.image.forEach(item => {
            fs.unlink(__dirname + "/../public" + item, (err) => err ? console.log(err) : null)
        });
        req.flash("success", `Success deleted ${camp.name}`);
        res.redirect("/campgrounds");
    }
    catch(err) {
        return next(err);
    }
}

module.exports = {
    getCamps,
    createCamp,
    newCamp,
    showCamp,
    updateCamp,
    editCamp,
    deleteCamp
}