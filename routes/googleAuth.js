const express = require("express");
const router = express.Router();
const passport = require("passport");
const {isGoogleUser} = require("../middleware");

router.get(
    "/auth/google",
    passport.authenticate(
        "google",
        {
            scope: ["profile", "email"]
        }
    )
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/home"
    }),
    (req, res) => {
        const redirectUrl =
            req.session.returnTo || "/home";

        delete req.session.returnTo;
        req.flash("success", "Google sign up successfull!");
        res.redirect(redirectUrl);
    }
);

router.get("/auth/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        res.redirect("/home");
    });
});

module.exports = router;