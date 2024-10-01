import React from "react";
import BottomBar from "./BottomBar";
import CreatePost from "./CreatePost";
function Navbar() {
  return (
    <>
      <div className="flex items-center z-[13] justify-center fixed w-[100%]">
        <nav className="flex items-center justify-center backdrop-blur-sm bg-black/80 w-[100%] text-white m-2 rounded-md p-1 shadow-md">
          <h1 className="text-2xl my-2 font-bold sm:text-3xl">
            BeReal<span className="text-blue-700">.</span>
          </h1>
        </nav>
      </div>
      <BottomBar />
      <CreatePost />
    </>
  );
}

export default Navbar;
