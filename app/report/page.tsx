"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Create from "./components/create";
import Report from "./components/report";
import ConfirmModal from "../components/confirmModal";
import Update from "./components/update";

export default function Report() {
  const [reports, setReport] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");
  const [fieldData, setFieldData] = useState({
    label: "",
    link: "",
    category: "",
  });

  const query = useQuery({
    queryKey: ["getusers"],
    queryFn: () => axios.get("/api/report"),
    onSuccess: ({ data }) => {
      setReport(data);
    },
  });
  const onClose = () => {
    setOpenCreate(false);
    setConfirm(false);
    setUpdate(false);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/report/${id}`);
      const data = await res.data.getOne;
      setFieldData(data);
    };

    getData()
  }, [id]);

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
              className="hover:text-gray-500  font-normal text-xs underline underline-offset-1"
            >
              All Users
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/create"
              className="hover:text-gray-500  font-normal text-xs underline underline-offset-1"
            >
              Create User
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/categories"
              className="hover:text-gray-500  font-normal text-xs underline underline-offset-1"
            >
              Categories
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Link
              href="/report"
              className="hover:text-gray-500  font-normal text-xs underline underline-offset-1"
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
              onClick={() => setOpenCreate(true)}
              className="py-3 px-4 bg-blue-500 rounded-lg text-white"
            >
              Create
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-3  mx-10">
          {reports &&
            reports.map((report: any) => (
              <Report
                key={report.id}
                report={report}
                clickEdit={() => {
                  setId(report.id);
                  setUpdate(true);
                }}
                clickDelete={() => {
                  setConfirm(true);
                  setId(report.id);
                }}
              />
            ))}
        </div>
        <ConfirmModal api="report" isOpen={confirm} onClose={onClose} id={id} />
        <Update isOpen={update} onClose={onClose} id={id} />
        <Create isOpen={openCreate} onClose={onClose} />
      </section>
    </div>
  );
}
