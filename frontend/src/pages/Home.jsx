import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {

      const res = await API.get("/posts");

      setPosts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">

      <Sidebar />

      <div className="feed">

        <CreatePost />

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}

      </div>

      <div className="right-sidebar">
        <h3>Suggested Users</h3>
      </div>

    </div>
  );
}

export default Home;