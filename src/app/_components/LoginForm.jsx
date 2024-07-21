"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinningLoader from "./SpinningLoader";
import Image from "next/image";
import showIcon from "../../../public/images/show.png";
import hideIcon from "../../../public/images/hide.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setError("");
        router.push("/");
      } else {
        setError(data);
      }
    } catch (error) {
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="m-auto mt-8 mb-4 w-[90%] rounded-xl border-2 border-darkGray px-6 pb-4 sm:w-[30rem] sm:px-[2.5rem] lg:pb-8"
        onSubmit={handleSubmit}
      >
        <h1 className="my-4 text-center text-lg sm:text-2xl font-bold lg:my-6">Login</h1>
        <div className="mb-4 lg:mb-8 text-center">
            <p className="text-sm lg:text-xl">Welcome back to ECOMMERCE</p>
            <p className="text-sm mt-2">The next gen buisness marketplace</p>
        </div>
        <div className="mb-4 flex flex-col text-sm">
          <label className="pb-1">Email</label>
          <input
            className="border-darkGray rounded border p-2"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-4 flex flex-col text-sm">
          <label className="pb-1">Password</label>
          <div className="relative">
            <input
              className="border-darkGray rounded border p-2 w-full"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
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
          {loading ? <SpinningLoader /> : "Login"}
        </button>
        <div className="mt-4 flex items-center justify-center text-sm gap-2">
          <div>Don't have an Account?</div>{" "}
          <Link
            href={"/signup"}
            className="cursor-pointer text-sm font-bold uppercase"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
