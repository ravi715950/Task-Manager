"use client";
import React, { useContext, useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from "react-toastify";
import UserContext from "@/context/userContext";

const AddTask = () => {
  // console.log("this is add task component");

  const context = useContext(UserContext);
  console.log(context.user._id)

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: context.user._id,
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);
    // validate task data
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Your task is added !!", {
        position: "top-center",
      });

      setTask({
        title: "",
        content: "",
        status: "none",
      });
    } catch (error) {
      console.log(error);
      toast.error("Task not added !!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-12  justify-center">
      <div className="col-span-4 col-start-5 p-5  shadow-sm">
        <div className="my-8 flex justify-center">
          <Image
            src={loginSvg}
            style={{
              width: "50%",
            }}
            alt="Login banner"
          />
        </div>
        <h1 className="text-3xl text-center">Add your task here </h1>

        <form action="#!" onSubmit={handleAddTask}>
          {/* task title  */}
          <div className="mt-4">
            <label
              htmlFor="task_title"
              className="block text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A]"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          {/* task CONENT  */}
          <div className="mt-4">
            <label
              htmlFor="task_content"
              className="block text-sm font-medium mb-2"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A] text-white"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>

          {/* task status */}
          <div className="mt-4">
            <label
              htmlFor="task_status"
              className="block text-sm font-medium mb-2"
            >
              Status
            </label>
            <select
              id="task_status"
              className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A] text-white"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              <option value="none" disabled>
                ---Select Status---
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* button  actions */}
          <div className="mt-5 flex justify-center">
            <button   className="px-5 py-2 bg-green-600  rounded hover:bg-green-400 text-white">
              Add Task{" "}
            </button>
            <button className="bg-red-600 px-5 py-2 rounded hover:bg-red-800 ms-3 text-white">
              Clear
            </button>
          </div>

          {/* {JSON.stringify(task)} */}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
