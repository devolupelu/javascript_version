// src/utils/generateRegistrationNumber.js

import crypto from "crypto";
import EventRegistration from "../models/registration.js"; // Adjust the import path as needed

const generateRegistrationNumber = async () => {
  let isUnique = false;
  let registrationNumber = "";

  while (!isUnique) {
    // Generate a random 15-character alphanumeric string
    const randomPart = generateRandomString(15);

    // Calculate checksum digit
    const checkDigit = calculateLuhnCheckDigit(randomPart);

    // Append checksum digit
    registrationNumber = randomPart + checkDigit;

    // Check uniqueness in the database
    const existing = await EventRegistration.findOne({ registrationNumber });
    isUnique = !existing;
  }

  return registrationNumber;
};

// Helper function to generate a random alphanumeric string
const generateRandomString = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.randomBytes(length);
  let result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = chars[bytes[i] % chars.length];
  }

  return result.join("");
};

// Luhn algorithm to calculate check digit
const calculateLuhnCheckDigit = (input) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charMap = chars.split("").reduce((acc, char, index) => {
    acc[char] = index;
    return acc;
  }, {});

  const digits = input
    .toUpperCase()
    .split("")
    .map((char) => charMap[char]);

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let value = digits[digits.length - 1 - i];
    if (i % 2 === 0) {
      value *= 2;
      if (value >= 36) value -= 35; // Since our base is 36
    }
    sum += value;
  }

  const checkDigitValue = (36 - (sum % 36)) % 36;
  const checkDigit = chars[checkDigitValue];

  return checkDigit;
};

export { generateRegistrationNumber };
