import { useEffect, useState, useContext } from "react";
import { UserContext, useUser } from "../context/userContext";
import {
  InboxIcon,
  StarIcon,
  ArchiveIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";

function EmailListItem({ id }) {
  const { token, user } = useContext(UserContext);
  const [email, setEmail] = useState();
  useEffect(() => {
    const fetchEmails = async () => {
      //   console.log("TOKEN", token);
      const emailItem = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${user?.googleId}/messages/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}
          `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      ).then((res) => res.json());
      setEmail(emailItem);
      console.log("EMAIL", email);
    };

    if (token) {
      fetchEmails();
    }
  }, []);
  return (
    <div className="flex w-full h-10 pl-4 items-center border-b border-gray-700 text-gray-400">
      <div className="flex items-center space-x-4">
        <p>▢</p>
        <StarIcon className="h-5" />
        <BookmarkIcon className="h-5" />
      </div>
      <div className="ml-24 flex w-[60rem]">
        <p className="truncate">{email?.snippet}</p>
        <p className="">7/11/21</p>
      </div>
    </div>
  );
}

export default EmailListItem;
