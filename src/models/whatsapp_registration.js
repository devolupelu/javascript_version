import mongoose, { Schema } from "mongoose";

const RegistrationSchema = new Schema(
  {
    firstName: { type: String, required: true, index: true }, // Indexed for name searches
    lastName: { type: String, required: true, index: true }, // Indexed for name searches
    Email: { type: String, required: true, unique: true, index: true }, // Indexed and unique
    PhoneNumber: { type: String, required: true },
    isMember: { type: Boolean, required: true },
    MemberArea: {
      type: String,
      required: function () {
        return this.isMember;
      },
    },
    RegistrationOption: { type: String, required: true },
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

const RegistrationModel = mongoose.model(
  "whatsapp_registration",
  RegistrationSchema
);

export default RegistrationModel;
