import React from "react";

function CommentCard({ value }) {
  const { userName, comment } = value;
  return (
    <>
      <div className="bg-black border-white border rounded-lg p-4 shadow-md mb-4 mt-[5px]">
        <p className="text-white font-bold">{userName}</p>
        <p className="text-white">{comment}</p>
      </div>
    </>
  );
}

export default CommentCard;
