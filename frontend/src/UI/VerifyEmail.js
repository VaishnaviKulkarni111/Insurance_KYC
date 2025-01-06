import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/verify-email/${token}`);
        setStatus('Email successfully verified! Now you can close the window');
        setTimeout(() => navigate('/verify'), 3000); // Redirect after 3 seconds
      } catch (err) {
        setStatus('Verification failed. The link might be invalid or expired.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="text-center mt-5">
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyEmail;
