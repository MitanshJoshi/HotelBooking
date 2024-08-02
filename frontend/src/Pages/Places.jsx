import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Perks from "../Perks";
import AccountNav from "../AccountNav";

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getplaces = async () => {
      try {
        const response = await axios.get("/user-places");
        setPlaces(response.data);
      } catch (error) {
        throw new error();
      }
    };

    getplaces();
  }, []);

  return (
    <div>
      <AccountNav />
      <Link
        to={"/account/places/new"}
        className="flex justify-center items-center"
      >
        <button className="px-4 py-2 text-white rounded-full bg-primary flex gap-1">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new places
        </button>
      </Link>
      {/* <div>
          <p>My places</p>
        </div> */}
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={`/account/places/${place._id}`} className="flex bg-gray-100 p-4 rounded-2xl grow shrink-0 mt-2">
              <div className="">
                {place.photos && place.photos.length > 0 && (
                  <img className="rounded-lg min-w-[200px] max-w-[200px] h-[100px]" src={`http://localhost:4000/uploads/`+place.photos[0]} alt="Place"></img>
                )}
              </div>
              <div className="ml-2 grow-0 shrink">
                <h2 className="font-bold">{place.title}</h2>
                <p className="mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Places;
