const express = require("express");
const signupUser = require("../Controllers/signup-controller");
const loginUser = require("../Controllers/login-controller");
const router = express.Router();
router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);
module.exports = router;
