const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const upload = require("../helpers/upload");
const profile = require("../controllers/profile");

router.route("/:profileid")
    .get(profile.getProfile)
    .put(auth.checkUserOwner, upload.single("image"), profile.updateProfile)
    .delete(auth.checkUserOwner, profile.deleteProfile);

router.route("/:profileid/edit")
    .get(auth.checkUserOwner, profile.editProfile);


module.exports = router;