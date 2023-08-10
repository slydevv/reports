"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { schema } from "../lib/auth/yupSchema";
import { Inputs } from "../types/Input";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { getSession } from "next-auth/react";


export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false,  })
      .then((res) => {
        if (res?.error) {
         
          toast.error(res.error);
        }
        if (res?.ok && !res?.error) {
          redirect()
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };
  const redirect = async () => {
    const session = await getSession() 
    const status = session?.user?.isAdmin
    status ? router.push("/admin") : router.push("/allreports");
  }
  return (
    <div className="max-w-[2000px] gap-x-10 lg:gap-x-20 mx-auto px-7 lg:pr-20">
      {/* <!-- Form --> */}
      <section className="w-full md:w-2/5 mx-auto">
        <h1 className="pt-12 font-bold text-2xl text-center lg:text-3xl">
          Sign In
        </h1>


        {/* <!-- Form components --> */}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mt-12">
            <div className="flex flex-col mt-5">
              <h3>Email address</h3>
              <input
                type="email"
                {...register("email")}
                className="pl-4 py-5 bg-[#F3F3F3] text-gray-900 rounded-md mt-2"
                placeholder="Janedoe@eha.ng"
              />
            </div>

            <div className="flex flex-col mt-5">
              <h3>Password</h3>
              <input
                {...register("password")}
                type="password"
                className="pl-4 py-5 bg-[#F3F3F3] text-gray-900 rounded-md mt-2"
                placeholder="Min. 6 characters"
              />
            </div>

            <div className="flex flex-col mt-14 items-center space-y-4">
              <button type="submit" disabled={isLoading} className={`primary-button w-full ${isLoading ? 'bg-gray-400': "primary-button"}`}>
                Login
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
