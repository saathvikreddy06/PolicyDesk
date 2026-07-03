const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    policyNum: {
        type: String,
        required: true,
        unique: true
    },
    doc: {
        type: Date,
        required: true
    },
    policyName: {
        type: String,
        required: true
    },
    table: {
        type: Number,
        required: true
    },
    term: {
        type: Number,
        required: true
    },
    ppt: {
        type: Number,
        required: true
    },
    proposedSum: {
        type: Number,
        required: true
    },
    premium: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        enum: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"],
        required: true
    },
    status: {
        type: String,
        enum: [
            "Active",
            "Grace Period",
            "Lapsed",
            "Paid-up",
            "Matured"
        ],
        default: "Active"
    },
    nextPremiumDate: {
        type: Date,
    },
    maturityDate: {
        type: Date,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;