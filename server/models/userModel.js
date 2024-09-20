const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();  // If the password hasn't been modified, continue
    }

    try {
        const saltRounds = 10;  // Define the number of salt rounds for bcrypt
        const hash = await bcrypt.hash(this.password, saltRounds);  // Hash the password
        this.password = hash;  // Set the hashed password
        next();  // Continue with saving the user
    } catch (error) {
        return next(error);  // Handle any errors that occur during hashing
    }
});

// Compare the entered password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);  // Compare the passwords
};

const User = mongoose.model("User", userSchema);

module.exports = User;
