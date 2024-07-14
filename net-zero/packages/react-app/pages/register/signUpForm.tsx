// components/EmailVerification.tsx
import React, { useState } from 'react';

const EmailVerification: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleConfirm = () => {
    // Validate verification code (e.g., against a stored code)

    // Proceed to next step if verification is successful
    onNext();
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <p>Please enter the verification code sent to your email.</p>
      <input
        type="text"
        placeholder="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default EmailVerification;
