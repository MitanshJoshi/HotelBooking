import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./Layout";
import Indexpage from "./Pages/Indexpage";
import Loginpage from "./Pages/Loginpage";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Registerpage from "./Pages/Registerpage";
import axios from "axios";
import Account from "./Pages/Account";
import Profilepage from "./Pages/Account";
import Places from "./Pages/Places";
import PlacesFormPage from "./Pages/PlacesFormPage";
import Placepage from "./Pages/Placepage";
import BookingPage from "./Pages/BookingPage";
import BookingsPage from "./Pages/BookingsPage";


axios.defaults.baseURL = "https://hotel-booking-backend-theta.vercel.app/"
axios.defaults.withCredentials=true;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Indexpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
        <Route path="/account" element={<Profilepage/>}/>
        <Route path="/account/places" element={<Places/>}/>
        <Route path="/account/places/new" element={<PlacesFormPage/>}/>
        <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
        <Route path="/places/:id" element={<Placepage/>}/>
        <Route path="/account/bookings/:id" element={<BookingPage/>}/>
        <Route path="/account/bookings" element={<BookingsPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
