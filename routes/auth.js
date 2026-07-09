const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const {renderLoginForm, authenticateAgent,renderDashBoard,logout,renderDuePremiums} = require("../controllers/authController");
const asyncWrap = require("../utils/asyncWrapper");

router.get("/login", renderLoginForm);

router.post("/login", authenticateAgent);

router.get("/dashboard", isLoggedIn, asyncWrap(renderDashBoard));

router.get("/logout", isLoggedIn, logout);

router.get("/admin/premiums/due", isLoggedIn, asyncWrap(renderDuePremiums));

module.exports = router;