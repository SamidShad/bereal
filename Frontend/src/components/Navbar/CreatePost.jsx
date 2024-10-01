import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../api/api";
import { setData, updateArrayData } from "../../store/slices/postArraySlice";
import { updateData } from "../../store/slices/postModalSlice";
import FileBase64 from "react-file-base64";
import { TailSpin } from "react-loader-spinner";

function CreatePost() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.tokenSlice);
  const [isUpload, setUpload] = useState(false);

  const { id, isActive, mode, currentPost } = useSelector(
    (state) => state.postModalSlice
  );

  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  function showAlert(message) {
    setAlert({
      show: true,
      message: message,
    });

    setTimeout(() => {
      setAlert({
        ...alert,
        show: false,
      });
    }, 5000);
  }

  const [isCaps, setCaps] = useState(false);
  const [contentData, setContentData] = useState({
    isUser: user?.token?.result?._id,
    title: "",
    content: "",
    author: user.userName,
    hastags: [""],
    selectedFile: "",
  });

  const { title, content, author, hastags, selectedFile } = contentData;

  const capsOnFunc = () => {
    dispatch(updateData({ isActive: true }));
    setCaps(!isCaps);
  };

  function creatingContent(e) {
    const { name, value } = e.target;
    if (name === "hastags") {
      setContentData((prev) => ({ ...prev, [name]: value.split(",") }));
    } else {
      setContentData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleFileUpload(file) {
    if (file && file.base64) {
      setContentData((prev) => ({ ...prev, selectedFile: file.base64 }));
    }
  }

  async function CreatePostFunc(postContent) {
    try {
      if ((title && content && author && hastags.length > 0) || selectedFile) {
        if (mode === "Create a post") {
          setUpload(true);
          let { data } = await addPost(postContent);
          dispatch(setData(data));
          setContentData({
            ...contentData,
            title: "",
            content: "",
            author: user.userName,
            hastags: [""],
            selectedFile: "",
          });
          dispatch(updateData({ isActive: false }));
          setUpload(false);
        } else if (mode === "Edit post" && id) {
          setUpload(true);
          await updatePost(id, contentData);
          dispatch(updateArrayData({ id, contentData }));
          dispatch(updateData({ isActive: false }));
          setUpload(false);
        }
      } else {
        setUpload(false);
        showAlert("Please fill all the fields");
      }
    } catch (error) {
      setUpload(false);
    }
  }

  useEffect(() => {
    if (mode == "Edit post") {
      setContentData({
        ...contentData,
        _id: currentPost._id,
        title: currentPost.title,
        content: currentPost.content,
        author: user.userName,
        hastags: currentPost.hastags,
        selectedFile: currentPost.selectedFile,
        createAt: currentPost.createAt,
        like: currentPost.like,
      });
    } else {
      setContentData({
        ...contentData,
        title: "",
        content: "",
        author: user.userName,
        hastags: [""],
        selectedFile: "",
      });
    }
  }, [currentPost]);

  function cancelPost() {
    dispatch(updateData({ isActive: false }));
    setContentData({
      ...contentData,
      title: "",
      content: "",
      author: user.userName,
      hastags: [""],
      selectedFile: "",
    });
  }

  return (
    <>
      {isActive && (
        <div className="bg-black/55 w-[100%] h-[100%] fixed top-0 z-[12] flex justify-center items-center">
          <div className="bg-black w-[100%] max-w-[700px] rounded-lg m-3 p-2">
            <h1 className="text-white text-xl m-5 font-bold">{mode}</h1>
            <div>
              {!isCaps && (
                // <label htmlFor="ImageUploader">
                //   <div className="hover:bg-blue-700 transition cursor-pointer border border-dashed border-white text-white py-[70px] font-bold rounded-md">
                //     <h1 className="text-center">Put your image here</h1>
                //   </div>
                // </label>

                <div className="text-white w-[100%] flex justify-center items-start flex-col">
                  {selectedFile && (
                    <div
                      className="h-[150px] w-[100%]"
                      style={{
                        backgroundImage: `url(${selectedFile})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                    ></div>
                  )}
                  <div className="mt-3 ml-5">
                    <FileBase64 multiple={false} onDone={handleFileUpload} />
                  </div>
                </div>
              )}
              {/* <input
                className="hidden"
                type="file"
                onChange={creatingContent}
                name="selectedFile"
                id="ImageUploader"
              /> */}
              <p
                className={`${
                  alert.show ? `text-red-600 text-center mt-5` : "hidden"
                }`}
              >
                {alert.message}
              </p>
              <input
                className="bg-transparent rounded-md w-[100%] p-3 text-xl outline-none text-white pl-5 placeholder:text-white font-bold mt-3"
                type="text"
                value={title}
                name="title"
                onChange={creatingContent}
                placeholder="Title"
              />
              <input
                className="bg-transparent rounded-md w-[100%] p-3 text-xl outline-none text-white pl-5 placeholder:text-white font-bold"
                type="text"
                value={content}
                onChange={creatingContent}
                name="content"
                placeholder="Content"
              />

              <input
                className="bg-transparent rounded-md w-[100%] p-3 text-xl outline-none text-white pl-5 placeholder:text-white font-bold"
                type="text"
                value={hastags}
                onChange={creatingContent}
                name="hastags"
                placeholder="Hastags use coma's"
              />
            </div>
            <div className="flex items-center flex-wrap">
              <button
                onClick={() => CreatePostFunc(contentData)}
                className="hover:bg-blue-700 transition hover:text-white active:bg-blue-500 active:scale-95 bg-white rounded-md py-2 px-3 font-bold ml-5 my-5 mr-3 flex items-center"
              >
                {mode == "Edit post" ? "Update" : "Publish"}
                <div className="ml-2">
                  <TailSpin
                    visible={isUpload}
                    color="#000"
                    height="20"
                    width="20"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              </button>
              <button
                onClick={capsOnFunc}
                className="hover:bg-blue-700 transition hover:text-white mr-3 active:bg-blue-500 active:scale-95 bg-white rounded-md py-2 px-3 font-bold"
              >
                {!isCaps ? "Captions" : "Img"}
              </button>
              <button
                onClick={cancelPost}
                className="hover:bg-blue-700 transition hover:text-white active:bg-blue-500 active:scale-95 bg-white rounded-md py-2 px-3 font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
