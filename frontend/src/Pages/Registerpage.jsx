import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const Registerpage = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const registeruser=(e)=>{
      e.preventDefault();
      try {
        axios.post("/register",{
          name,
          email,
          password,
        });
        alert("reigstration successfull")
      } catch (error) {
        alert("registration unsuccessful",error);
      }
    

    }



  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border-[2px] border-gray-100 ">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-6" onSubmit={registeruser}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
                Name
            </label>
            <input
              id="name"
              value={name}
              name="name"
              type="text"
              autoComplete="name"
              onChange={ev=>(setname(ev.target.value))}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
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
              onChange={ev=>(setemail(ev.target.value))}
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
              name="password"
              type="password"
              value={password}
              onChange={ev=>(setpassword(ev.target.value))}
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
              Register
            </button>
          </div>
          <div className="flex justify-center items-center text-gray-500">
            Already a member? <Link to="/login" className="ml-1 underline text-black font-semibold">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
