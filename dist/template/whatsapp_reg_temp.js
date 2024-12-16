"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_whatsapp_registration_mail = (firstName, lastName, email, phoneNumber, isMember, memberArea, registrationOption, registrationNumber) => {
    const membershipStatus = isMember ? "Member" : "Non-member";
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation</title>
  <style>
    /* Reset and basic styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333333;
    }

    /* Container */
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Header */
    .header {
      background-color: #042556;
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
    }

    .header img {
      max-width: 120px;
      margin-bottom: 10px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 1px;
    }

    /* Content */
    .content {
      padding: 30px 20px;
      line-height: 1.6;
    }

    .content h2 {
      color: #042556;
      font-size: 22px;
      margin-bottom: 20px;
    }

    .content p {
      font-size: 16px;
      margin-bottom: 20px;
    }

    /* Details Table */
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .details-table th, .details-table td {
      padding: 12px 15px;
      text-align: left;
    }

    .details-table th {
      background-color: #f0f4f8;
      color: #042556;
      width: 40%;
      font-weight: 600;
    }

    .details-table td {
      background-color: #ffffff;
      border-bottom: 1px solid #e0e0e0;
    }

    /* Footer */
    .footer {
      background-color: #e9ecef;
      text-align: center;
      padding: 15px 20px;
      font-size: 14px;
      color: #6c757d;
    }

    .footer a {
      color: #042556;
      text-decoration: none;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .container {
        margin: 10px;
      }

      .header, .content, .footer {
        padding: 20px 15px;
      }

      .header img {
        max-width: 100px;
      }

      .header h1 {
        font-size: 20px;
      }

      .content h2 {
        font-size: 20px;
      }

      .content p, .details-table th, .details-table td {
        font-size: 14px;
      }

      
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://cgwc-youth-fellowship.vercel.app/static/media/cgwc-logo.e8cbe010260cca764e57.png" alt="CGWC Logo">
      <h1>Registration Confirmation</h1>
    </div>
    <div class="content">
      <h2>Hello ${firstName} ${lastName},</h2>
      <p>Thank you for registering for the <strong>2024 National Youth Camp</strong>. We're excited to have you join us! Below are your registration details:</p>
      <table class="details-table">
        <tr>
          <th>Full Name</th>
          <td>${firstName} ${lastName}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${email}</td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <th>Membership Status</th>
          <td>${membershipStatus}</td>
        </tr>
        <tr>
          <th>Member Area</th>
          <td>${memberArea}</td>
        </tr>
        <tr>
          <th>Registration Option</th>
          <td>${registrationOption}</td>
        </tr>
        <tr>
          <th>Registration Number</th>
          <td>${registrationNumber}</td>
        </tr>
      </table>
      <p>If you have any questions, feel free to reach out to us at <a href="mailto:info@cgwc-youth-fellowship.com">info@cgwc-youth-fellowship.com</a>.</p>
      <p>We can’t wait to see you there!</p>
      <p>WhatsApp registration</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 CGWC Youth Fellowship. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`;
};
exports.default = generate_whatsapp_registration_mail;
