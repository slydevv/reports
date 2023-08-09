"use client";

import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "../components/modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string
  api: string;
}


const ConfirmModal: React.FC<ConfirmModalProps> = ({api, isOpen, onClose, id }) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/${api}/${id}`);
      if ((response.status = 201)) {
        onClose();
        toast.success(`This ${api} has been deleted`);
        router.refresh();
      } 
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete {api}
          </Dialog.Title>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this {api}?
            </p>
            <p className="text-xs font-light text-red-600">
              This action cannot be undone!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-centr justify-end gap-x-6">
        <button
          className="bg-rose-600 hover:bg-rose-400 flex justify-center rounded-md px-3 py-2 text-sm text-white"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-400 flex justify-center rounded-md px-3 py-2 text-sm text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
