import React from "react";

const SenderMessage = ({ message, image }) => {
  return (
    <div className="flex w-full justify-end mt-3">
      <div className="max-w-[70%] bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-md flex flex-col gap-2">
        {image && <img src={image} alt="sent" className="w-full rounded-lg" />}
        <span className="break-words">{message}</span>
      </div>
    </div>
  );
};

export default SenderMessage;
