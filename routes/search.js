const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const { renderSearchPage, renderSearchresults } = require("../controllers/searchController");
const asyncWrap = require("../utils/asyncWrapper");

router.get("/", isLoggedIn, renderSearchPage);

router.get("/results", isLoggedIn, asyncWrap(renderSearchresults));

module.exports = router;