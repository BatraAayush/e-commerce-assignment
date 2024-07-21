"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpinningLoader from "../_components/SpinningLoader";
import OtpInput from "../_components/OtpInput";
import showIcon from "../../../public/images/show.png";
import hideIcon from "../../../public/images/hide.png";
import Image from "next/image";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [optVerifyLoading, setOptVerifyLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsOtpSent(true);
        setOtpCode('')
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      setError("Please Enter Full OTP");
      return;
    }
    try {
      setOptVerifyLoading(true);
      const response = await fetch("/api/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otpCode, name, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setError("");
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error verifying OTP");
    } finally {
      setOptVerifyLoading(false);
    }
  };

  function hideEmail(email) {
    const [localPart, domain] = email.split("@");
    const visiblePartLength = Math.min(3, localPart.length);
    const hiddenPart =
      localPart.slice(0, visiblePartLength) +
      "*".repeat(localPart.length - visiblePartLength);
    return `${hiddenPart}@${domain}`;
  }

  const hiddenEmail = hideEmail(email);

  const resetForm = () => {
    setIsOtpSent(false);
    setEmail("");
    setName("");
    setPassword("");
    setError("");
  };

  return (
    <div>
      {!isOtpSent ? (
        <form
          className="m-auto mt-8 mb-4 w-[90%] rounded-xl border-2 border-darkGray px-6 pb-4 sm:w-[30rem] sm:px-[2.5rem] lg:pb-8"
          onSubmit={handleSignup}
        >
          <h1 className="my-4 text-center text-lg sm:text-2xl font-bold lg:my-6 ">
            Create your account
          </h1>
          <div className="mb-4 flex flex-col text-sm">
            <label className="pb-1">Name</label>
            <input
              className="rounded border border-darkGray p-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4 flex flex-col text-sm">
            <label className="pb-1">Email</label>
            <input
              className="rounded border border-darkGray p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-4 flex flex-col text-sm">
            <label className="pb-1">Password:</label>
            <div className="relative">
              <input
                className="w-full rounded border border-darkGray p-2"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-0 right-4 top-0"
              >
                {showPassword ? (
                  <div className="cursor-pointer">
                    <Image alt="icon" className="h-4 w-4" src={hideIcon} />
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <Image alt="icon" className="h-4 w-4" src={showIcon} />
                  </div>
                )}
              </button>
            </div>
          </div>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className={`my-6 h-12 w-full rounded border border-black bg-black py-2 text-white hover:bg-white hover:text-black ${loading && "cursor-no-drop"} flex items-center justify-center`}
          >
            {loading ? <SpinningLoader /> : "Create Account"}
          </button>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div>Have an Account?</div>{" "}
            <Link
              href={"/login"}
              className="cursor-pointer text-sm font-bold uppercase"
            >
              Login
            </Link>
          </div>
        </form>
      ) : (
        <form
        className="m-auto mt-8 mb-4 w-[90%] rounded-xl border-2 border-darkGray px-6 pb-4 sm:w-[30rem] sm:px-[2.5rem] lg:pb-8"
        onSubmit={handleVerifyOtp}
        >
          <h1 className="my-4 text-center text-lg sm:text-2xl font-bold lg:my-6">
            Verify your email
          </h1>
          <p className="mb-8 text-center text-sm">
            Enter the 6-digit code you have received on{" "}
            <div className="font-bold">{hiddenEmail}</div>
          </p>
          <OtpInput
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            setError={setError}
          />
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <button
            disabled={optVerifyLoading || otpCode.length > 6}
            type="submit"
            className={`my-6 h-12 w-full rounded border border-black bg-black py-2 text-white hover:bg-white hover:text-black ${loading && "cursor-no-drop"} flex items-center justify-center`}
          >
            {optVerifyLoading ? <SpinningLoader /> : "Verify"}
          </button>
          <button
            type="button"
            className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white"
            onClick={(e) => {
              handleSignup(e);
              setOtpCode("");
              setError("");
            }}
          >
            Resend OTP
          </button>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div>Go back to</div>
            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer text-sm font-bold uppercase"
            >
              Signup
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
