import "../styles/globals.css";
import { UserProvider } from "../context/userContext";
import { useContext } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
