import { useContext, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setTokenAndId = async (token, id) => {
    if (token && id) {
      Cookies.set("gamePadUserToken", response.data.token, {
        expires: 15,
        secure: true,
      });
      setToken(response.data.token);
      Cookies.set("gamePadUserId", response.data._id, {
        expires: 15,
        secure: true,
      });
      setUserId(response.data._id);
    } else {
      Cookies.remove("gamePadUserToken");
      Cookies.remove("gamePadUserId");
    }
    setToken(token);
    setUserId(id);
  };

  useEffect(() => {
    const getDataFromAsync = async () => {
      const [token, setToken] = useState(
        Cookies.get("gamePadUserToken") || null
      );
      const [userId, setUserId] = useState(
        Cookies.get("gamePadUserId") || null
      );
      console.log("getDataFromAsync:", token, userId);
    };
    getDataFromAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, setTokenAndId }}>
      {children}
    </AuthContext.Provider>
  );
};
