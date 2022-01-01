import { createContext, useState, useEffect, useContext } from "react";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
import { refreshTokenSetup } from "../utils/refreshToken";
import { useRouter } from "next/dist/client/router";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    setUser(res.profileObj);

    refreshTokenSetup(res);
    router.push({
      pathname: "/",
    });
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  const onLogoutSuccess = (res) => {
    console.log("Logged out Success");
    router.push({
      pathname: "/login",
    });
  };

  const onLogoutFailure = () => {
    console.log("Error logging out");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onLogoutFailure,
  });

  const userContextValue = { user, signIn, signOut };

  return <UserContext.Provider value={userContextValue} {...props} />;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
