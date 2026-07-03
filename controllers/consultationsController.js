const Consultation = require("../models/consultation");

module.exports.renderConsultForm = (req, res) => {
    console.log(req.user);

    res.render("consult.ejs", {
        googleUser: req.user
    });
};
module.exports.saveConsultForm = async (req, res) => {
        const consultation =
            new Consultation(
                req.body
            );

        await consultation.save();

        req.flash(
            "success",
            "Consultation sent successfully!"
        );

        res.redirect("/home");
}

module.exports.showConsultations = async (req, res) => {
        const consultations =
            await Consultation.find()
                .sort({
                    createdAt: -1
                });

        res.render(
            "admin/consultations",
            {
                consultations
            }
        );
    }

module.exports.markAsCompleted = async (req, res) => {
        await Consultation
            .findByIdAndUpdate(
                req.params.id,
                {
                    status:
                        "Completed"
                }
            );

        res.redirect(
            "/admin/consultations"
        );
    }

module.exports
.createConsultation =
async (req, res) => {
    const consultation =
        new Consultation({
            ...req.body,
            name: req.user.name,
            email: req.user.email
        });

    await consultation.save();

    req.flash(
        "success",
        "Consultation sent successfully!"
    );

    res.redirect("/home");
};