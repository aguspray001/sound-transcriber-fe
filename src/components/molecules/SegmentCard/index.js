import React from "react";

function SegmentCard({ segments }) {
  return (
    <div className="w-4/5 h-4/5 rounded-md border border-gray-200 shadow-md p-4 mb-10 sm:mb-0 sm:w-1/5">
      <p className="font-semibold mb-2">Select the segments below: </p>
      {segments &&
        segments.map((segment, key) => {
          return (
            <div key={key} className="bg-blue-500 rounded-lg p-2 mb-2 text-center cursor-pointer hover:bg-blue-600">
              <p className="text-white">
                {segment.name}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default SegmentCard;
