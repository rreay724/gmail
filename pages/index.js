import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, useContext } from "react";

import { UserContext, useUser } from "../context/userContext";

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { signOut } = useUser();

  console.log("FROM HOME:", user);

  // if (!user) {
  //   router.push({ pathname: "/login" });
  // }
  useEffect(() => {
    {
      !user && router.push({ pathname: "/login" });
    }
  }, [user]);

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <button
          className="w-24 bg-blue-600 text-white rounded-full p-2"
          onClick={signOut}
        >
          Log out
        </button>
        <h1>This is the main page</h1>
      </main>
    </div>
  );
}
