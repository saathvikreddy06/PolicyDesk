const express = require("express");
const router = express.Router();

const { isLoggedIn, validatePolicy } = require("../middleware");
const { showPolicies, searchPolicies, showPolicy, editPolicy, saveChanges, deletePolicy } = require("../controllers/policiesController");
const asyncWrap = require("../utils/asyncWrapper");

router.get("/", isLoggedIn, asyncWrap(showPolicies));

router.get("/search", isLoggedIn, asyncWrap(searchPolicies));

router.get("/:id", isLoggedIn, asyncWrap(showPolicy));

router.get("/:id/edit", isLoggedIn, asyncWrap(editPolicy));

router.patch("/:id", isLoggedIn, validatePolicy, asyncWrap(saveChanges));

router.delete("/:id", isLoggedIn, asyncWrap(deletePolicy));

module.exports = router;