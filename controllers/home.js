const passport = require("passport");

const db = require("../models");
const sanitize = require("../helpers/sanitize");

const renderHome = (req, res) => {
    res.render("index" , {id: "home"});
}

const renderLogin = (req, res) => {
    res.render("login", {id: "login"});
}

const authUser = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        let redirectUrl = "/campgrounds";
        if (err){
            return next(err);
        }
        if (!user){
            req.flash("error", "Username or Passwords don't match")
            return res.redirect("/login");
        }
        if (req.session.redirectUrl) {
            redirectUrl = req.session.redirectUrl;
            req.session.redirectUrl = null;
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
        });
        req.flash("success", `Welcome back ${user.firstname} ${user.lastname}`);
        res.redirect(redirectUrl);
    })(req, res, next);
}

const renderSignup = (req, res) => {
    res.render("signup", {id: "signup"});
}

const userRegister = (req, res) => {
    const newUser = {
        username: sanitize(req.body.username),
        firstname: sanitize(req.body.firstname),
        lastname: sanitize(req.body.lastname),
        email: sanitize(req.body.email),
        birthday: sanitize(req.body.birthday),
        gender: sanitize(req.body.gender)
    }

    db.User.register(newUser, req.body.password)
        .then(user => {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", `Welcome to YelpCamp ${user.firstname} ${user.lastname}`);
                res.redirect("/campgrounds");
            });
        })
}

const userLogout = (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
}

const handleErrorRoute = (req, res) => {
    res.render("error/route");
}

module.exports = {
    renderHome,
    renderLogin,
    authUser,
    renderSignup,
    userRegister,
    userLogout,
    handleErrorRoute
}