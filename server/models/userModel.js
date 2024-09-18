const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false,
            unique: true
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        birthDate: {
            type: Date
        },
        role: {
            type: String,
            enum: ['professional', 'client'], // Define the possible roles
            required: false
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            description: {
                type: String
            },
            profession: {
                type: String
            },
            price: {
                type: Number
            }
        },
        location: {
            type: {
                type: String,
                enum: ['Point'], // Ensure type is "Point" for GeoJSON
                required: false
            },
            coordinates: {
                type: [Number], // Array for [longitude, latitude]
                required: false
            }
        },
        // appointments: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Appointment' // Reference to Appointment model
        // }],
        // messages: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Message' // Reference to Message model
        // }]
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;