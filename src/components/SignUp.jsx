import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError(null);
    try {
      const session = await authService.createUser(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-centre">
          <span className="inline-block w-full max-w-\[100px\]">
            <Logo width="100%" />
          </span>
          <h2 className="text-2xl font-bold text-center leading-tight">
            Sign up to create your account
          </h2>
          <p className="text-centre text-base text-black/60 mt-2">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign in
            </Link>
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <from onSubmit={handleSubmit(create)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Full Name: "
                placeholder="Enter your Full Name"
                type="text"
                {...register("name", {
                  required: true,
                })}
              ></Input>
              <Input
                label="Email: "
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
                label="Full Name: "
                placeholder="Enter your Full Name"
                type="text"
                {...register("name", {
                  required: true,
                })}
              ></Input>
              <Input
                label="Password: "
                placeholder="Enter your Password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              ></Input>
              <Button type="submit" className="w-full"></Button>
            </div>
          </from>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
