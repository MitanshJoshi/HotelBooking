import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";

const Placepage = () => {
  const [place, setplace] = useState();
  const [showAllPhotos, setshowAllPhotos] = useState(false);
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [Name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [noOfGuests, setnoOfGuests] = useState(1);
  const [price, setprice] = useState("");
  const navigate = useNavigate();

  let numberOfDays = 0;

  if (checkIn && checkOut) {
    numberOfDays = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  const { id } = useParams();

  useEffect(() => {
    if (checkIn && checkOut && place) {
      setprice(numberOfDays * place.price);
    }
  }, [checkIn, checkOut, numberOfDays, place]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const resp = await axios.get(`/place/${id}`);

        setplace(resp.data);
      } catch (error) {}
    };

    fetchPlace();
  }, []);

  if (!place) {
    return "Loading...";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-w-full bg-black text-white">
        <div className="bg-black p-8 grid gap-4">
          <h2 className="text-3xl">{place.title}</h2>
          <button
            className="bg-white text-black flex justify-center items-center fixed right-12 top-8 px-4 py-2 rounded-full"
            onClick={() => setshowAllPhotos(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Close</span>
          </button>
          {place.photos.length > 0 &&
            place.photos.map((photo) => (
              <div className="">
                <img
                  className="w-full"
                  src={`http://localhost:4000/uploads/` + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  const bookThisPlace = async () => {
    try {
      const response = await axios.post("/booking", {
        place: place._id,
        checkIn,
        checkOut,
        Name,
        noOfGuests,
        phone,
        price,
      });
      console.log(response.data);
      navigate("/account/bookings");
    } catch (error) {}
  };

  return (
    <div className="bg-gray-100 ">
    <div className=" mt-4 lg:mx-[300px]">
      <h1 className="text-3xl ">{place.title}</h1>
      <a
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
        className=" text-sm font-semibold underline mt-2"
      >
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]  relative">
        <div className="">
          {place.photos[0] && (
            <div>
              <img
                className="rounded-tl-2xl rounded-bl-2xl  aspect-square object-cover "
                src={`http://localhost:4000/uploads/` + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid  overflow-hidden">
          {place.photos[1] && (
            <div>
              <img
                className="aspect-square object-cover"
                src={`http://localhost:4000/uploads/` + place.photos[1]}
                alt=""
              />
            </div>
          )}
          <div className=" relative top-2">
            {place.photos[2] && (
              <div>
                <img
                  className="aspect-square object-cover "
                  src={`http://localhost:4000/uploads/` + place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setshowAllPhotos(true)}
          className="absolute bottom-4 flex items-center justify-center gap-1 right-4 bg-white px-3 py-1 rounded-lg border-black border-[1px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
              fill-rule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>

          <span>Show all photos</span>
        </button>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div className="p-4">
          <div className="my-2 ">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div>Check-in: {place.checkIn}</div>
          <div>Check-out: {place.checkOut}</div>
          <div>Max no of Guests: {place.maxGuests}</div>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <div className="text-2xl text-center">
            Price: ${place.price}/Night
          </div>
          <div className=" border-[1px] border-gray-400 items-center mt-4 rounded-2xl">
            <div className="flex">
              <div className="p-2">
                <label>Checkin</label>
                <br />
                <input
                  type="date"
                  name="Checkin"
                  value={checkIn}
                  onChange={(ev) => setcheckIn(ev.target.value)}
                />
              </div>
              <div className="border-l border-gray-400 p-2">
                <label>Checkout</label>
                <br />
                <input
                  type="date"
                  name="Checkout"
                  value={checkOut}
                  onChange={(ev) => setcheckOut(ev.target.value)}
                />
              </div>
            </div>
            <div className="border-t border-gray-400 p-2">
              <label>Max no of Guests</label>
              <input
                type="number"
                value={noOfGuests}
                onChange={(ev) => setnoOfGuests(ev.target.value)}
                className="border-gray-400 
              border-[1px] w-full px-3 py-1 rounded-2xl"
              />
            </div>
            <div className="border-t border-gray-400 p-2">
              <label>Your Name</label>
              <input
                type="text"
                value={Name}
                onChange={(ev) => setName(ev.target.value)}
                className="border-gray-400 
              border-[1px] w-full px-3 py-1 rounded-2xl"
              />
            </div>
            <div className=" p-2">
              <label>Phone No</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setphone(ev.target.value)}
                className="border-gray-400 
              border-[1px] w-full px-3 py-1 rounded-2xl"
              />
            </div>
            <button className="p-2">
              Book This Place
              {numberOfDays > 0 && <span>${numberOfDays * place.price}</span>}
            </button>
          </div>
          <div className="p-3">
            <button
              onClick={bookThisPlace}
              className="w-full bg-primary rounded-xl px-3 py-1 text-white"
            >
              Book
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 w-full">
        <h2 className="font-semibold text-2xl mb-2">Extra Info</h2>
        {place.extrainfo}
      </div>
    </div>
    </div>
  );
};

export default Placepage;
