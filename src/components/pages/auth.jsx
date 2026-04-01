import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Root from "../structure/root";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you will eventually plug in your Firebase auth functions
    if (isLogin) {
      console.log("Logging in with:", email, password);
    } else {
      console.log("Signing up with:", name, email, password);
    }
  };

  return (
    <>
      <Root />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h1>
            <p className="mt-2 text-gray-500">
              {isLogin
                ? "Please enter your details to sign in."
                : "Sign up to get started."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Only show Name field on Sign Up */}
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <InputText
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                toggleMask
                feedback={!isLogin} // Only show strength indicator on sign up
                inputClassName="w-full p-3 border border-gray-300 rounded-md"
                className="w-full"
                required
              />
            </div>

            <Button
              label={isLogin ? "Sign In" : "Sign Up"}
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
            />
          </form>

          <Divider align="center" className="my-6">
            <span className="text-sm text-gray-400">OR</span>
          </Divider>

          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-blue-600 hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
