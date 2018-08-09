const express = require("express");
const router = express.Router();

const home = require("../controllers/home");

router.route("/")
    .get(home.renderHome);

router.route("/login")
    .get(home.renderLogin)
    .post(home.authUser);

router.route("/signup")
    .get(home.renderSignup)
    .post(home.userRegister);

router.route("/logout")
    .get(home.userLogout);

router.all("*", home.handleErrorRoute);

module.exports = router;