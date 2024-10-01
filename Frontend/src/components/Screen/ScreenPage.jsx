import React, { useEffect, useState } from "react";

function ScreenPage() {
  const [isLoaded, setLoaded] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setLoaded(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoaded && (
        <div className="w-[100%] h-[100vh] bg-black flex flex-col fixed z-[20] justify-center items-center">
          <h1 className="text-white font-bold text-4xl">
            BeReal<span className="text-blue-700">.</span>
          </h1>
          <p className="text-white font-light text-sm mt-2">by Samid</p>
        </div>
      )}
    </>
  );
}

export default ScreenPage;
