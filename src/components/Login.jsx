import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const login = async (data) => {
    setError(null);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-2xl p-10 border border-gray-200 shadow-xl">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-\[100px\]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center leading-tight">
          Sign in to your account
        </h2>
        <p className="text-center text-base text-black/60 mt-2">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              className="focus:ring-2 focus:ring-gray-1000 focus:border-gray-1000 transition"
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Enter a valid email",
                },
              })}
            ></Input>
            <Input
              label="Password"
              className="focus:ring-2 focus:ring-gray-1000 focus:border-gray-1000 transition"
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            ></Input>
            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
