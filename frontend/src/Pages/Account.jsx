import React, { useContext, useState } from "react";
import { UserContext } from "../context/Usercontext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "../AccountNav";

const Profilepage = () => {
  const { user, ready, setuser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const navigate = useNavigate();
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile"; // Use assignment instead of comparison
  }

  const handlelogout = async () => {
    await axios.post("/logout");
    navigate("/");
    setuser(null);
  };

  console.log(subpage);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

 
  return (
    <div>
      <AccountNav/>
      {subpage == "profile" && (
        <div className="text-center max-w-lg mx-auto mt-2">
          This is the account page for {user.name}
          <br />
          <button
            onClick={handlelogout}
            className="bg-primary px-4 py-2 rounded-full text-white mt-2"
          >
            Logout
          </button>
        </div>
      )}
      {subpage == "places" && <Places />}
    </div>
  );
};

export default Profilepage;
