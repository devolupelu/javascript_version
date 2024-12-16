const generateRegistrationConfirmationEmail = (
  organizerName,
  participants,
  paymentReference,
  paymentStatus,
  paymentAmount,
  paymentCurrency
) => {
  const participantCards = participants
    .map((participant, index) => {
      const membershipStatus = participant.is_member ? "Member" : "Non-member";
      const registrationOption =
        participant.bed_option === "registration_with_bed"
          ? "Registration with Bed"
          : "Registration Only";

      return `
        <div class="participant-card">
          <div class="participant-number">
            <strong>#${index + 1}</strong>
          </div>
          <div class="participant-info">
            <div class="info-item">
              <span class="label">Name:</span>
              <span class="value">${participant.first_name} ${
        participant.last_name
      }</span>
            </div>
            <div class="info-item">
              <span class="label">Membership Status:</span>
              <span class="value">${membershipStatus}</span>
            </div>
            <div class="info-item">
              <span class="label">Registration Number:</span>
              <span class="value">${participant.registrationNumber}</span>
            </div>
            <div class="info-item">
              <span class="label">Registration Option:</span>
              <span class="value">${registrationOption}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Confirmation</title>
  <style>
    /* General Styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f2f4f6;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #333333;
    }
    a {
      color: #1a82e2;
      text-decoration: none;
    }
    /* Container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }
    /* Header */
    .email-header {
      background-color: #042556;
      padding: 20px;
      text-align: center;
    }
    .email-header img {
      width: 80px;
      height: auto;
    }
    /* Body */
    .email-body {
      padding: 20px 30px;
    }
    .email-body h1 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #042556;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    /* Participants Section */
    .participants-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
    }
    .participant-card {
      display: flex;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 15px;
      background-color: #fafafa;
    }
    .participant-number {
      flex: 0 0 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #042556;
      color: #ffffff;
      border-radius: 4px;
      font-size: 16px;
      margin-right: 15px;
    }
    .participant-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      flex: 1;
    }
    .info-item {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-weight: bold;
      margin-bottom: 4px;
    }
    .value {
      font-size: 14px;
    }
    /* Payment Details Section */
    .payment-section {
      margin-bottom: 30px;
    }
    .payment-details {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;
    }
    .payment-details .label {
      font-weight: bold;
    }
    .payment-details .value {
      font-size: 14px;
    }
    /* Footer */
    .email-footer {
      background-color: #f2f4f6;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #888888;
    }
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .email-body {
        padding: 20px;
      }
      .email-header, .email-footer {
        padding: 15px;
      }
      .participant-info {
        grid-template-columns: 1fr;
      }
      .payment-details {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <img src="https://cgwc-youth-fellowship.vercel.app/static/media/cgwc-logo.e8cbe010260cca764e57.png" alt="CGWC Logo">
    </div>
    <!-- Body -->
    <div class="email-body">
      <h1>Registration Confirmed!</h1>
      <p>Hi ${organizerName},</p>
      <p>Thank you for registering for the <strong>2024 National Youth Camp</strong>! Below are your registration details:</p>
      
      <!-- Participant Details -->
      <div class="participants-section">
        ${participantCards}
      </div>
      
      <!-- Payment Details -->
      <div class="payment-section">
        <h2>Payment Details</h2>
        <div class="payment-details">
          <div class="label">Payment Reference:</div>
          <div class="value">${paymentReference}</div>
          <div class="label">Payment Status:</div>
          <div class="value">${paymentStatus}</div>
          <div class="label">Total Amount:</div>
          <div class="value">${paymentCurrency}${paymentAmount}</div>
        </div>
      </div>
      
      <p>If you have any questions, feel free to reach out to us at <a href="mailto:finance@cgwc-youth-fellowship.com">finance@cgwc-youth-fellowship.com</a>.</p>
      <p>We look forward to seeing you at the camp!</p>
      <p>Best regards,<br>CGWC Youth Fellowship Team</p>
    </div>
    <!-- Footer -->
    <div class="email-footer">
      &copy; 2024 CGWC Youth Fellowship. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
};

export default generateRegistrationConfirmationEmail;
