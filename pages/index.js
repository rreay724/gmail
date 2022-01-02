import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, useContext } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, login } from "../services/firebase";
import { UserContext } from "../context/userContext";

export default function Home() {
  const currentUser = useContext(UserContext);
  const router = useRouter();

  console.log(currentUser);
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push({
          pathname: "/login",
        });
        // router.reload(window.location.pathname);
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      router.push({ pathname: "/login" });
    }
  });

  console.log("USER", currentUser);
  return (
    <div className="">
      <Head>
        <title>Inbox - {user?.email}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <button
          className="w-24 bg-blue-600 text-white rounded-full p-2"
          onClick={logout}
        >
          Log out
        </button>
        <h1>This is the main page</h1>
      </main>
    </div>
  );
}
