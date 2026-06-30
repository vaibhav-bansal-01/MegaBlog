import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center
        px-5 py-2.5
        rounded-xl
        font-medium
        ${bgColor}
        ${textColor}
        shadow-md
        transition-all duration-300
        hover:scale-105
        hover:shadow-lg
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
