const Joi = require("joi");

module.exports.customerSchema = Joi.object({
    fullName: Joi.string().required(),
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),

    nominee: Joi.object({
        name: Joi.string().required(),
        relation: Joi.string().required()
    }).required(),

    pob: Joi.string().allow(""),

    aadharNum: Joi.string()
        .pattern(/^\d{12}$/)
        .allow(""),

    dob: Joi.date().required(),

    occupation: Joi.string().allow(""),

    address: Joi.string().required(),

    phoneNum: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required(),

    email: Joi.string()
        .email()
        .allow(""),

    height: Joi.number().required(),
    weight: Joi.number().required(),

    education: Joi.string().required(),

    income: Joi.number().required(),

    panNum: Joi.string()
        .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
        .required(),

    bankAccountNum: Joi.string().required(),

    bankName: Joi.string().required(),

    micr: Joi.string().required(),

    ifscCode: Joi.string().required(),

    bankAddress: Joi.string().required()
});

module.exports.policySchema = Joi.object({
    policyNum: Joi.string().required(),

    doc: Joi.date().required(),

    policyName: Joi.string().required(),

    table: Joi.number().required(),

    term: Joi.number().required(),

    ppt: Joi.number().required(),

    proposedSum: Joi.number().required(),

    premium: Joi.number().required(),

    mode: Joi.string()
        .valid(
            "Monthly",
            "Quarterly",
            "Half-Yearly",
            "Yearly"
        )
        .required(),

    status: Joi.string()
        .valid(
            "Active",
            "Grace Period",
            "Lapsed",
            "Paid-up",
            "Matured"
        ),

    nextPremiumDate: Joi.date().allow(null),

    maturityDate: Joi.date().allow(null)
});

module.exports.consultationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required(),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Phone number must be a valid 10-digit Indian mobile number."
        }),

    email: Joi.string()
        .email()
        .required(),

    occupation: Joi.string()
        .trim()
        .required(),

    purpose: Joi.string()
        .trim()
        .required(),

    message: Joi.string()
        .trim()
        .allow("")
});