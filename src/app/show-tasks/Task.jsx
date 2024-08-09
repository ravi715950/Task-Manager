import UserContext from "@/context/userContext";
import React, { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
const Task = ({ task, deleteTaskParent }) => {
  const { user } = useContext(UserContext);

  function deleteTask(taskId) {
    // ....
    deleteTaskParent(taskId);
  }

  return (
    <div
    className={`shadow-lg mt-2 rounded-md ${
      task.status === "completed" ? "bg-green-600" : "bg-[#176B87]"
    }`}
  >
    <div className="p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between text-white">
        <h1 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-0">
          {task.title}
        </h1>
        <span
          onClick={() => {
            deleteTask(task._id);
          }}
          className="shadow-lg hover:bg-gray-800 bg-gray-900 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer "
        >
          <RxCross1 />
        </span>
      </div>
      <p className="font-normal text-white">{task.content}</p>
      <div className="flex flex-col sm:flex-row justify-between mt-3">
        <p className="text-left text-white mb-2 sm:mb-0">
          Status: <span className="font-bold">{task.status}</span>
        </p>
      
      </div>
    </div>
  </div>
  
  );
};

export default Task;
