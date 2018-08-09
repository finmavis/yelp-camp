const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const upload = require("../helpers/upload");
const camp = require("../controllers/camp");

router.route("/")
    .get(camp.getCamps)
    .post(auth.isLoggedin, upload.array("image", 10), camp.createCamp);

router.route("/new")
    .get(auth.isLoggedin, camp.newCamp);

router.route("/:campid")
    .get(camp.showCamp)
    .put(auth.checkCampOwner, upload.array("image", 10), camp.updateCamp)
    .delete(auth.checkCampOwner, camp.deleteCamp);

router.route("/:campid/edit")
    .get(auth.checkCampOwner, camp.editCamp);

module.exports = router;