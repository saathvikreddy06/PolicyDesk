const Customer = require("../models/customer");
const Policy = require("../models/policy");

module.exports.renderSearchPage = (req, res) => {
        res.render(
            "admin/search"
        );
    }

module.exports.renderSearchresults = async (req, res) => {
        const { field, q } =
            req.query;

        if (
            field === "policyNum"
        ) {
            const policies =
                await Policy.find({
                    policyNum: {
                        $regex: q,
                        $options: "i"
                    }
                })
                    .populate(
                        "customer"
                    );

            return res.render(
                "admin/searchResults",
                {
                    field,
                    q,
                    customers: [],
                    policies
                }
            );
        }

        const customers =
            await Customer.find({
                [field]: {
                    $regex: q,
                    $options: "i"
                }
            });

        for (
            let customer of customers
        ) {
            customer.policyCount =
                await Policy.countDocuments({
                    customer:
                        customer._id
                });
        }

        res.render(
            "admin/searchResults",
            {
                field,
                q,
                customers,
                policies: []
            }
        );
    }