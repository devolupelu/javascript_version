import RegistrationModel from "../models/whatsapp_registration.js";
import { generateRegistrationNumber } from "../utils/registration_gen.js"; // Generates unique registration numbers
import generate_whatsapp_registration_mail from "../template/whatsapp_reg_temp.js";

const whatsapp_register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      Email,
      PhoneNumber,
      isMember,
      MemberArea,
      RegistrationOption,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !Email ||
      !PhoneNumber ||
      !RegistrationOption
    ) {
      res.status(400).json({
        message: "All required fields must be provided.",
      });
      return; // Exit the function after sending the response
    }

    // Check if registration already exists
    const existingRegistration = await RegistrationModel.findOne({ Email });
    if (existingRegistration) {
      res.status(400).json({
        message: "A registration with this email already exists.",
      });
      return; // Exit the function after sending the response
    }

    // Generate registration number
    const registrationNumber = await generateRegistrationNumber();

    // Create a new registration document
    const newRegistration = new RegistrationModel({
      firstName,
      lastName,
      Email,
      PhoneNumber,
      isMember,
      MemberArea,
      RegistrationOption,
      registrationNumber, // Include the generated registration number
    });

    // Save to database
    await newRegistration.save();

    // Generate HTML content
    const emailContent = generate_whatsapp_registration_mail(
      firstName,
      lastName,
      Email,
      PhoneNumber,
      isMember,
      MemberArea,
      RegistrationOption,
      registrationNumber
    );

    // Send success response with HTML content
    res.status(201).send(emailContent);
  } catch (error) {
    console.error("Error during registration:", error);

    // Differentiate between validation errors and unexpected errors
    if (error instanceof Error && error.name === "ValidationError") {
      res.status(400).json({
        message: "Validation error occurred.",
        details: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred during registration.",
      });
    }
  }
};

export default { whatsapp_register };
