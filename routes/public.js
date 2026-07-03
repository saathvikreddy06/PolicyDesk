const express = require("express");
const { renderIndexPage, renderAboutPage, renderPlansPage, renderContactPage,
     renderCalculatorsPage, renderPremiumCalculator, renderRetirementCalculator, 
     renderEducationCalculator } = require("../controllers/publicController");
const router = express.Router();

router.get("/", renderIndexPage);

router.get("/home", renderIndexPage);

router.get("/about", renderAboutPage);

router.get("/plans", renderPlansPage);

router.get("/contact", renderContactPage);

router.get("/calculators", renderCalculatorsPage);

router.get("/calculators/premium", renderPremiumCalculator);

router.get("/calculators/retirement", renderRetirementCalculator);

router.get("/calculators/education", renderEducationCalculator);

module.exports = router;