const { login, signUp } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.route("/login").post(login);
router.route("/signUp").post(signUp);

module.exports = router;
