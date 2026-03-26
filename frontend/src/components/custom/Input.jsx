import React from 'react';

const Input = ({ value,name,onChange, type = "text", placeholder = "" }) => {
  return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
      />
  );
};

export default Input;