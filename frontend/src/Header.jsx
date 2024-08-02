import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from './context/Usercontext';

const Header = () => {
  const {user} = useContext(UserContext);
  const navigate=useNavigate();

  const handlelogin=()=>{
    navigate(user?"/account":"/login");
  }
  return (
    <div>
      <header className="flex justify-between">
        <Link to={"/"} className="flex items-center gap-1">
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </span>

          <span className="font-semibold">airbnb</span>
        </Link>
        <div className="flex items-center border-gray-300 shadow-sm border-[1px] rounded-full p-2 gap-2">
          <div className="border-r-2 flex items-center justify-center w-[85px] font-semibold">
            Anywhere
          </div>
          <div className="border-r-2 flex items-center justify-center w-[85px] font-semibold">
            Any Day
          </div>
          <div className=" flex items-center justify-center w-[85px] opacity-60">
            add guests
          </div>
          <button className="text-white bg-primary rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex border-gray-300 p-2 border-[1px] rounded-full items-center gap-2">
          <span onClick={handlelogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
          <span className="text-white bg-gray-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 relative bottom-[-4px] overflow-hidden"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {!!user && <div>{user.name}</div>}
        </div>
      </header>
    </div>
  )
}

export default Header
