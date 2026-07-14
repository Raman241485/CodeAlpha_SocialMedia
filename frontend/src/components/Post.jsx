function Post({ post }) {

  return (

    <div className="post">

      <h3>{post.user?.name}</h3>

      <p>{post.caption}</p>

      {post.image && (

        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="Post"
          width="100%"
        />

      )}

      <div className="post-buttons">

        <button>❤️ {post.likes.length}</button>

        <button>💬 {post.comments.length}</button>

      </div>

    </div>

  );

}

export default Post;