const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const Consultation = require("./models/consultation.js");
const Policy = require("./models/policy.js");
const Customer = require("./models/customer.js");
const mongoose = require('mongoose');
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const {isLoggedIn, isGoogleUser} = require("./middleware.js");
const methodOverride = require("method-override");

const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");
const consultationRoutes = require("./routes/consultations");
const customerRoutes = require("./routes/customers");
const policyRoutes = require("./routes/policies");
const searchRoutes = require("./routes/search");
const {customError} = require("./utils/customError.js");
const passport = require("./config/passport");
const googleRoutes = require("./routes/googleAuth");


async function main() {
  await mongoose.connect(process.env.ATLAS_DB_URL);
}

main()
.then(() => {
    console.log("Connected to DB:)");
})
.catch(err => console.log(err));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(session({
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+ 24*60*60*1000,
        maxAge: 24*60*60*1000,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.agent = req.session.user;
    res.locals.googleUser = req.user;
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", publicRoutes);
app.use("/", authRoutes);
app.use("/", consultationRoutes);
app.use("/admin/customers", customerRoutes);
app.use("/admin/policies", policyRoutes);
app.use("/admin/search", searchRoutes);
app.use("/", googleRoutes);

app.use((req, res, next) => {
    next(new customError(400, "Page not found"));
});

app.use((err, req, res, next) => {
    let {status = 500, message = "Something went wrong!"} = err;
    res.render("error", {status,message});
});

app.listen(8080, () => {
    console.log("Server listening at port 8080");
});



