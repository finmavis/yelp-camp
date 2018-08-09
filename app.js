const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyparser = require("body-parser");
const passport = require("passport");
const localstrategy = require("passport-local");
const flash = require("connect-flash");

const campRoute = require("./routes/camp");
const commentRoute = require("./routes/comment");
const profileRoute = require("./routes/profile");
const indexRoute = require("./routes/index");

const db = require("./models");
const config = require("./config");

app.use(express.static(__dirname + "/public", {maxage:"4h"}));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/campgrounds", campRoute);
app.use("/campgrounds/:campid/comments", commentRoute);
app.use("/profile", profileRoute);
app.use(indexRoute);

app.use(function (err, req, res, next) {
    if(err.kind === 'ObjectId'){
        return res.render("error/route");
    }
    console.error(err);
    res.status(500).render("error/server");
    res.end();
});

app.listen(1234, process.env.IP, () => {
    console.log("Server Started!");
});