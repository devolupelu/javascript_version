// src/controllers/eventRegistrationController.js

import axios from "axios";
import EventRegistration from "../models/bulk_registration.js";
import validateEventRegistration from "../validator/bulk_registration.js";
import generateRegistrationConfirmationEmail from "../template/bulk_registration.js";
import { generateRegistrationNumber } from "../utils/registration_gen.js";
import config from "../config.js";

const FLW_SECRET_KEY = config.FLUTTERWAVE_SECRET_KEY || "";

// Utility function to verify payment with Flutterwave
const verifyPaymentWithFlutterwave = async (paymentReference) => {
  const flutterwaveVerificationUrl = `https://api.flutterwave.com/v3/transactions/${paymentReference}/verify`;

  const response = await axios.get(flutterwaveVerificationUrl, {
    headers: {
      Authorization: `Bearer ${FLW_SECRET_KEY}`,
    },
  });

  return response.data;
};

const createEventRegistration = async (req, res) => {
  const {
    organizerData,
    participants,
    paymentReference,
    paymentAmount,
    paymentCurrency,
  } = req.body;

  try {
    // Step 1: Validate the incoming data
    const { error } = validateEventRegistration.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({
        error: "Validation failed",
        details: error.details.map((err) => err.message),
      });
      return;
    }

    // Step 2: Check if the paymentReference already exists
    const existingRegistration = await EventRegistration.findOne({
      paymentReference,
    });
    if (existingRegistration) {
      res.status(400).json({
        error:
          "This payment reference has already been used for a registration.",
      });
      return;
    }

    // Step 3: Verify payment with Flutterwave
    let paymentData;
    try {
      paymentData = await verifyPaymentWithFlutterwave(paymentReference);
    } catch (err) {
      res
        .status(400)
        .json({ error: "Failed to verify payment with Flutterwave." });
      return;
    }

    // Step 4: Validate Flutterwave payment response
    const { status, data } = paymentData;
    if (status !== "success" || data.status !== "successful") {
      res.status(400).json({
        error: "Payment verification failed. Payment not successful.",
      });
      return;
    }

    if (data.amount !== paymentAmount || data.currency !== paymentCurrency) {
      res.status(400).json({
        error:
          "Payment details mismatch. Ensure the amount and currency are correct.",
      });
      return;
    }

    // Step 5: Generate registration numbers for each participant
    const participantsWithRegistrationNumbers = await Promise.all(
      participants.map(async (participant) => ({
        ...participant,
        registrationNumber: await generateRegistrationNumber(),
      }))
    );

    // Step 6: Save registration details to the database
    const newEventRegistration = new EventRegistration({
      organizerData,
      participants: participantsWithRegistrationNumbers,
      paymentReference,
      paymentStatus: data.status, // Map "successful" from Flutterwave
      paymentAmount,
      paymentCurrency,
    });

    const savedRegistration = await newEventRegistration.save();

    // Step 7: Generate the confirmation HTML
    const confirmationHtml = generateRegistrationConfirmationEmail(
      organizerData.organizerName,
      participantsWithRegistrationNumbers,
      paymentReference,
      data.status,
      paymentAmount,
      paymentCurrency
    );

    // Step 8: Respond with the HTML
    res.status(201).send(confirmationHtml);
  } catch (error) {
    console.error("Error creating event registration:", error.message);

    // Handle duplicate key error (E11000)
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.paymentReference) {
        res.status(400).json({
          error:
            "This payment reference has already been used for a registration.",
        });
        return;
      }
      if (error.keyPattern && error.keyPattern.registrationNumber) {
        res.status(500).json({
          error: "Duplicate registration number generated. Please try again.",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
};

export default { createEventRegistration };
 