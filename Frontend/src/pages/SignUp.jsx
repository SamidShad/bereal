import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../store/slices/tokenSlice";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.tokenSlice);
  const [isSignUp, setSignUp] = useState(false);

  const [userDetails, setUserDetails] = useState({
    profileImage: "",
    email: "",
    userName: "",
    fullName: "",
    password: "",
  });

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, []);

  function userDetailsFunc(e) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileUpload(file) {
    if (file && file.base64) {
      setUserDetails((prev) => ({ ...prev, profileImage: file.base64 }));
    }
  }

  async function createUserFunc(e) {
    e.preventDefault();
    setSignUp(true);
    const user = await signUp(userDetails);

    if (
      userDetails.email &&
      userDetails.password &&
      userDetails.userName &&
      userDetails.fullName &&
      userDetails.profileImage
    ) {
      if (user.token) {
        dispatch(
          addToken({
            token: user,
            userName: user.result.userName,
            realToken: user.token,
          })
        );
        setSignUp(false);
        navigate("/");
        window.location.reload();
      } else if (user.message) {
        setSignUp(false);
        toast.error(user.message);
        console.log(user.message);
      }
    } else {
      setSignUp(false);
      toast.error("Fill all the inputs");
    }
  }

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-black mt-[80px] mb-[30px] z-[13] p-4 rounded-lg shadow-lg max-w-xs w-full">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-100">
            Sign Up
          </h2>
          <form onSubmit={createUserFunc} method="POST">
            {/* Profile Image */}
            <div className="mb-3">
              <label className="block text-gray-400 text-sm font-medium mb-2">
                Profile Image
                {userDetails && (
                  <img
                    className="rounded-full m-3 w-[100px]"
                    src={userDetails.profileImage}
                    alt="Profile_image"
                  />
                )}
              </label>
              <FileBase64 multiple={false} onDone={handleFileUpload} />
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label
                htmlFor="fullName"
                className="block text-gray-400 text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userDetails.fullName}
                onChange={userDetailsFunc}
                id="fullName"
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* User Name */}
            <div className="mb-3">
              <label
                htmlFor="userName"
                className="block text-gray-400 text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                name="userName"
                type="text"
                value={userDetails.userName}
                onChange={userDetailsFunc}
                id="userName"
                placeholder="Your username"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                value={userDetails.email}
                onChange={userDetailsFunc}
                id="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                value={userDetails.password}
                onChange={userDetailsFunc}
                id="password"
                placeholder="Your password"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Sign Up
              {isSignUp && (
                <div className="mx-2">
                  <TailSpin color="white" width={15} height={15} />
                </div>
              )}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-700 hover:underline">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
