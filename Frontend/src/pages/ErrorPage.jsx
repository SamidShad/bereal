import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div className="w-[100%] flex justify-center items-center h-[100vh]">
        <div className="m-5 z-[11] flex justify-center flex-col items-center">
          <h1 className="text-white text-3xl text-center">
            Sorry, this page isn't available.
          </h1>
          <p className="text-white text-center max-w-[400px] text-sm mt-3">
            The link you followed may be broken, or the page may have been
            removed.
            <Link to="/">
              <span className="text-blue-700 font-bold cursor-pointer">
                Go back to BeReal.
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
