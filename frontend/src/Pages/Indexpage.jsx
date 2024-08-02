import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Indexpage = () => {
  const [places, setplaces] = useState([]);
  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const resp = await axios.get("/places");
        setplaces(resp.data);
        console;
      } catch (error) {}
    };

    fetchAllPlaces();
  }, []);

  return (
    <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/places/${place._id}`}>
            <div className="mb-2">
              <img className=" h-[300px] rounded-xl" src={`http://localhost:4000/uploads/${place.photos[0]}`}></img>
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
            <h2 className="text-sm truncate font-bold mt-2">${place.price} Per Night</h2>
          </Link>
        ))}
    </div>
  );
};

export default Indexpage;
