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
  const [from, setFrom] = useState();
  const [subject, setSubject] = useState();
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
    };

    if (token) {
      fetchEmails();
    }
  }, []);

  useEffect(() => {
    email?.payload.headers.forEach((header) => {
      {
        header.name === "From" && setFrom(header.value);
      }
      if (header.name === "From") {
        setFrom(header?.value);
      }
      if (header.name === "Subject") {
        setSubject(header?.value);
      }
    });
  });

  console.log("EMAIL", email);

  return (
    <div className="flex flex-cols-2 w-full h-10 pl-4 items-center border-b border-gray-700 text-gray-00 text-sm">
      <div className="flex items-center space-x-4">
        <p>▢</p>
        <StarIcon className="h-5" />
        <BookmarkIcon className="h-5" />
        <p className="font-semibold truncate w-44">{from}</p>
      </div>
      <div className="ml-24 flex w-[60rem]">
        <p className="font-semibold truncate">{subject}</p>
        <p className=" text-black-extraLight truncate">{email?.snippet}</p>
      </div>
      <p className="ml-10 ">7/11/21</p>
    </div>
  );
}

export default EmailListItem;
