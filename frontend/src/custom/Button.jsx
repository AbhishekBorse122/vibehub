import React from 'react';

const Button = ({ children, className ,onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-black text-white border border-transparent rounded-lg font-semibold uppercase text-sm transition-all duration-300 ease-in-out transform hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:bg-gray-80 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;