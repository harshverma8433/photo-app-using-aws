/* eslint-disable react/prop-types */
// VerifyAccount.jsx
import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../Context/AccountContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyAccount = ({ email }) => {
  const { confirmSignup } = useContext(AccountContext);
  const [otp, setOtp] = useState("");
    const navigate = useNavigate()
  const handleVerification = async (event) => {
    event.preventDefault();
    try {
      await confirmSignup(email, otp);
      toast.success("Registered SuccessFully");
      navigate("/login")
    } catch (error) {
      toast.error( error.message);
    }
  };

  return (
    
      <div className="verify-container">
        <h2>Verify Your Account</h2>
        <form onSubmit={handleVerification}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className='text-black'
          />
          <button type="submit">Verify Account</button>
        </form>
      </div>
  );
};

export default VerifyAccount;
