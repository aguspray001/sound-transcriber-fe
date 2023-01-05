import React from "react";

const TextBox = ({ value, title, onChange, onSave }) => {
  return (
    <div className="flex flex-col justify-around items-center sm:items-stretch pt-4 pb-10 sm:flex-row">
      <div className="w-[20%]"></div>
      <div className="w-[80%] h-[15rem] rounded-md border border-gray-200 shadow-md p-4 flex flex-col sm:w-[67%]">
        <label for="result">
          <b>{title}:</b>
        </label>
        <textarea
          id="result"
          className="w-full h-[80%] border border-solid border-black p-4 rounded-md"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {value}
        </textarea>
        <button
          type="button"
          className="mt-4 max-w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TextBox;
