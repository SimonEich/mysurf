"use client";

import React, { useState } from "react";

function Page() {
  // State to manage the input value
  const [input, setInput] = useState<string>("");

  // Handle input field changes
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  // Handle the "Add" button click
  function handleAdd() {
    console.log(input); // Log the current input value
  }

  return (
    <div className="w-full flex gap-1 mt-2">
      {/* Input field for entering text */}
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none text-black"
        onChange={handleInput}
        value={input}
      />
      {/* Button for adding a new item */}
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}

export default Page;
