import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import Root from "../structure/root";
import { FloatLabel } from "primereact/floatlabel";
import { auth, db } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Auth() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [user, setUser] = React.useState(null);

  // Form States
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Logged in successfully:", response.user);
        Swal.fire({ title: "Success!", text: "Logged in successfully!" });
      } else {
        // --- SIGNUP LOGIC ---
        // 1. Create the secure auth account with Email & Password
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Auth account created:", response.user.uid);

        // 2. Save the extra profile details to the Firestore 'users' collection
        await setDoc(doc(db, "users", response.user.uid), {
          name: name,
          email: email,
          number: number,
          address: address,
          createdAt: new Date().toISOString(),
        });

        Swal.fire({
          title: "Account Created!",
          text: "Your profile has been saved successfully.",
          icon: "success",
        });

        setIsLogin(true); // Flip back to login view
      }
    } catch (error) {
      console.error("Auth Error:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred.",
        icon: "error",
      });
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
    <>
      <Root />
      <div className="flex min-h-screen items-center justify-center p-4">
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
              className="mt-2 w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            />
          </form>
        </Card>
      </div>
    </>
  );
}
