import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/api";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers(search) {
      setLoading(true);
      const user = await getAllUsers(search);
      setUserArray(user);
      setLoading(false);
    }
    fetchUsers("");
  }, []);

  async function getUsers(search) {
    setLoading(true);
    const user = await getAllUsers(search);
    setUserArray(user);
    setLoading(false);
  }

  return (
    <>
      <div className="flex items-center justify-center w-[100%]">
        <input
          className="max-w-[700px] w-[100%] mt-[90px] mx-2 z-[11] my-2 bg-black rounded-lg text-1xl text-white border border-white outline-none py-2 px-4"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="search..."
          name="usersearch"
        />
        <button
          onClick={() => getUsers(searchValue)}
          className="inline-flex mt-[90px] my-2 mx-2 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-[11]"
        >
          Search
        </button>
      </div>
      <div className="w-[100%] flex justify-center">
        <div className="flex flex-wrap justify-evenly mt-6 max-w-[900px] w-[100%]">
          {navigator.onLine == false && (
            <div className="my-10 text-center text-white z-[11]">
              <p className="text-center text-white">You're offline</p>
            </div>
          )}
          {!loading && userArray.length === 0 && (
            <div className="my-10 text-center text-white z-[11]">
              <p>User not found</p>
            </div>
          )}
          {userArray &&
            userArray.map((value, key) => {
              return (
                !loading && (
                  <div
                    key={key}
                    className="z-[11] m-5 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-black border-white-700"
                  >
                    <div className="flex flex-col items-center pb-10 mt-10">
                      <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={value.profileImage}
                        alt="Bonnie image"
                      />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {value.userName}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {value.email}
                      </span>
                      <div className="flex mt-4 md:mt-6">
                        <Link to={`/profile/${value.userName}`}>
                          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          {loading && navigator.onLine == true && (
            <div className="my-10 flex justify-center items-center w-[100%]">
              <TailSpin
                visible={true}
                height="50"
                width="50"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
