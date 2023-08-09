"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

type Inputs = {
  email: string;
  password: string;
};
export default function RegisterAdmin() {
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const regNewUser: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    await axios
      .post("http://localhost:3000/api/user/register", { email, password })
      .then((res) => {
        if (res.status === 201) {
          router.push("/login");
        }
        
      });
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(regNewUser)}>
        <div>
          <label>
            Email:{" "}
            <input
              type="text"
              className="my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72"
              {...register("email", {
                required: "Please enter an email address",
              })}
            />
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              type="password"
              className="my-1 border-2 rounded-md focus:outline-pry w-60 md:w-72"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Min password length is 6 ",
                },
              })}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-black text-white w-40 h-10  rounded-2xl"
        >
          Register{" "}
        </button>
      </form>
    </div>
  );
}
