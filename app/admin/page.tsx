'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast";
import Image from 'next/image'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


export default function Admin() {
  const router = useRouter()
  const [users, setUsers] = useState([]);

  const { data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        } 
  })
  
  const query = useQuery({
    queryKey: ["getusers"],
    queryFn: () => axios("/api/user"),
    onSuccess: ({ data }) => {setUsers(data) },
  });

  const handleDelete = async (id:any) => {
    if (confirm("Are you sure you want to delete this user?")) {
     await axios.delete(`/api/user/${id}`).then((res) => {
      
       toast.success("User deleted!");
       setUsers(users.filter((user:any) => user.id !== id))
    }).catch((err) => {
      
      toast.error("err");
    })
    } else {
      return
  }
    
  }
    
  // loading display
  if (status === "loading") {
    return <div>Loading! If this presist, refresh your page</div>;
  }
  // page display
  return (
    <div className="flex flex-row max-w-[2000px] mx-auto px-6 text-black lg:px-0">
      {/* <!-- Navigation bar --> */}
      <nav className="fixed bottom-0 w-full px-5 py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen bg-[#FAFAFA]">
        {/* <!-- nav elements --> */}
        <Image
          src="/images/Clinic_Logo.jpg"
          width={500}
          height={500}
          alt="ehr logo"
          className="hidden lg:block mt-1"
        />
        <div className="flex flex-row justify-between lg:flex-col lg:mt-20">
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/admin"
              className="hover:text-gray-500  font-normal text-xs md:text-base underline underline-offset-1"
            >
              All Users
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/create"
              className="hover:text-gray-500  font-normal text-xs md:text-base underline underline-offset-1"
            >
              Create User
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/categories"
              className="hover:text-gray-500  font-normal text-xs md:text-base underline underline-offset-1"
            >
              Categories
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/report"
              className="hover:text-gray-500  font-normal text-xs md:text-base underline underline-offset-1"
            >
              Report
            </Link>
          </div>
        </div>
      </nav>

      <div className="w-full pt-6 lg:p-10 bg-white">
        {/* <!-- header text --> */}
        <div className="flex items-center justify-between">
          <p className="text-3xl font-medium">All Users</p>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div>
                <p>{session.user?.name}</p>
                <p className="text-xs text-inactive">{session.user?.email}</p>
              </div>
            </div>
            <button className="mt-2"></button>
          </div>
        </div>

        {/* <!-- filter, search,  --> */}
        <div className="flex justify-between items-center mt-12">
          {/* <!-- left items --> */}
          <div className="flex flex-row-reverse lg:flex-row items-center gap-5">
            {/* <!-- filter --> */}
            <div className="flex items-center gap-2 text-inactive/50">
              <p>Search</p>
            </div>

            {/* <!-- line --> */}
            <div className="w-[1px] h-[60px] bg-[#ECECEC]"></div>
            {/* <!-- search --> */}
            <div>
              <input
                type="search"
                className="bg-[#fafafa] pl-4 py-3 rounded-md w-full lg:w-[300px] mt-2 outline-bluemedium border border-[#ececec]"
                placeholder="Customer email, name or order no."
              />
            </div>
          </div>

          {/* <!-- right items --> */}
          <div className="hidden lg:flex  w-fit p-1 rounded-md">
            <Link
              href="/create"
              className="py-3 px-4 bg-blue-500 rounded-lg text-white"
            >
              Create
            </Link>
          </div>
        </div>

        {/* <!-- table --> */}
        <div className="mt-8 mb-12 lg:mb-0">
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs bg-[#F6F6F6]">
                <tr>
                  <th scope="col" className="px-6 py-3 font-normal">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 font-normal"></th>
                  <th scope="col" className="px-6 py-3 font-normal"></th>
                  <th scope="col" className="px-6 py-3 font-normal"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              {/* <!-- table body --> */}
              <tbody className="rounded-md">
                {users &&
                  users.map((user: any) => (
                    <tr key={user.id} className="bg-white border-t text-black">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="flex">
                        {user.categories.map((category: any) => (
                          <p className="px-2 py-4 truncate" key={category.id}>
                            {category.name}
                          </p>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => router.push(`/update/${user.id}`)}
                          className="mx-4 p-1.5 rounded-lg  hover:text-green-500"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="mx-4 p-1 rounded-lg  text-red-400 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}