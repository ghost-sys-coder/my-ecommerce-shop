/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(undefined);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    setIsUserLoading(true);
    try {
      const { data } = await axios.get("/auth/profile");
      setUserProfile(data);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);



  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        isUserLoading,
        userProfile,
        setIsUserAuthenticated,
        setIsUserLoading,
        setUserProfile,
        fetchUserProfile,
        isDropdownOpen,
        setIsDropdownOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
