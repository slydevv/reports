import { FaEdit, FaTrash } from "react-icons/fa";


interface CategoryProp {
  category: any;
  clickEdit: () => void;
  clickDelete: () => void;

}

export default function Category({
  category,
  clickEdit,
  clickDelete,
  
  
}: CategoryProp) {
  return (
    <>
      <div
        key={category.id}
        className="flex flex-col my-4 px-5 shadow-lg border border-[#ececec] rounded-md h-160px] justify-between pb-5"
      >
        <div className="mt-8">
          <p className="text-4xl text-center font-bold">{category.name}</p>
        </div>

        <div className="my-10 flex justify-around ">
          <button onClick={clickEdit} className="hover:text-gray-700">
            <FaEdit />
          </button>
          <button onClick={clickDelete} className="hover:text-gray-700">
            <FaTrash />
          </button>
        </div>
      </div>

      
    </>
  );
}
