"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import GradientText from "../../components/GradientText";
import ArrowButton from "../../components/ArrowButton";
import GlowButton from "../../components/GlowButton";
import GlowSpinner from "../../components/GlowSpinner";
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params, searchParams }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector("input[type=email]");
    const passwordInput = form.querySelector("input[type=password]");
    const email = emailInput.value;
    const password = passwordInput.value;
    if (isLogin) doLogin(email, password);
    else doSignup(email, password);
  };

  const doSignup = async (email, password) => {
    const res = await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/signup`, {
        email,
        password,
      })
      .catch((err) => {
        console.log("error signing up", err.response.data.message);
        setIsLoading(false);
        toast.error(err.response.data.message);
      });

    if (res) {
      toast.success("Account created successfully");
      doLogin(email, password);
    }
  };

  const doLogin = async (email, password) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok && !res.error) {
      toast.success("Logged in successfully");
      router.push("/");
    } else {
      console.log("error logging in", res);
      toast.error("Login failed. Please try again");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="grid place-items-center flex-1">
        <GradientText text="AI Powered Process Builder Application" />
      </div>

      <div className="border-white border-2 border-dashed h-2/3 self-center opacity-20"></div>

      <div className="grid place-items-center flex-1 mt-8">
        <form
          onSubmit={onSubmitHandler}
          className="text-black flex flex-col gap-4 w-96 relative"
        >
          <div className="flex justify-center">
            <GradientText text={isLogin ? "Login" : "Signup"} />
          </div>
          <input
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="email"
            placeholder="email"
          />
          <input
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            placeholder="Enter your password"
          />

          <div className="flex w-full justify-end">
            <GlowButton text={isLogin ? "Login" : "Signup"} />
          </div>

          {isLoading && (
            <div className="absolute w-[28rem] -translate-x-8 h-full backdrop-blur-sm grid place-items-center">
              <GlowSpinner />
            </div>
          )}

          <div className="flex items-center justify-between text-white opacity-40">
            {isLogin ? (
              <p>Dont have an account ?</p>
            ) : (
              <p>Already have an account ?</p>
            )}
            <ArrowButton
              onClick={() => setIsLogin((prev) => !prev)}
              text={isLogin ? "Signup" : "Login"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
