import { useDispatch } from "react-redux";
import {
  updatePosts,
  updateThreads,
} from "../../store/slices/exploreModeSlice";

function ExploreTab() {
  const dispatch = useDispatch();

  function upThreads() {
    dispatch(updateThreads(true));
    dispatch(updatePosts(false));
  }
  function upPosts() {
    dispatch(updatePosts(true));
    dispatch(updateThreads(false));
  }

  return (
    <>
      <div className="flex justify-center items-cente">
        <div className="z-[13] mt-[70px] max-w-[2000px] w-[100%] flex justify-end">
          <ul className="m-3 max-w-[170px] w-[100%] flex justify-around text-white z-[11] fixed backdrop-blur-sm bg-black/80 rounded-md p-2">
            <li className="cursor-pointer" onClick={upThreads}>
              Threads
            </li>
            <li className="cursor-pointer" onClick={upPosts}>
              Posts
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ExploreTab;
