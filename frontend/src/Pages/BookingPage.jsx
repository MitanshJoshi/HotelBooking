import axios from "axios";
import { differenceInDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  console.log("id is",id);
  const [booking, setbooking] = useState();
  const [showAllPhotos, setshowAllPhotos] = useState(false)
  useEffect(() => {
    const getbooking = async () => {
      const resp = await axios.get("/booking");

      const foundBooking = resp.data.find(({ _id }) => _id === id);

      if (foundBooking) {
        setbooking(foundBooking);
      }
    };
    getbooking();
  }, []);

  if (!booking) {
    return "Loading...";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-w-full bg-black text-white">
        <div className="bg-black p-8 grid gap-4">
          <h2 className="text-3xl">{booking.place.title}</h2>
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
          {booking.place.photos.length > 0 &&
            booking.place.photos.map((photo) => (
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
  return (
    <div className="lg:mx-[300px] mt-4">
      <h1 className="text-3xl ">{booking.place.title}</h1>
      <a
        target="_blank"
        href={`https://maps.google.com/?q=${booking.place.address}`}
        className=" text-sm font-semibold underline mt-2"
      >
        {booking.place.address}
      </a>
      <div className="bg-gray-300 p-4 rounded-lg my-4 ">
        {/* <hr></hr> */}
      <div className="flex mt-2 justify-between items-center">
        <div className="flex flex-col gap-2">
        <div className="text-xl ">
            Your Booking Details:
        </div>
        <div className="flex gap-2">
        <span>
          {differenceInDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
          />
        </svg>
        {booking.checkIn.split("T")[0]}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0L13.5 19.5M21 12H3"
          />
        </svg>
        {booking.checkOut.split("T")[0]}
        </div>
        </div>
        <div className=" text-white text-xl bg-primary rounded-xl p-4">
        Total price<br></br> ${booking.place.price}
        </div>
      </div>
    </div>
      <div className="grid gap-2 grid-cols-[2fr_1fr]  relative">
        <div className="">
          {booking.place.photos[0] && (
            <div>
              <img
                className="rounded-tl-2xl rounded-bl-2xl  aspect-square object-cover "
                src={`http://localhost:4000/uploads/` + booking.place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid  overflow-hidden">
          {booking.place.photos[1] && (
            <div>
              <img
                className="aspect-square object-cover"
                src={`http://localhost:4000/uploads/` + booking.place.photos[1]}
                alt=""
              />
            </div>
          )}
          <div className=" relative top-2">
            {booking.place.photos[2] && (
              <div>
                <img
                  className="aspect-square object-cover "
                  src={
                    `http://localhost:4000/uploads/` + booking.place.photos[2]
                  }
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
      <div className="my-2 ">
            <h2 className="font-semibold text-2xl">Description</h2>
            {booking.place.description}
          </div>
    </div>
  );
};

export default BookingPage;
