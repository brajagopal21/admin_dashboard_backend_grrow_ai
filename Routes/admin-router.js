const express = require("express");
const getAllUsers = require("../Controllers/admin-controller");
const router = express.Router();
router.route("/users").get(getAllUsers);
module.exports = router;
