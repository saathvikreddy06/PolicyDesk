const express = require("express");
const router = express.Router();

const {
    isLoggedIn,
    isGoogleUser,
    validateConsultation
} = require("../middleware");

const {
    renderConsultForm,
    createConsultation,
    showConsultations,
    markAsCompleted
} = require("../controllers/consultationsController");

const asyncWrap = require("../utils/asyncWrapper");

router.get("/consult/login", (req, res) => {
    res.render("consultLogin");
});

router.get(
    "/consult",
    isGoogleUser,
    renderConsultForm
);

router.post(
    "/consult",
    isGoogleUser,
    validateConsultation,
    asyncWrap(createConsultation)
);

router.get(
    "/admin/consultations",
    isLoggedIn,
    asyncWrap(showConsultations)
);

router.post(
    "/admin/consultations/:id/complete",
    isLoggedIn,
    asyncWrap(markAsCompleted)
);

module.exports = router;