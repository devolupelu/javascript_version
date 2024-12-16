"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegistration = void 0;
// Define acceptable values for bed options and payment amounts
const BED_WITH_REGISTRATION_AMOUNT = 4500;
const REGISTRATION_ONLY_AMOUNT = 3000;
const verifyRegistration = (req, res) => {
    const { bed_option, paymentAmount } = req.body;
    // Check if `bed_option` and `paymentAmount` are provided in the request body
    if (!bed_option || !paymentAmount) {
        res.status(400).json({
            success: false,
            message: "Both 'bed_option' and 'paymentAmount' are required fields.",
        });
        return;
    }
    // Check the bed_option and validate paymentAmount accordingly
    if (bed_option === "registration_with_bed" && paymentAmount === BED_WITH_REGISTRATION_AMOUNT) {
        res.status(200).json({
            success: true,
            message: "Registration verified successfully with bed option.",
        });
    }
    else if (bed_option === "registration_only" && paymentAmount === REGISTRATION_ONLY_AMOUNT) {
        res.status(200).json({
            success: true,
            message: "Registration verified successfully with registration only.",
        });
    }
    else {
        // Return an error if the paymentAmount does not match the expected value
        res.status(400).json({
            success: false,
            message: `Invalid paymentAmount for the selected bed_option: '${bed_option}'`,
            expectedAmount: bed_option === "registration_with_bed"
                ? BED_WITH_REGISTRATION_AMOUNT
                : REGISTRATION_ONLY_AMOUNT,
        });
    }
};
exports.verifyRegistration = verifyRegistration;
// processing payment with paystack
