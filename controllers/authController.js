const Customer = require("../models/customer");
const Policy = require("../models/policy");
const Consultation = require("../models/consultation");

module.exports.renderLoginForm = (req, res) => {
    res.render("login.ejs");
}

module.exports.authenticateAgent = (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        req.session.user = username;

        req.flash(
            "success",
            "Login successful!"
        );

        return res.redirect(
            "/dashboard"
        );
    }

    req.flash(
        "error",
        "Username or Password Incorrect"
    );

    res.redirect("/login");
}

module.exports.renderDashBoard = async (req, res) => {
    const pendingConsultations =
    await Consultation.countDocuments({
        status: "Pending"
    });

    const totalCustomers =
    await Customer.countDocuments();
    const totalPolicies =
        await Policy.countDocuments();
    res.render(
        "dashboard.ejs",
        {
            pendingConsultations,
            totalCustomers,
            totalPolicies
        }
    );
}

module.exports.logout = (req, res) => {
        req.session.user = "";

        req.flash(
            "success",
            "Logout successful!"
        );

        res.redirect("/home");
    }