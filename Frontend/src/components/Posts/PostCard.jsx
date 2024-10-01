import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaComment, FaPen, FaTrash } from "react-icons/fa";
import moment from "moment";
import { postLikedData, deletePost } from "../../api/api";
import { deleteData, updateLikeData } from "../../store/slices/postArraySlice";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../store/slices/postModalSlice";
import { TailSpin } from "react-loader-spinner";
import { showCard } from "../../store/slices/alertSlice";
import { Link } from "react-router-dom";

function PostCard({ value }) {
  const user = useSelector((state) => state.tokenSlice);

  const {
    isUser,
    _id,
    title,
    author,
    content,
    hastags,
    selectedFile,
    like,
    comments,
    createAt,
  } = value;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(like);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  async function likedData(id, userId) {
    try {
      if (user.token == null) {
        dispatch(showCard(true));
      } else {
        const updatedLikes = await postLikedData(id, userId);
        setLikes(updatedLikes);
        dispatch(
          updateLikeData({
            id,
            updatedLikes,
          })
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  async function deleteDataFromArray(id) {
    try {
      setDeleted(true);
      const getData = await deletePost(id);
      dispatch(deleteData(getData?.data?.deletedArray?._id));
      setDeleted(false);
    } catch (error) {
      setDeleted(false);
      console.error(error);
    }
  }

  const isLiked = likes?.some((value) => value == user?.token?.result?._id);

  return (
    <div className="max-w-[500px] w-full bg-black mr-0 rounded-lg z-[11] p-3 mb-10">
      <div className="flex justify-between items-center mb-3 p-2">
        <Link to={`/profile/${author}`}>
          <p className="text-white font-bold text-1xl">{author}</p>
        </Link>
        {isUser == user?.token?.result?._id && (
          <div className="flex text-xl text-white">
            <FaPen
              onClick={() =>
                dispatch(
                  updateData({
                    id: _id,
                    isActive: true,
                    mode: "Edit post",
                    currentPost: value,
                  })
                )
              }
              className="mr-3 hover:text-blue-700 transition cursor-pointer"
            />
            <div>
              <div className="flex items-center">
                <FaTrash
                  onClick={() => deleteDataFromArray(_id)}
                  className="mr-2 hover:text-blue-700 transition cursor-pointer"
                />
                <TailSpin
                  visible={isDeleted}
                  color="#fff"
                  height="20"
                  width="20"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <img
        src={selectedFile}
        className={`${!selectedFile && `hidden`} rounded-lg`}
        alt="post-image"
      />
      <div>
        <div className="text-white mt-3 flex text-[25px] font-bold p-3">
          <div
            onClick={() => likedData(_id, user?.token?.result?._id)}
            className={`active:scale-90 flex items-center hover:text-blue-700 transition cursor-pointer ${
              isLiked && `text-blue-700`
            }`}
          >
            <FaThumbsUp />
            <span className="text-[18px]">&nbsp;{likes?.length}</span>
          </div>
          <div className="flex items-center mx-5 hover:text-blue-700 transition cursor-pointer">
            <Link to={`/comment/${title}`}>
              <FaComment />
            </Link>
            <span className="text-[18px]">&nbsp;{comments?.length}</span>
          </div>
        </div>
        <div className="text-white mt-3 mb-8">
          <p className="text-white font-normal my-3">
            {moment(createAt).fromNow()}
          </p>
          <h1 className="text-2xl mb-2">{title}</h1>
          <p
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[500px]" : "max-h-[100px]"
            } ${!isExpanded ? "line-clamp-3" : ""}`}
          >
            {content}
          </p>
          <div className="text-blue-500 font-normal my-1 flex flex-wrap">
            {hastags.map((tag, index) => (
              <span key={index} className="mr-2 mb-1">
                #{tag}
              </span>
            ))}
          </div>
          {content.length >= 250 ? (
            <span
              onClick={toggleExpansion}
              className="text-white font-bold mt-2 cursor-pointer"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
