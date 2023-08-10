"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function AllReports() {
  const router = useRouter();
  const [categories, setCategories] = useState([])

  const { data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        } 
        
  })

   const query = useQuery({ 
     queryKey: ["getcategory"],
     queryFn: () => axios.get("/api/category"),
     onSuccess: ({ data }) => {  setCategories(data) },
   });

  const handleClick = (id: string | number, name:string) => {
    // @ts-ignore
    const accessAvailable = session?.user?.categories;
    const userAccess = accessAvailable.map((access: any) => {
      return access.name
    })
    const hasAccess = userAccess.includes(name)
    !hasAccess ? toast.error("You do not have access to this report") :  router.push(`/category/${id}`);

    
  };
  if (status === "loading") {
    return <div>Loading! If this presist, refresh your page</div>;
  }
  // p
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
          <div className="flex flex-row justify-between lg:flex-col lg:mt-20">
            <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
              <p className="text-inactive font-normal text-xs md:text-base"></p>
            </div>

            <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
              <p className="text-inactive font-normal text-xs md:text-base"></p>
            </div>

            <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
              <p className="text-inactive font-normal text-xs md:text-base"></p>
            </div>

            <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 md:px-4 rounded-md">
              <p className="text-inactive font-normal text-xs md:text-base"></p>
            </div>

            <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:gap-3 lg:justify-start lg:py-5 lg:px-4 rounded-md">
              <p className="text-inactive font-normal text-xs md:text-base"></p>
            </div>
          </div>
        </nav>

        <section className="w-full lg:w-4/5 lg:px-14">
          {/* <!-- Header content --> */}
          <div className="flex flex-row justify-between items-center mt-5">
            {/* <!-- Right header content --> */}
            <div className="flex flex-row justify-center items-center gap-8">
              <div className="hidden md:block">
                <div className="relative md:w-[200px] lg:w-80">
                  <input
                    type="text"
                    className="py-5 pl-14 pr-4 bg-[#F5F4F7] w-full rounded-md md:mr-5 truncate"
                    placeholder="Search for reports"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Body --> */}
          <div className="flex flex-col">
            {/* <!-- Lower div --> */}
            <section className="flex mt-12 flex-col pb-36 md:pb-20">
              {/* <!-- search and options --> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center"></div>

              {/* <!-- assessments --> */}
              <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* <!-- card 1 --> */}
                {categories &&
                  categories.map((category: any) => (
                    <div
                      onClick={() => handleClick(category.id, category.name)}
                      key={category.id}
                      className=" hover:cursor-pointer hover:bg-slate-100 transform transition duration-500 hover:scale-110 text-center flex flex-col p-5 border border-[#ececec] rounded-xl h-[160px] justify-between"
                    >
                      <div className="">
                        <p className="text-4xl font-bold">{category?.name}</p>
                      </div>

                      <div className="mt-5"> </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
}