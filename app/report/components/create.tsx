"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../../components/modal";
import { useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

interface inputProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Inputs {
  label: string;
  link: string;
  category: string;
}

const Create: React.FC<inputProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const query = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => axios("/api/category"),
    onSuccess: ({ data }) => {
      setCategories(data);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCreate: SubmitHandler<Inputs> = async (data) => {
    const { label, link, category } = data;
    try {
      const response = await axios.post("/api/report", {
        label,
        link,
        category,
      });
      if ((response.status = 201)) {
        reset();
        onClose();
        toast.success("Report added");
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create new report
            </h2>
            <div className="mt-10 flex flex-col gap-y-8">
              <input
                type="text"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                {...register("label")}
                placeholder="label"
              />
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <input
                type="url"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                {...register("link")}
                placeholder="Enter Tableau url"
              />
            </div>
            <div className="flex flex-col mt-5">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Listbox value={field.value} onChange={field.onChange}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {!field.value ? "Categories" : field.value}
                        </span>
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
                        <Listbox.Options className=" mt-1 w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-300">
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
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-centr justify-end gap-x-6">
          <button
            className="bg-gray-400 hover:bg-gray-200 flex justify-center rounded-md px-3 py-2 text-sm text-white"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-200 flex justify-center rounded-md px-3 py-2 text-sm text-white"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Create;
