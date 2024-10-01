import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentCard from "./CommentCard";
import { addComments, getComments } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { showCard } from "../../store/slices/alertSlice";
import { showCommentFunc } from "../../store/slices/commentSlice";
function CommentPage() {
  const user = useSelector((state) => state.tokenSlice);
  const [commentsArray, setCommentsArray] = useState([]);
  const { postname } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    userName: user?.userName,
    comment: "",
    postname,
  });

  function inputFunc(e) {
    const { name, value } = e.target;
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    dispatch(showCommentFunc(true));
    async function getPostComments() {
      const comments = await getComments(postname);
      setCommentsArray(comments);
    }

    getPostComments();
  }, [postname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.token == null) {
      dispatch(showCard(true));
    } else {
      await commnetFunc(comment);
      const updatedComments = await getComments(postname);
      setCommentsArray(updatedComments);
      setComment((prev) => ({ ...prev, comment: "" }));
    }
  };

  const commnetFunc = async (commentBody) => {
    await addComments(commentBody);
  };

  const backFunc = () => {
    dispatch(showCommentFunc(false));
    navigate("/");
  };

  return (
    <div className="flex flex-col flex-wrap h-screen bg-black text-white">
      <div className="flex-grow p-4 overflow-y-auto mt-[50px]">
        {commentsArray.length === 0 && (
          <p className="text-center mt-[30px] font-bold text-2xl">
            No comments yet.
          </p>
        )}
        {commentsArray &&
          commentsArray.map((value, key) => {
            return <CommentCard key={key} value={value} />;
          })}
      </div>

      <div className="sticky bottom-0 bg-black border-t border-black p-4 flex space-x-2 flex-wrap">
        <button
          onClick={backFunc}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Back
        </button>
        <input
          type="text"
          name="comment"
          value={comment.comment}
          onChange={inputFunc}
          className="flex-grow border border-white rounded-lg px-4 py-2 bg-black outline-none text-white"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-700 m-2 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CommentPage;
