"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col-reverse justify-between md:flex-row items-center border-b border-b-[#ECECEC] px-10 pt-5 pb-2 mt-3">
      {/* Nav items */}
       <div className="">
         <div className="flex flex-col">
              <h3 className="text-xl lg:text-2xl">
                Hello {" "}
                <span className=" font-bold">
                  {session?.user?.name}!
                </span>
              </h3>
            </div>
        </div>
      <div className=" flex flex-row justify-between md:justify-end md:gap-10 ">
       
        {session ? (
          <button
            className={`cursor-pointer bg-black hover:bg-gray-400 p-3 text-white hover:text-black rounded-xl`}
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Log out
          </button>
        ) : (
          <Link
            href="/login"
            className={`cursor-pointer bg-black hover:bg-gray-400 p-3 text-white hover:text-black rounded-xl`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
