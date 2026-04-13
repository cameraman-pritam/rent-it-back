import React, { Suspense, lazy, useState } from "react";
import { Skeleton } from "primereact/skeleton";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";
import { useAuth } from "../../utils/AuthContext";

const InputText = lazy(() =>
  import("primereact/inputtext").then((module) => ({
    default: module.InputText,
  }))
);
const Password = lazy(() =>
  import("primereact/password").then((module) => ({
    default: module.Password,
  }))
);
const Button = lazy(() =>
  import("primereact/button").then((module) => ({ default: module.Button }))
);
const Divider = lazy(() =>
  import("primereact/divider").then((module) => ({ default: module.Divider }))
);
const Card = lazy(() =>
  import("primereact/card").then((module) => ({ default: module.Card }))
);
const FloatLabel = lazy(() =>
  import("primereact/floatlabel").then((module) => ({
    default: module.FloatLabel,
  }))
);
const Root = lazy(() => import("../structure/root"));

const AuthSkeleton = () => (
  <div className="flex min-h-screen items-center justify-center p-4 w-full flex-col gap-4">
    <Skeleton width="100%" height="5rem" borderRadius="12px" />
    <Skeleton
      width="100%"
      height="30rem"
      className="max-w-md"
      borderRadius="12px"
    />
  </div>
);

export default function Auth() {
  const { user, userData } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      Swal.fire("Logged Out", "See you again!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not log out correctly.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        Swal.fire({ title: "Success!", text: "Logged in successfully!" });
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              number,
              address,
            },
          },
        });

        if (signUpError) throw signUpError;

        Swal.fire({
          title: "Account Created!",
          text: "Profile saved successfully.",
          icon: "success",
        });
        setIsLogin(true);
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  const cardTitle = (
    <div className="text-center">
      <h3 className="font-bold text-2xl text-gray-800">
        {isLogin ? "Welcome Back" : "Create an Account"}
      </h3>
      <p className="mt-1 text-sm font-normal text-gray-500">
        {isLogin
          ? "Please enter your details to sign in."
          : "Sign up to get started."}
      </p>
      <Divider />
    </div>
  );

  const cardFooter = (
    <>
      <Divider align="center" className="my-4">
        <span className="text-sm text-gray-400">OR</span>
      </Divider>
      <div className="text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-semibold text-blue-600 hover:text-blue-800 hover:underline hover:animate-pulse transition-all"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </>
  );

  return (
    <Suspense fallback={<AuthSkeleton />}>
      <Root />
      <div className="flex min-h-screen items-center justify-center p-4">
        {user ? (
          <Card
            title="User Data"
            className="w-full max-w-md shadow-lg rounded-xl text-center"
          >
            <div className="flex flex-col gap-4">
              <p className="text-white">
                Logged in as: <strong>{user.email}</strong>
              </p>

              {userData ? (
                <>
                  <p className="text-white">
                    Name: <strong>{userData.name}</strong>
                  </p>
                  <p className="text-white">
                    Mobile Number: <strong>{userData.number}</strong>
                  </p>
                  <p className="text-white">
                    Address: <strong>{userData.address}</strong>
                  </p>
                </>
              ) : (
                <p className="text-gray-500 italic">Loading profile data...</p>
              )}

              <Button
                label={loading ? "Logging out..." : "Logout"}
                onClick={handleLogout}
                disabled={loading}
                className="w-full rounded-md bg-red-500 p-3 font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50"
              />
            </div>
          </Card>
        ) : (
          <Card
            title={cardTitle}
            footer={cardFooter}
            className="w-full max-w-md shadow-lg rounded-xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div className="flex flex-col gap-2">
                  <FloatLabel>
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
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required={!isLogin}
                    />
                  </FloatLabel>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <FloatLabel>
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </FloatLabel>
              </div>

              {!isLogin && (
                <>
                  <div className="flex flex-col gap-2">
                    <FloatLabel>
                      <label
                        htmlFor="number"
                        className="text-sm font-medium text-gray-700"
                      >
                        Mobile Number
                      </label>
                      <InputText
                        id="number"
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="+91 99999 99999"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!isLogin}
                      />
                    </FloatLabel>
                  </div>

                  <div className="flex flex-col gap-2">
                    <FloatLabel>
                      <label
                        htmlFor="address"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Address
                      </label>
                      <InputText
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Your street address"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={!isLogin}
                      />
                    </FloatLabel>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2">
                <FloatLabel>
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
                    feedback={!isLogin}
                    inputClassName="w-full p-2 border border-gray-300 rounded-md"
                    className="w-full"
                    required
                  />
                </FloatLabel>
              </div>

              <Button
                label={
                  loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"
                }
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              />
            </form>
          </Card>
        )}
      </div>
    </Suspense>
  );
}
