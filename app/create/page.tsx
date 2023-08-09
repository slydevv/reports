"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  category: yup.array(),
});

type Inputs = {
  name: string;
  email: string;
  password: string;
  category: string[];
};
export default function Create() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const query = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => axios("/api/category"),
    onSuccess: ({ data }) => {
      setCategories(data);
    },
  });

  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue, 
    formState: { errors },
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: { category: [] },
  });

  const handleCreate: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password, category } = data;
    try {
      const response = await axios.post("/api/user", {
        name,
        email, 
        password,
        category,
      });
      if ((response.status = 201)) {
        reset();
        router.push("/admin");
      }
    } catch (error: any) {
    
      toast.error(error.response.data.error);
    }
  };
  // show this message when loading
  if (status === "loading") {
    return <div>Loading! If this presist, refresh your page</div>;
  }
  return (
    <div className="flex text-black flex-row max-w-[2000px] mx-auto px-6 lg:px-0">
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
              className="hover:text-gray-500 font-normal text-xs md:text-base underline underline-offset-1"
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
        <section className="w-full md:w-2/5 mx-auto">
          <h1 className="pt-12 font-bold text-2xl text-center lg:text-3xl">
            Create New User
          </h1>
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className="mt-12">
              <div className="flex flex-col mt-5">
                <input
                  type="text"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  {...register("name")}
                  placeholder="name"
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="text"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  {...register("email")}
                  placeholder="email"
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="text"
                  className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                  {...register("password")}
                  placeholder="password"
                />
              </div>
              <div className="flex flex-col mt-5">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Listbox
                      value={field.value}
                      onChange={field.onChange}
                      multiple
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">Categories</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronDoubleDown
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.map((category: any) => (
                              <Listbox.Option
                                key={category.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={category.name}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {category.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <AiOutlineCheck
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  )}
                />
                {errors.category && (
                  <span className="text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col mt-5">
                <button type="submit" className="primary-button">
                  Create
                </button>
              </div>
            </div>
          </form>
        </section>
      
    </div>
  );
}
