import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
