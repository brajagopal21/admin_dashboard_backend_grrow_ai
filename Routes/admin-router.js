const express = require("express");
const getAllUsers = require("../Controllers/allUsers-controller");
const deleteUser = require("../Controllers/deleteUser-controller");
const router = express.Router();
router.route("/users").get(getAllUsers);
router.route("/users/:id").delete(deleteUser);
module.exports = router;
