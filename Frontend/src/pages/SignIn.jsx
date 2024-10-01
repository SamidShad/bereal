import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../store/slices/tokenSlice";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.tokenSlice);
  const [isSignIn, setSignIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
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

  async function loginUserFunc(e) {
    e.preventDefault();
    setSignIn(true);
    const user = await signIn(userDetails);

    if (userDetails.email && userDetails.password) {
      if (user.token) {
        dispatch(
          addToken({
            token: user,
            userName: user.result.userName,
            realToken: user.token,
          })
        );
        setSignIn(false);
        navigate("/");
        window.location.reload();
      } else if (user.message) {
        setSignIn(false);
        toast.error(user.message);
        console.log(user.message);
      }
    } else {
      setSignIn(false);
      toast.error("Fill all the inputs");
    }
  }

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-black z-[13] p-4 rounded-lg shadow-lg max-w-xs w-full">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-100">
            Sign In
          </h2>
          <form onSubmit={loginUserFunc} method="POST">
            <div className="mb-4">
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

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                name="password"
                value={userDetails.password}
                onChange={userDetailsFunc}
                type="password"
                id="password"
                placeholder="Your password"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center  items-center bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Sign In
              {isSignIn && (
                <div className="mx-2">
                  <TailSpin color="white" width={15} height={15} />
                </div>
              )}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?
            <Link to="/signup">
              <span className="text-blue-700 hover:underline"> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
