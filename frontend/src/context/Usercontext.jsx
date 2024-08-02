import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setuser] = useState(null);
  const [ready, setready] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await axios.get("/profile");
        setuser(resp.data);
        setready(true);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setuser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
