import mongoose, { Schema } from "mongoose";

const EventRegistrationSchema = new Schema(
  {
    is_member: { type: Boolean, required: false },
    member_area_id: {
      type: String,
      ref: "Area",
      required: function () {
        return this.is_member === true;
      },
    },
    bed_option: {
      type: String,
      enum: ["registration_with_bed", "registration_only"],
      required: true,
    },
    baseAmount: { type: Number, required: true },
    bedFeeAmount: { type: Number, required: true },
    first_name: { type: String, required: true, index: true }, // Indexed for name searches
    last_name: { type: String, required: true, index: true }, // Indexed for name searches
    email: { type: String, required: true, unique: true, index: true }, // Indexed and unique
    phone_number: { type: String, required: true },
    paymentReference: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    paymentCurrency: { type: String, required: true },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    }, // Indexed and unique
  },
  {
    timestamps: true,
  }
);

const EventRegistrationModel = mongoose.model(
  "EventRegistration",
  EventRegistrationSchema
);

export default EventRegistrationModel;
