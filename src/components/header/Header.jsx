import React from "react";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Create Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <Container className="max-w-7xl mx-auto px-8 lg:px-10">
        <nav className="relative flex items-center justify-between h-20">
          {/* Left - Logo */}
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105"
          >
            <Logo width="160px" />
          </Link>

          {/* Center - Navigation */}
          <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-blue-100 text-blue-600 shadow-sm"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ),
            )}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-3">
            {!authStatus ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-blue-100 text-blue-600 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <LogoutBtn />
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
