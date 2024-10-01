import { FaHome, FaMap, FaSearch, FaPlus, FaUser } from "react-icons/fa";
import { updateData } from "../../store/slices/postModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { showCard } from "../../store/slices/alertSlice";

function BottomBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.tokenSlice);
  const isComment = useSelector((state) => state.commentSlice.showComment);

  const createFuncAuthCheck = () => {
    if (user?.token !== null) {
      dispatch(updateData({ isActive: true }));
    } else {
      dispatch(showCard(true));
    }
  };

  return (
    <>
      {!isComment && (
        <div className="lg:hidden w-[100%] flex justify-center items-center fixed bottom-0 z-[12]">
          <nav className="flex items-center justify-center backdrop-blur-sm bg-black/80 w-[100%] text-white m-2 rounded-md p-3 shadow-md">
            <ul className="flex justify-around w-[100%]">
              <a href="/">
                <li>
                  <FaHome className="text-2xl md:text-4xl hover:text-blue-700" />
                </li>
              </a>
              <a href="/explore">
                <li>
                  <FaMap className="text-2xl md:text-4xl hover:text-blue-700" />
                </li>
              </a>
              <li className="cursor-pointer" onClick={createFuncAuthCheck}>
                <FaPlus className="text-2xl md:text-4xl hover:text-blue-700" />
              </li>
              <a href="/search">
                <li>
                  <FaSearch className="text-2xl md:text-4xl hover:text-blue-700" />
                </li>
              </a>
              {user?.token !== null && (
                <a href={`/profile/${user.userName}`}>
                  <li>
                    <FaUser className="text-2xl md:text-4xl hover:text-blue-700" />
                  </li>
                </a>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default BottomBar;
