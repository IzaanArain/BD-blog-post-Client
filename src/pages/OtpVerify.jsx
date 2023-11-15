import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const location = useLocation();
  const userEmail = location?.state?.email ? location?.state?.email : "";
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const otpOnChangeHandler = (e, i) => {
    const value = e.target.value;
    const newOTP = [...otpArr];
    newOTP[i] = value;
    setOtpArr(newOTP);
    // logic to move to the next input
    if (value === "" && i > 0) {
      inputRefs.current[i - 1].focus();
    } else if (i < otpArr.length - 1 && value !== "") {
      inputRefs.current[i + 1].focus();
    }

    function handleBackspaceAndEnter(e, index) {
      if(e.key === "Backspace" && !e.target.value && index > 0){
        otpBoxReference.current[index - 1].focus()
      }
      if(e.key === "Enter" && e.target.value && index < numberOfDigits-1){
        otpBoxReference.current[index + 1].focus()
      }
    }
  };

  
  const otpOnSubmit = (e) => {
    e.preventDefault();
    const otp_input = otpArr.join("");
    console.log(otp_input)
  };

  return (
    <>
      <div className="otp-verify-page">
        <h1>OTP CODE</h1>
        {isError && (
          <div id="error_block">
            <h2>{isError}</h2>
          </div>
        )}
        <form onSubmit={otpOnSubmit}>
          <div className="otp-input-container">
            {otpArr.map((number, i) => {
              return (
                <input
                  key={i}
                  value={number}
                  onChange={(e) => otpOnChangeHandler(e, i)}
                  type="text"
                  className="otp-input-box"
                  maxLength={1}
                  size={1}
                  pattern="^[0-9]*$"
                  title="must be a number"
                  ref={(input) => (inputRefs.current[i] = input)}
                />
              );
            })}
          </div>
          <input type="submit" id="otp-btn" value="Verify" />
        </form>
      </div>
    </>
  );
};

export default OtpVerify;
