import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getthatUser, getUserPosts } from "../../api/api";
import PostCard from "../../components/Posts/PostCard";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../store/slices/tokenSlice";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { username } = useParams();
  const checkUser = useSelector((state) => state.tokenSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getThatUser() {
      setLoading(true);
      const gettingUser = await getthatUser(username);
      const getAllPosts = await getUserPosts(gettingUser[0]._id);
      setUserPosts(getAllPosts);
      setUserDetails(gettingUser);
      setLoading(false);
    }

    getThatUser();
  }, [username]);

  const logoutFunc = () => {
    dispatch(addToken({ token: null, userName: null }));
  };

  return (
    <>
      {navigator.onLine == false && (
        <div className="my-10 text-center text-white z-[11]">
          <p className="text-center text-white">You're offline</p>
        </div>
      )}

      {loading && navigator.onLine == true && (
        <div className="flex justify-center items-center">
          <div className="absolute top-[30%]">
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
        </div>
      )}

      {!loading && (
        <div className="min-h-screen bg-black text-white flex justify-center p-6">
          <div className="max-w-[600px] w-full mt-[80px] z-[11]">
            {userDetails.map((user) => (
              <div
                key={user._id}
                className="flex items-center flex-col justify-center md:justify-between"
              >
                <div className="w-[150px] h-[150px]  rounded-full overflow-hidden border-4 border-blue-700 mb-3">
                  <img
                    src={user.profileImage || "default-profile.jpg"}
                    alt={user.userName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <div className="mt-2">
                    <p className="text-lg font-semibold">
                      {userPosts.length} Posts
                    </p>
                  </div>

                  <h1 className="text-2xl font-bold">{user.fullName}</h1>
                  <p className="text-blue-700">@{user.userName}</p>
                  <a href={`mailto:${user.email}`}>
                    <button className="inline-flex mt-5 items-center py-2 px-5 text-1xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-[11]">
                      Contact
                    </button>
                  </a>

                  {checkUser.userName == username && (
                    <button
                      onClick={logoutFunc}
                      className="inline-flex mt-5 items-center py-2 px-5 text-1xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-[11] mx-2"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-9">
              <h1 className="text-3xl m-3 font-bold text-center">All Posts</h1>
              <div className="flex flex-col items-center">
                {!loading && userPosts.length === 0 && (
                  <div className="my-10 text-center text-white z-[11]">
                    <p>No posts available.</p>
                  </div>
                )}
                {userPosts &&
                  userPosts.map((value) => {
                    return (
                      <PostCard key={value._id} value={value} layout="0px" />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
