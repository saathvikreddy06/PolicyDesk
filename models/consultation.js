const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }
}, 
{
    timestamps: true
}
);

const Consultation = mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;