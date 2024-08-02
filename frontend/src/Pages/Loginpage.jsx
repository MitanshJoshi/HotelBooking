import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";


const Loginpage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const { setuser } = useContext(UserContext);

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      console.log("Response data:", response.data);
      setuser(response.data);
      alert("Login successful");
      setredirect(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Login unsuccessful");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border-[2px] border-gray-100">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handlelogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              value={email}
              onChange={(ev) => setemail(ev.target.value)}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(ev) => setpassword(ev.target.value)}
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center items-center text-gray-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="ml-1 underline text-black font-semibold">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
