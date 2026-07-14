import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setUser(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>{user.name}</h1>

      <p>{user.email}</p>

      <p>Followers : {user.followers?.length}</p>

      <p>Following : {user.following?.length}</p>

    </div>
  );
}

export default Profile;