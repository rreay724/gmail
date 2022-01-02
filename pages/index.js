import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState, useContext } from "react";
import { UserContext, useUser } from "../context/userContext";
import { Header, Sidebar } from "../components/index";
import {
  InboxIcon,
  StarIcon,
  ClockIcon,
  PaperAirplaneIcon,
  PlusIcon,
} from "@heroicons/react/solid";

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

      <div className="sticky top-0">
        <Header />
        <div className="bg-black-default w-64 h-screen  pl-5">
          <div className="my-5 bg-white w-36 rounded-full h-12 flex items-center space-x-3 pl-2 cursor-pointer">
            <PlusIcon className="w-8 text-yellow-600" />
            <p className="text-sm">Compose</p>
          </div>
          <div className=" text-gray-300 space-y-3">
            <div className="flex items-center space-x-3">
              <InboxIcon className="w-6" />
              <p className="text-sm">Inbox</p>
            </div>
            <div className="flex items-center space-x-3">
              <StarIcon className="w-6" />
              <p className="text-sm">Starred</p>
            </div>
            <div className="flex items-center space-x-3">
              <ClockIcon className="w-6" />
              <p className="text-sm">Snoozed</p>
            </div>
            <div className="flex items-center space-x-3">
              <PaperAirplaneIcon className="w-6 rotate-90" />
              <p className="text-sm">Sent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
