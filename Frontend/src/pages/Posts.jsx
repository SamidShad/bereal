import { useSelector } from "react-redux";
import PostCard from "../components/Posts/PostCard";
import { TailSpin } from "react-loader-spinner";

function Posts() {
  const { loading } = useSelector((state) => state.exploreModeSlice);
  const data = useSelector((state) => state.postArraySlice);

  const allDataArray = [...data].reverse();

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%] mt-[80px] flex justify-center">
          <div className="max-w-[2000px] w-[100%] flex justify-center flex-col items-center">
            {navigator.onLine == false && (
              <div className="my-10 text-center text-white z-[11]">
                <p className="text-center text-white">You're offline</p>
              </div>
            )}
            {!loading && allDataArray.length === 0 && (
              <div className="my-10 text-center text-white z-[11]">
                <p>No posts available.</p>
              </div>
            )}
            {allDataArray.map((value) => {
              return (
                <div
                  key={value._id}
                  className="lg:mr-[150px] w-full flex items-center justify-center"
                >
                  <PostCard value={value} />
                </div>
              );
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
        </div>
      </div>
    </>
  );
}

export default Posts;
