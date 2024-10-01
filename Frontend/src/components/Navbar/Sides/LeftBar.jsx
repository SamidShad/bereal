import { FaHome, FaMap, FaSearch, FaPlus, FaUser } from "react-icons/fa";
import { updateData } from "../../../store/slices/postModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToken } from "../../../store/slices/tokenSlice";
import { showCard } from "../../../store/slices/alertSlice";

function LeftBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.tokenSlice);

  const createFuncAuthCheck = () => {
    if (user.token !== null) {
      dispatch(updateData({ isActive: true }));
    } else {
      dispatch(showCard(true));
    }
  };

  const logoutFunc = () => {
    dispatch(addToken({ token: null, userName: null }));
  };

  return (
    <div className="h-screen w-[250px] bg-black mt-[80px] m-2 rounded-md">
      <div className="text-white mt-[80px] ml-[30px] text-xl">
        <ul>
          <Link to="/">
            <li className="mb-10 flex items-center hover:text-blue-700 transition">
              <FaHome size={30} />
              <span className="ml-3 font-medium cursor-pointer">Home</span>
            </li>
          </Link>
          <Link to="/explore">
            <li className="mb-10 flex items-center cursor-pointer hover:text-blue-700 transition">
              <FaMap size={30} />
              <span className="ml-3 font-medium">Explore</span>
            </li>
          </Link>
          <Link to="/search">
            <li className="mb-10 flex items-center cursor-pointer hover:text-blue-700 transition">
              <FaSearch size={30} />
              <span className="ml-3 font-medium">Search</span>
            </li>
          </Link>
          <li
            onClick={createFuncAuthCheck}
            className="mb-10 flex items-center cursor-pointer hover:text-blue-700 transition"
          >
            <FaPlus size={30} />
            <span className="ml-3 font-medium">Create</span>
          </li>

          {!user.token && (
            <li className="mb-10 flex items-center cursor-pointer hover:text-blue-700 transition">
              <Link to="/signin">
                <button className="inline-flex items-center px-6 py-2 text-1xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Login
                </button>
              </Link>
            </li>
          )}

          {user.token && (
            <>
              <Link to={`/profile/${user.userName}`}>
                <li className="mb-10 flex items-center cursor-pointer hover:text-blue-700 transition">
                  <FaUser size={30} />
                  <span className="ml-3 font-medium">Profile</span>
                </li>
              </Link>

              <li className="mb-10 flex items-center cursor-pointer">
                <button
                  onClick={logoutFunc}
                  className="inline-flex items-center px-6 py-2 text-xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;
