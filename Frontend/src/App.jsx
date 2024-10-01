import Posts from "./pages/Posts";
import SideBars from "./components/Navbar/SideBars";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import { useEffect } from "react";
import { PostsLoading } from "./store/slices/exploreModeSlice";
import { useDispatch } from "react-redux";
import { allPostsData } from "./api/api";
import { addAllData } from "./store/slices/postArraySlice";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";
import Profile from "./components/Profile/profilePage";
import ScreenPage from "./components/Screen/ScreenPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CardAlert from "./components/Alerts/CardAlert";
import CommentPage from "./components/Comments/CommentPage";

function Layout({ left, right, children }) {
  return (
    <>
      <SideBars left={left} right={right} />
      {children}
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(PostsLoading(true));
        const data = await allPostsData();
        dispatch(addAllData(data));
        dispatch(PostsLoading(false));
      } catch (error) {
        dispatch(PostsLoading(false));
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <CardAlert />
      <ScreenPage />
      <Routes>
        <Route
          path="/"
          element={
            <Layout left={true} right={true}>
              <Posts />
            </Layout>
          }
        />
        <Route
          path="/explore"
          element={
            <Layout left={true} right={false}>
              <Explore />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout left={true} right={false}>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout left={true} right={false}>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/signUp"
          element={
            <Layout left={false} right={false}>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/signIn"
          element={
            <Layout left={false} right={false}>
              <SignIn />
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout left={true} right={false}>
              <ErrorPage />
            </Layout>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <Layout left={true} right={false}>
              <Profile />
            </Layout>
          }
        />
        <Route path="/comment/:postname" element={<CommentPage />} />
      </Routes>
    </>
  );
}

export default App;
