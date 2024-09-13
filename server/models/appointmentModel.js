
const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // assuming you have a User model
      required: true
    },
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professional', // assuming you have a Professional model
      required: true
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  }, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  
  module.exports = Appointment;
