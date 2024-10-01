import React from "react";
import ExploreTab from "../components/Exploretab/ExploreTab";
import PostCard from "../components/Posts/PostCard";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

function Explore() {
  const { threads, posts, loading } = useSelector(
    (state) => state.exploreModeSlice
  );
  const data = useSelector((state) => state.postArraySlice);

  const showData = threads
    ? data.filter((value) => value.selectedFile.length == 0)
    : posts
    ? data.filter((value) => value.selectedFile.length > 0)
    : data;

  return (
    <>
      <ExploreTab />
      <div className="w-[100%] flex justify-center flex-col items-center">
        {navigator.onLine == false && (
          <div className="my-10 text-center text-white z-[11]">
            <p className="text-center text-white">You're offline</p>
          </div>
        )}
        {!loading && showData.length === 0 && (
          <div className="my-10 text-center text-white z-[11]">
            <p>No posts available.</p>
          </div>
        )}
        {showData.map((value) => {
          return <PostCard key={value._id} value={value} />;
        })}
        {loading && navigator.onLine == true && (
          <div className="my-10">
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
    </>
  );
}

export default Explore;
