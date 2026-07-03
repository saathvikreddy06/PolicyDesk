const { consultationSchema, customerSchema, policySchema } = require("./joi/schema");
const {customError} = require("./utils/customError");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.session.user) {
        req.flash("error", "Please login to continue");
        return res.redirect("/login");
    }
    next();
}

module.exports.validateConsultation = (req,res,next) => {
    let {error} = consultationSchema.validate(req.body);
    if(error) {
        console.log(error);
        throw new customError(400, error.details[0].message);
    }
    next();
}

module.exports.validateCustomer = (req,res,next) => {
    let {error} = customerSchema.validate(req.body);
    if(error) {
        console.log(error);
        throw new customError(400, error.details[0].message);
    }
    next();
}

module.exports.validatePolicy = (req,res,next) => {
    let {error} = policySchema.validate(req.body);
    if(error) {
        console.log(error);
        throw new customError(400, error.details[0].message);
    }
    next();
}

module.exports.isGoogleUser =
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.session.returnTo = req.originalUrl;
            req.flash(
                "error",
                "Please sign in with Google to continue."
            );

            return res.redirect(
                "/consult/login"
            );
        }

        next();
    };