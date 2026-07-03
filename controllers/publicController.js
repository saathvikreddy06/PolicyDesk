module.exports.renderIndexPage = (req, res) => {
    res.render("index.ejs");
}

module.exports.renderAboutPage = (req, res) => {
    res.render("about.ejs");
}

module.exports.renderPlansPage = (req, res) => {
    res.render("plans.ejs");
}

module.exports.renderContactPage = (req, res) => {
    res.render("contact.ejs");
}

module.exports.renderCalculatorsPage = (req, res) => {
    res.render("calc/calc.ejs");
}

module.exports.renderPremiumCalculator = (req, res) => {
    res.render("calc/premCalc.ejs");
}

module.exports.renderRetirementCalculator = (req, res) => {
    res.render("calc/retCalc.ejs");
}

module.exports.renderEducationCalculator = (req, res) => {
    res.render("calc/eduCalc.ejs");
}