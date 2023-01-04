import React from "react";

function FormUpload({ onChange, onFileChange, dataWaveform, onTranscript, onUpload, onSelectWavList, selectedWavList}) {
  return (
    <div className="w-4/5 h-4/5 rounded-md border border-gray-200 shadow-md p-4 mb-10 sm:mb-0 sm:w-1/5">
      <label
        className="block mb-2 text-sm font-medium text-black"
        for="file_input"
      >
        Upload .Wav file
      </label>
      <input
        className="block p-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        name="file_name"
        type="file"
        onChange={onFileChange}
      ></input>
      <button
        type="button"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={onUpload}
      >
        Upload
      </button>
      <label
        for="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        onChange={onSelectWavList}
        value={selectedWavList}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue>Select the existing .Wav file</option>
        {dataWaveform &&
          dataWaveform.map((waveform, key) => {
            return (
              <option key={waveform.file_name + key} value={waveform.file_name}>
                {waveform.file_name}
              </option>
            );
          })}
      </select>
      {/* input parameters */}
      <p className="font-semibold mb-2 mt-4">Input the parameters:</p>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="DB Threshold"
        onChange={onChange}
        name="db_threshold"
        required
      ></input>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Minimum Silence Length"
        onChange={onChange}
        name="min_silence_len"
        required
      ></input>
      <button
        type="button"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={onTranscript}
      >
        Transcript Your File
      </button>
    </div>
  );
}

export default FormUpload;
