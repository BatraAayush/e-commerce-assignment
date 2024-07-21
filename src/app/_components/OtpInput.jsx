import React, { useRef } from "react";

const OtpInput = ({ otpCode, setOtpCode, setError }) => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = otpCode.split("");
      newOtp[index] = value;
      setOtpCode(newOtp.join(""));

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpCode[index]) {
        if (index > 0) {
          inputs.current[index - 1].focus();
        }
      } else {
        const newOtp = otpCode.split("");
        newOtp[index] = "";
        setOtpCode(newOtp.join(""));
      }
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            value={otpCode[index] || ""}
            onChange={(e) => {
              handleChange(e, index);
              setError("");
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)}
            maxLength="1"
            className="h-8 w-8 md:h-12 md:w-12 rounded border border-gray-300 text-center text-xl"
            style={{ fontSize: "1.5rem" }}
          />
        ))}
    </div>
  );
};

export default OtpInput;
