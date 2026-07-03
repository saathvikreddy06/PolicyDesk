const Policy = require("../models/policy");

module.exports.showPolicies = async (req, res) => {
    const policies =
        await Policy.find()
            .populate("customer");

    res.render(
        "admin/policies",
        {
            policies
        }
    );
}

module.exports.searchPolicies = async (req, res) => {
        const { field, q } =
            req.query;

        let policies;

        if (field === "customer") {
            policies =
                await Policy.find()
                    .populate({
                        path: "customer",
                        match: {
                            fullName: {
                                $regex: q,
                                $options: "i"
                            }
                        }
                    });

            policies =
                policies.filter(
                    p => p.customer
                );
        }
        else {
            policies =
                await Policy.find({
                    [field]: {
                        $regex: q,
                        $options: "i"
                    }
                })
                    .populate(
                        "customer"
                    );
        }

        res.render(
            "admin/policySearchResults",
            {
                field,
                q,
                policies
            }
        );
    }

module.exports.showPolicy = async (req, res) => {
        const policy =
            await Policy.findById(
                req.params.id
            )
                .populate(
                    "customer"
                );

        if (!policy) {
            req.flash(
                "error",
                "Policy not found."
            );

            return res.redirect(
                "/admin/policies"
            );
        }

        res.render(
            "admin/showPolicy",
            {
                policy
            }
        );
    }

module.exports.editPolicy = async (req, res) => {
        const policy =
            await Policy.findById(
                req.params.id
            );

        if (!policy) {
            req.flash(
                "error",
                "Policy not found."
            );

            return res.redirect(
                "/admin/policies"
            );
        }

        res.render(
            "admin/editPolicy",
            {
                policy
            }
        );
    }

module.exports.saveChanges = async (req, res) => {
        const policy =
            await Policy.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        req.flash(
            "success",
            "Policy updated successfully!"
        );

        res.redirect(
            `/admin/policies/${policy._id}`
        );
    }

module.exports.deletePolicy = async (req, res) => {
        const policy =
            await Policy.findById(
                req.params.id
            );

        if (!policy) {
            req.flash(
                "error",
                "Policy not found."
            );

            return res.redirect(
                "/admin/policies"
            );
        }

        const customerId =
            policy.customer;

        await Policy.findByIdAndDelete(
            req.params.id
        );

        req.flash(
            "success",
            "Policy deleted successfully!"
        );

        res.redirect(
            `/admin/customers/${customerId}`
        );
    }