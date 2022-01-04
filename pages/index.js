import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, useContext } from "react";
import { UserContext, useUser } from "../context/userContext";
import { Header, Sidebar, Emails } from "../components/index";

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  console.log("USER:", user);

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

      <main className="">
        <div className=" sticky top-0 z-50">
          <Header />
        </div>

        <div className="flex relative">
          <div className="">
            <Sidebar className="" />
          </div>
          <div className="w-full">
            <Emails className="overflow-y-scroll" />
          </div>
        </div>
      </main>
    </div>
  );
}
