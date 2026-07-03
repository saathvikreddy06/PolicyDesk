const Customer = require("../models/customer");
const Policy = require("../models/policy");

module.exports.showCustomers = async (req, res) => {
    const customers = await Customer.find();

    for (let customer of customers) {
        customer.policyCount = await Policy.countDocuments({
            customer: customer._id
        });
    }

    res.render("admin/customers", {
        customers
    });
}

module.exports.addCustomer = (req, res) => {
    res.render("admin/addCustomer");
}

module.exports.saveCustomer = async (req, res) => {
    const customer = new Customer(req.body);

    await customer.save();

    req.flash(
        "success",
        "New customer added successfully!"
    );

    res.redirect("/admin/customers");
}

module.exports.showCustomer = async (req, res) => {
    const customer = await Customer.findById(
        req.params.id
    );

    if (!customer) {
        req.flash(
            "error",
            "Customer not found."
        );

        return res.redirect(
            "/admin/customers"
        );
    }

    const policies = await Policy.find({
        customer: customer._id
    });

    res.render(
        "admin/showCustomer",
        {
            customer,
            policies
        }
    );
}

module.exports.addNewPolicy = async (req, res) => {
        const customer =
            await Customer.findById(
                req.params.id
            );

        if (!customer) {
            req.flash(
                "error",
                "Customer not found."
            );

            return res.redirect(
                "/admin/customers"
            );
        }

        res.render(
            "admin/newPolicy",
            {
                customer
            }
        );
    }

module.exports.savePolicy = async (req, res) => {
        const customer =
            await Customer.findById(
                req.params.id
            );

        if (!customer) {
            req.flash(
                "error",
                "Customer not found."
            );

            return res.redirect(
                "/admin/customers"
            );
        }

        const policy = new Policy({
            ...req.body,
            customer: customer._id
        });

        await policy.save();

        req.flash(
            "success",
            "Policy added successfully!"
        );

        res.redirect(
            `/admin/customers/${customer._id}`
        );
    }

module.exports.editCustomer = async (req, res) => {
        const customer =
            await Customer.findById(
                req.params.id
            );

        if (!customer) {
            req.flash(
                "error",
                "Customer not found."
            );

            return res.redirect(
                "/admin/customers"
            );
        }

        res.render(
            "admin/editCustomer",
            {
                customer
            }
        );
    }

module.exports.saveChanges = async (req, res) => {
        const customer =
            await Customer.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        req.flash(
            "success",
            "Customer updated successfully!"
        );

        res.redirect(
            `/admin/customers/${customer._id}`
        );
    }

module.exports.deleteCustomer = async (req, res) => {
        const policyCount =
            await Policy.countDocuments({
                customer: req.params.id
            });

        if (policyCount > 0) {
            req.flash(
                "error",
                "Cannot delete customer. This customer has policies."
            );

            return res.redirect(
                `/admin/customers/${req.params.id}`
            );
        }

        await Customer.findByIdAndDelete(
            req.params.id
        );

        req.flash(
            "success",
            "Customer deleted successfully!"
        );

        res.redirect(
            "/admin/customers"
        );
    }