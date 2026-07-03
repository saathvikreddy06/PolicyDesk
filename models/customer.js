const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    nominee: {
        name: {
            type: String,
            required: true
        },
        relation: {
            type: String,
            required: true
        }
    },
    pob: {
        type: String
    },
    aadharNum: {
        type: String
    },
    dob: {
        type: Date,
        required: true
    },
    occupation: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    panNum: {
        type: String,
        required: true
    },
    bankAccountNum: {
        type: Number,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    micr: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    bankAddress: {
        type: String,
        required: true
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;