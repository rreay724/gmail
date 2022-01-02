import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, useContext } from "react";
import { UserContext, useUser } from "../context/userContext";
import { Header, Sidebar } from "../components/index";

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
    <div className="min-h-screen bg-black-default">
      <Head>
        <title>Inbox - {user?.email}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="">
        <Sidebar />
      </div>
    </div>
  );
}
