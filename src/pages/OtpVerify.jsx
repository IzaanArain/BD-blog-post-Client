import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { OtpVerifyApi, otpVerifyUser } from "../features/Auth/Auth";
import { toast } from "react-toastify";
const OtpVerify = () => {
  const location = useLocation();
  const userEmail = location?.state?.email ? location?.state?.email : "";
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const user = useSelector(otpVerifyUser);
  // console.log(user);

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
  };

  const otpOnSubmit = (e) => {
    e.preventDefault();
    const otp_input = otpArr.join("");
    dispatch(
      OtpVerifyApi({
        email: userEmail,
        otp_code: otp_input,
      })
    )
      .unwrap()
      .then(({ data }) => {
        const is_forgot_password = data?.is_forgot_password;
        if (is_forgot_password) {
          navigate("/reset_password",{state:{email:userEmail}});
        } else {
          navigate("/login");
        }
      });
  };

  return (
    <>
      <div className="otp-verify-page">
        <h1>OTP CODE has been emailed to you</h1>
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
