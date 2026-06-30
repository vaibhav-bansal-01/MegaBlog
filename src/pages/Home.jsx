import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/conf.js";
import { Container, PostCard } from "../components/index.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components/index.js";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  return authStatus ? (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-800 mb-12">
          Welcome to MegaBlog
        </h1>

        <p className="text-2xl text-gray-500 mb-12">
          Share your stories with the world.
          <br />
          Your next article is just one click away.
        </p>

        <Link to="/add-post">
          <Button className="px-8 py-3 text-2xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            🚀 Create New Post
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-8xl">
        <div className="text-8xl mb-6">✨</div>

        <h1 className="text-7xl font-bold text-gray-800 mb-5">
          Welcome to MegaBlog
        </h1>

        <p className="text-xl text-gray-500 mb-10">
          Read articles from creators around the world.
          <br />
          Join our community and start sharing your ideas.
        </p>

        <div className="flex justify-center gap-5">
          <Link to="/signup">
            <Button className="px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Sign Up
            </Button>
          </Link>

          <Link to="/login">
            <Button
              bgColor="bg-gray-100"
              textColor="text-gray-800"
              className="px-8 py-3 text-lg rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
