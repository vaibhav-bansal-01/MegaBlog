import React from "react";
import { Container } from "../index.js";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LogoWhite from "../../LogoWhite.jsx"

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Left */}
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105"
          >
            <LogoWhite width="200px" />
          </Link>

          {/* Center */}
          <p className="text-2xl font-semibold tracking-wide text-gray-100 absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            Write. Read. Create.
          </p>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/vaibhav-bansal-01"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={28} />
            </a>

            <a
              href="https://www.linkedin.com/in/vaibhav-bansal-078502289/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MegaBlog. Built with React & Appwrite.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
