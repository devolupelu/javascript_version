// src/controllers/registrationController.js

import axios from "axios";
import EventRegistration from "../models/registration.js";
import { generateRegistrationNumber } from "../utils/registration_gen.js";
import  registrationSchema  from "../validator/schema.js";
import generateRegistrationConfirmationEmail from "../template/template.js";
import config from "../config.js";

const FLUTTERWAVE_SECRET_KEY = config.FLUTTERWAVE_SECRET_KEY;

const createRegistration = async (req, res) => {
  const { error, value } = registrationSchema.validate(req.body);
  if (error) {
    res.status(400).json({ success: false, message: error.details[0].message });
    return;
  }

  const {
    paymentReference,
    paymentAmount,
    email,
    first_name,
    last_name,
    is_member,
    bed_option,
    phone_number,
  } = value;

  try {
    // Check if a completed registration already exists with this paymentReference
    const existingRegistration = await EventRegistration.findOne({
      paymentReference,
      paymentStatus: "completed",
    });

    if (existingRegistration) {
      res.status(400).json({
        success: false,
        message:
          "A completed registration with this payment reference already exists.",
      });
      return;
    }

    // Verify payment with Flutterwave
    const flutterwaveResponse = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${paymentReference}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const { data } = flutterwaveResponse.data;

    if (
      data.status === "successful" &&
      data.amount === paymentAmount &&
      data.currency === value.paymentCurrency
    ) {
      // Generate a unique registration number
      const registrationNumber = await generateRegistrationNumber();

      // Include the unique registration number in the new registration data
      const newRegistrationData = { ...value, registrationNumber };

      // Save the validated data with the unique registration number
      const newRegistration = new EventRegistration(newRegistrationData);
      await newRegistration.save();

      // Generate HTML content for registration confirmation
      const emailHtml = generateRegistrationConfirmationEmail(
        first_name,
        last_name,
        is_member || false,
        bed_option,
        paymentReference,
        "completed",
        paymentAmount,
        value.paymentCurrency,
        email,
        phone_number,
        registrationNumber
      );

      // Respond with the registration number, message, and HTML content
      res.status(200).json({
        message: "Registration completed successfully!",
        registrationNumber,
        emailHtml,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed or mismatched amount/currency.",
      });
    }
  } catch (err) {
    console.error("Error verifying payment with Flutterwave:", err);
    res.status(500).json({
      success: false,
      message: "Payment verification error",
      error: err,
    });
  }
};

export default { createRegistration };
