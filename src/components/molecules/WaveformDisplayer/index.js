import React from "react";

function WaveformDisplayer({ input, title, onPlay, onPause }) {
  return (
    <div className="w-[80%] max-h-100 rounded-md border border-gray-200 shadow-md p-4 sm:w-[67%]">
      <div className="p-2 bg-blue-600 border border-gray-200 shadow-md w-fit rounded-md mb-10">
        <p className="font-semibold text-white">{title}</p>
      </div>
      {input ? <div id="wave" /> : <p>There is no input.</p>}
      <div id="wave-timeline"></div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onPlay}
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Play
        </button>
        <button
          type="button"
          onClick={onPause}
          className="mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default WaveformDisplayer;
