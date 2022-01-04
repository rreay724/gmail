import { createContext, useState, useEffect, useContext } from "react";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
import { refreshTokenSetup } from "../utils/refreshToken";
import { useRouter } from "next/dist/client/router";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const scope = "https://www.googleapis.com/auth/gmail.readonly";
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [emailList, setEmailList] = useState();
  const [token, setToken] = useState();
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    setUser(res.profileObj);

    refreshTokenSetup(res);
    router.push({
      pathname: "/",
    });
    setToken(res.accessToken);
    console.log("RES TOKEN", res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "online",
    scope,
    // responseType: "code",
    // prompt: "consent",
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

  useEffect(() => {
    const fetchEmails = async () => {
      //   console.log("TOKEN", token);
      const emails = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${user?.googleId}/messages?q=labelId%3APRIMARY&key=${process.env.NEXT_PUBLIC_API_KEY}
        `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setEmailList(emails);
    };

    if (token) {
      fetchEmails();
    }
  }, [token]);

  const userContextValue = { user, signIn, signOut, emailList, token };

  return <UserContext.Provider value={userContextValue} {...props} />;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
