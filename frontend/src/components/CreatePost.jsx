import { useState } from "react";
import API from "../services/api";

function CreatePost() {

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {

    const formData = new FormData();

    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    try {

      await API.post("/posts", formData, {

        headers: {

          Authorization:
            `Bearer ${localStorage.getItem("token")}`,

        },

      });

      alert("Post Uploaded");

      window.location.reload();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <div className="create-post">

      <textarea
        placeholder="Write something..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={handleSubmit}>
        Post
      </button>

    </div>

  );

}

export default CreatePost;