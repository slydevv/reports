"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../../components/modal";
import {  FormEvent,  useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface inputProps {
  isOpen: boolean;
  onClose: () => void;
  id:string
}


const Update: React.FC<inputProps> = ({
  isOpen,
  onClose,
  id
}: inputProps) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState<{label:string, url:string, category:string}>({
    label: "",
    url: "",
    category:"Categories"
  })

  const query = useQuery({
    queryKey: ["getCategory"],
    queryFn: () => axios.get("/api/category"),
    onSuccess: ({ data }) => {
      setCategories(data);
    },
  });

  const handleChange = (event:any) => {
    setData({
      ...data,
      [event.target.name]:event.target.value
    })
  }


  useEffect(() => {
    const getData = async () => {
       const res = await axios.get(`/api/report/${id}`);
       const data = await res.data.getOne;
      setData({
        url: data?.url || "",
        label: data?.label || "",
        category: data?.category || "",
      });
     }
    getData();
  }, [isOpen])

  const handleUpdate = async (e:FormEvent<HTMLFormElement>)  => {
    e.preventDefault()
    const {url, label, category} = data
     try {
       const response = await axios.put(`/api/report/${id}`, {
         url,
         label,
         category,
       });
       if ((response.status = 201)) {
         onClose();
         toast.success("report updated");
       }
     } catch (error: any) {
       toast.error(error.response.data.error);
     }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleUpdate}>
        <div className="space-y-12 overflow-y-auto">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Update report
            </h2>
            <div className="mt-10 flex flex-col gap-y-8">
              <input
                type="text"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                onChange={handleChange}
                value={data.label}
                placeholder="label"
                name="label"
              />
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <input
                type="url"
                className="pl-4 py-5 bg-[#F3F3F3] rounded-md mt-2"
                placeholder="Enter Tableau url"
                onChange={handleChange}
                value={data.url}
                name="url"
              />
            </div>
            <div className="flex flex-col mt-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Categories</span>
                </label>
                <select
                  name="category"
                  value={data.category}
                  className="select select-bordered"
                  onChange={handleChange}
                >
                  <option disabled value="Categories">
                    Categories
                  </option>
                  {categories &&
                    categories.map((category: any) => (
                      <option value={category.name} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
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
            className="bg-blue-400 hover:bg-blue-200 flex justify-center rounded-md px-3 py-2 text-sm"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Update;
