import { FaEdit, FaTrash } from "react-icons/fa";

interface ReportProp {
  report: any;
  clickEdit: () => void;
  clickDelete: () => void;
}

export default function Report({ report, clickEdit, clickDelete }: ReportProp) {
  return (
    <>
      <div
        key={report.id}
        className="my-2  text-center px-10 text-black shadow-lg border border-[#ececec] rounded-lg  justify-between pb-5"
      >
        <div className="mt-4">
          <div className="">
            <p className="text-xl text-gray-800 font-bold">{report.label}</p>
            <p className="truncate underline underline-offset-2 ">
              {report.url}
            </p>
            <div className=" py-1 text-slate-600">
              <small>{report.categoryId}</small>
            </div>
          </div>
          <div className=" "></div>
          <div className="my-2 flex justify-end">
            <button onClick={clickEdit} className="hover:text-gray-700 px-3">
              <FaEdit />
            </button>
            <button onClick={clickDelete} className="hover:text-gray-700 px-3">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
