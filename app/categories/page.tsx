"use client";

import {  useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Create from "./components/create";
import ConfirmModal from "../components/confirmModal";
import { toast } from "react-hot-toast";
import Update from "./components/update";
import Category from "./components/category";

export default function Categories() {
  const [categories, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [confirm, setConfirm] = useState(false);

  const query = useQuery({
    queryKey: ["getusers"],
    queryFn: () => axios.get("/api/category"),
    onSuccess: ({ data }) => setCategory(data),
  });

  const onClose = () => {
    setIsOpen(false);
    setConfirm(false)
    setUpdate(false);
  };
  
  return (
    <div className="flex flex-row max-w-[2000px] mx-auto px-6 lg:px-0">
      {/* DISPLAY CATEGORY */}
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
      <section>
        <div className="mt-12 mx-12">
          <div className="hidden lg:flex  w-fit p-1 rounded-md">
            <button
              onClick={() => setIsOpen(true)}
              className="py-3 px-4 bg-blue-500 rounded-lg text-white"
            >
              Create
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12">
          {categories &&
            categories.map((category: any) => (
              <Category
                key={category.id}
                category={category}
                clickEdit={() => {
                  setUpdate(true);
                  setId(category.id);
                }}
                clickDelete={() => {
                  setConfirm(true);
                 setId(category.id);}
                }
                
              />
            ))}
        </div>
        <Update isOpen={update} onClose={onClose} id={id} />

        <ConfirmModal api="category" isOpen={confirm} onClose={onClose} id={id} />
      </section>

      <Create isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
 