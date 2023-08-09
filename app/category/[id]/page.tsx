"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { BiArrowBack } from "react-icons/bi";


const TableauEmbed = dynamic(
  () => {
    return import("../../components/tableau");
  },
  { ssr: false }
);
type props = {
  params: {
    id: string | number;
  };
};
export default function Category({ params }: props) {
  const { id } = params;
  const router = useRouter();
  const [categories, setCategories] = useState<any>([]);
  const [reports, setReports] = useState([]);
  const [tableauUrl, setTableauUrl] = useState("");

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const query = useQuery({
    queryKey: ["getcategory"],
    queryFn: () => axios.get(`/api/category/${id}`),
    onSuccess: ({ data }) => {
      setCategories(data.getOne);
      setReports(data.getOne.reports);
    },
  });
  return (
    <div className="flex flex-row max-w-[2000px] mx-auto px-6 lg:px-0">
      {/* <!-- Navigation bar --> */}
      <nav className="fixed bottom-0 w-full px-5 py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen bg-[#FAFAFA]">
        {/* <!-- nav elements --> */}
        <img
          src="/images/Clinic_Logo.jpg"
          alt="ehr logo"
          className="hidden lg:block mt-1"
        />
        {/* Report Categroy */}

        <div className="flex flex-row justify-between lg:flex-col lg:mt-10">
          {reports.map((report: any) => (
            <div
              key={report.id}
              className="flex flex-col underline underline-offset-4  justify-center items-center lg:items-start lg:flex-row lg:gap-3  lg:py-5 lg:px-4 rounded-md"
            >
              <p
                onClick={() => setTableauUrl(report.url)}
                className=" font-normal lg:text-center text-xs md:text-base hover:cursor-pointer"
              >
                {report.label}
              </p>
            </div>
          ))}
        </div>
      </nav>

      <section className="w-full lg:w-4/5 lg:px-14">
        <div className="flex flex-row justify-between items-center mt-5">
          <div className="flex flex-col">
            <div className="  lg:pt-6  lg:px-1 ">
              <p className="text-center text-gray-700 font-bold text-base md:text-2xl ">
                {categories?.name}
              </p>
            </div>
          </div>
          {/* <!-- Right header content --> */}
          <div className=" ">
            <div className="hidden md:block">
              <button
                onClick={() => router.back()}
                className="bg-blue-300 hover:bg-blue-500 text-white flex p-3 rounded-lg"
              >
                Back
              </button>
            </div>
          </div>
        </div>
        {!tableauUrl ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-2xl text-center ">
              Report Dashboard will display here
            </p>
          </div>
        ) : (
          <div className="my-8">
            <TableauEmbed viewUrl={tableauUrl} />
          </div>
        )}
      </section>
    </div>
  );
}
