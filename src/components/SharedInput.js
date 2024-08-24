import React from "react";
import "../global.css"
export default function SharedInput({ value, handleChange }) {
  return (
    <input
      className="bg-gray-50 mx-1 border border-sky-500 text-gray-900 text-sm rounded-lg w-10 h-6 px-2 py-1 focus:ring-2 focus:ring-sky-300 focus:border-sky-500 dark:bg-gray-700 dark:border-sky-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-300 dark:focus:border-sky-500 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      value={value}
      onChange={handleChange}
      type="number"
    />
  );
}
