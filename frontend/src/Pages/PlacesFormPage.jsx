import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import Perks from "../Perks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setphotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtrainfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setprice] = useState("")
  const [maxGuests, setMaxGuests] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    const getPlace = async () => {
      const response = await axios.get(`/place/${id}`);
      const data = response.data;

      setTitle(data.title);
      setPhotos(data.photos);
      setDescription(data.description);
      setExtrainfo(data.extrainfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setAddress(data.address);
      setPerks(data.perks);
      setprice(data.price)
    };
    getPlace();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in perks) {
      setPerks({
        ...perks,
        [name]: e.target.checked,
      });
    } else {
      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "photos":
          setPhotos(value.split(","));
          break;
        case "description":
          setDescription(value);
          break;
        case "extrainfo":
          setExtrainfo(value);
          break;
        case "checkIn":
          setCheckIn(value);
          break;
        case "checkOut":
          setCheckOut(value);
          break;
        case "maxGuests":
          setMaxGuests(value);
          break;
        case "price":
          setprice(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extrainfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      try {
        await axios.put("/places", {
          id,
          ...placeData,
        });
        navigate("/account/places");
      } catch (error) {
        console.error("Error adding place:", error);
      }
    } else {
      try {
        await axios.post("/places", placeData);
        navigate("/account/places");
      } catch (error) {
        console.error("Error adding place:", error);
      }
    }
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("upload-by-link", {
      link: photoLink,
    });

    setPhotos((prev) => {
      return [...prev, filename];
    });

    setphotoLink("");
  };

  const handleUpload = async (ev) => {
    ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const response = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { data: filenames } = response;
    setPhotos((prev) => [
      ...prev,
      ...filenames.map((file) => file.replace("\\", "/")),
    ]);
  };

  const removePhoto = (ev,link) => {
    ev.preventDefault();
    setPhotos([...photos.filter((mainphoto) => mainphoto !== link)]);
  };

  const selectedPhoto=(ev,link)=>{
    ev.preventDefault();
    setPhotos([link,...photos.filter(photo=>photo!==link)])
  }


  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSubmit} className="w-full mx-auto mt-8">
        <div className="mb-4">
          <label className="block text-gray-800 text-xl mb-2" htmlFor="title">
            Title
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Enter a descriptive title for your place.
          </p>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-xl mb-2" htmlFor="address">
            Address
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Provide the address of the place.
          </p>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-xl mb-2" htmlFor="photos">
            Photos
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Add URLs of the photos of the place.
          </p>
          <input
            type="text"
            id="photos"
            name="photos"
            value={photoLink}
            onChange={(ev) => setphotoLink(ev.target.value)}
            className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handlePhotoUpload}
            type="button"
            className="bg-gray-300 px-4 py-2 rounded-full w-[18%] ml-2"
          >
            + Add Photos
          </button>
          <div className="flex">
            {photos.length > 0 &&
              photos.map((link) => (
                <div className="mt-2 mr-2 relative">
                  <img
                    className="  rounded-2xl w-[200px] h-[100px]"
                    src={`http://localhost:4000/uploads/${link}`}
                  ></img>
                  <button
                    onClick={ev => removePhoto(ev,link)}
                    className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white px-1 py-1 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={ev => selectedPhoto(ev,link)}
                    className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 py-1 rounded-lg"
                  >
                    {link == photos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                    {link !== photos[0] && (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                    
                  </button>
                </div>
              ))}
            <label className="cursor-pointer border-[2px] flex text-xl justify-center items-center px-4 py-2 rounded-lg h-[100px] w-[18%] ml-2 mt-2">
              <input
                multiple
                type="file"
                className="hidden"
                onChange={handleUpload}
              ></input>
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
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
              <span> Upload</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-800 text-xl mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Describe the place in detail.
          </p>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="shadow appearance-none border rounded h-[140px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-800 text-xl mb-2"
            htmlFor="extrainfo"
          >
            Extra Information
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Provide any additional information or rules.
          </p>
          <textarea
            id="extrainfo"
            name="extrainfo"
            value={extrainfo}
            onChange={handleChange}
            className="shadow appearance-none border h-[140px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex gap-10">
          <div className="mb-4">
            <label
              className="block text-gray-800 text-xl mb-2"
              htmlFor="checkIn"
            >
              Check-in Time
            </label>
            <p className="text-gray-600 text-sm mb-2">
              Specify the check-in time.
            </p>
            <input
              type="number"
              id="checkIn"
              name="checkIn"
              value={checkIn}
              onChange={handleChange}
              className="shadow rounded-full appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-800 text-xl mb-2"
              htmlFor="checkOut"
            >
              Check-out Time
            </label>
            <p className="text-gray-600 text-sm mb-2">
              Specify the check-out time.
            </p>
            <input
              type="number"
              id="checkOut"
              name="checkOut"
              value={checkOut}
              onChange={handleChange}
              className="shadow appearance-none rounded-full border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-800 text-xl mb-2"
              htmlFor="maxGuests"
            >
              Maximum Guests
            </label>
            <p className="text-gray-600 text-sm mb-2">
              Specify the maximum number of guests allowed.
            </p>
            <input
              type="number"
              id="maxGuests"
              name="maxGuests"
              value={maxGuests}
              onChange={handleChange}
              className="shadow appearance-none border rounded-full  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-xl mb-2"
              htmlFor="maxGuests"
            >
              Price Per Night
            </label>
            <p className="text-gray-600 text-sm mb-2">
              Specify the Price Per Night.
            </p>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
              className="shadow appearance-none border rounded-full  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary px-4 py-2 rounded-full text-white hover:bg-primary-dark"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
