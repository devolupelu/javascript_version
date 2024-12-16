const generateRegistrationConfirmationEmail = (
  firstName,
  lastName,
  isMember,
  bedOption,
  paymentReference,
  paymentStatus,
  paymentAmount,
  paymentCurrency,
  email,
  phoneNumber,
  registrationNumber
) => {
  const membershipStatus = isMember ? "Member" : "Non-member";
  const registrationOption =
    bedOption === "registration_with_bed"
      ? "Registration with Bed"
      : "Registration Only";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      color: #042556;
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 2px solid #afb3b9;
    }
    
    .header img {
      max-width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
    }
    
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    
    .content h2 {
      color: #042556;
      margin-top: 0;
    }
    
    .info-table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .info-table th, .info-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    .info-table th {
      background-color: #042556;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
    }

    .info-table tr:nth-child(even) td {
      background-color: #f9f9f9;
    }

    .info-table td {
      color: #042556;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #afb3b9;
      margin-top: 20px;
    }
    
    @media (max-width: 600px) {
      .container {
        padding: 10px;
      }
      .content {
        padding: 10px;
      }
      .info-table th, .info-table td {
        padding: 8px 10px;
      }
    }
    
    a {
      text-decoration: none;
      color: #337ab7;
    }
    
    a:hover {
      color: #23527c;
    }
    
    p {
      margin-bottom: 20px;
    }
    
    .bold {
      font-weight: bold;
    }
    
    .uppercase {
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://cgwc-youth-fellowship.vercel.app/static/media/cgwc-logo.e8cbe010260cca764e57.png" alt="CGWC Logo">
    </div>
    <div class="content">
      <h2>Thank You for Registering, ${firstName} ${lastName}!</h2>
      <p class="bold uppercase">Registration Confirmation</p>
      <p>Dear ${firstName},</p>
      <p>We are thrilled to confirm your registration for the upcoming 2024 National Youth camp. Below are your registration details:</p>
      <table class="info-table">
        <tr>
          <th>Full Name</th>
          <td>${firstName} ${lastName}</td>
        </tr>
        <tr>
          <th>Registration Option</th>
          <td>${registrationOption}</td>
        </tr>
        <tr>
          <th>Total Payment</th>
          <td>${paymentCurrency}${paymentAmount}</td>
        </tr>
        <tr>
          <th>Payment Status</th>
          <td>${paymentStatus}</td>
        </tr>
        <tr>
          <th>Payment Reference</th>
          <td>${paymentReference}</td>
        </tr>
         <tr>
          <th>Registration Number</th>
          <td>${registrationNumber}</td>
        </tr>
      </table>
      <p>If you have any questions, feel free to contact us at <a href="mailto:finance@cgwc-youth-fellowship.com">finance@cgwc-youth-fellowship.com</a>.</p>
      <p>We look forward to seeing you!</p>
    </div>
    <div class="footer">
      &copy; 2024 CGWC Youth Fellowship. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};

export default generateRegistrationConfirmationEmail;
