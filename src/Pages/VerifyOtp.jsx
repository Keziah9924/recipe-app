import { jwtDecode } from 'jwt-decode';
import React, { useState, useRef, useEffect } from 'react';
import API from '../api/config';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate()

    // Handle input change
    const handleChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    // Handle backspace key
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle paste event
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0,6).split('');
        const newOtp = [...otp];
        pasteData.forEach((value, i) => {
            if (i < 6 && /^\d*$/.test(value)) {
                newOtp[i] = value;
            }
        });
        setOtp(newOtp);
    };

    const [newUserData, setNewUserData] = useState(null)
    const [otpToken, setOtpToken] = useState(null)

    useEffect(() => {
        setNewUserData(JSON.parse(localStorage.getItem("newUserData")))
        setOtpToken(localStorage.getItem("otpToken"))
    }, [])

    const handleVerification = async () => {
        const decodedOtp = jwtDecode(otpToken).otp
        const userInputedOtp = otp.join(' ').replace(/\s+/g, '')
        console.log(decodedOtp, userInputedOtp)
        if(Number(decodedOtp) === Number(userInputedOtp)){
            const response = await API.post('/user/new', newUserData)
            console.log(response)
            if(response.data.code === 201){
                alert('Registration successful')
                return navigate('/login');
            }
        }
    }

    return (
        <div className="otp-card">
            <h2>Account Verification</h2>
            <p style={{ textAlign: 'center', marginBottom: 20 }}>Dear {newUserData?.firstname}, we just sent you a One-Time Password (OTP) to your inbox, kindly check and verify below</p>
            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="otp-input"
                    />
                ))}
            </div>
            <button
                className="verify-button"
                onClick={handleVerification}
            >
                Verify OTP
            </button>
        </div>
    );
};

export default VerifyOtp;