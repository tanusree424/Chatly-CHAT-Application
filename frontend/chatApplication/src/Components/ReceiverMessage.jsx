import React from "react";

const ReceiverMessage = ({ message, image }) => {
  return (
    <div className="flex w-full justify-start mt-3">
      <div className="max-w-[70%] bg-green-500 text-white px-4 py-2 rounded-2xl rounded-tl-none shadow-md flex flex-col gap-2">
        {image && <img src={image} alt="received" className="w-full rounded-lg" />}
        <span className="break-words">{message}</span>
      </div>
    </div>
  );
};

export default ReceiverMessage;
