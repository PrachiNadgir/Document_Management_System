import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  // ❗ keep it dynamic (no hardcoding)
  const serverURL = "http://localhost:3000";

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get current user (JWT cookie based)
  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/user/current`, {
        withCredentials: true,
      });

      setUserData(res.data);
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setUserData(null);
    }
  };

  // ✅ Refresh user
  const refreshUser = () => handleCurrentUser();

  useEffect(() => {
    if (serverURL) {
      handleCurrentUser();
    }
  }, [serverURL]);

  return (
    <userDataContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        serverURL,
        logout,
        refreshUser,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;