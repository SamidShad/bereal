import axios from "axios";
const API_url = "http://localhost:8002/api";

const token = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))?.token
  : "";

export const allPostsData = async () => {
  try {
    const res = await axios.get(`${API_url}/posts`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postLikedData = async (id, userId) => {
  try {
    const res = await axios.patch(
      `${API_url}/likepost/${id}`,
      { userId: userId },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return res.data.like;
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (post) => {
  try {
    return axios.post(`${API_url}/addpost`, post, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const getData = await axios.delete(`${API_url}/deletepost/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return getData;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    await axios.patch(`${API_url}/updatepost/${id}`, updatedPost, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (userDetails) => {
  try {
    const user = await axios.post(`${API_url}/signup`, userDetails);
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (userDetails) => {
  try {
    const user = await axios.post(`${API_url}/signin`, userDetails);
    return user.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllRecentUsers = async () => {
  try {
    const user = await axios.get(`${API_url}/recentusers`);
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (search) => {
  try {
    const user = await axios.get(`${API_url}/getallusers`, {
      params: { search: search },
    });
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

export const getthatUser = async (username) => {
  try {
    const user = await axios.post(`${API_url}/getthatuser`, {
      username: username,
    });
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (isUser) => {
  try {
    const posts = await axios.post(`${API_url}/userposts`, {
      isUser: isUser,
    });
    return posts.data;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (postname) => {
  try {
    const posts = await axios.get(`${API_url}/getcomments/${postname}`, {
      params: { postname },
    });
    return posts.data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const addComments = async (commentBody) => {
  const { postname } = commentBody;
  try {
    const response = await axios.post(
      `${API_url}/comment/${postname}`,
      commentBody,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
