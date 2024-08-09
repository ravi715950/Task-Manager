"use client";
import React, { useContext, useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { taost, toast } from "react-toastify";
import UserContext from "@/context/userContext";
import { useRouter } from "next/navigation";

const AddTask = () => {
  // console.log("this is add task component");

  const context = useContext(UserContext);
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: context.user?.user?._id,
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);
    // validate task data
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Your task is added !!", {
        position: "top-right",
      });
      router.push('/show-tasks')

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

  const clearForm =()=>{
    setTask({
      title: "",
      content: "",
      status: "none",
    });
  }

  return (
    <div className="justify-center mx-auto" style={{maxWidth:'600px'}}>
    <div className="p-5 shadow-sm">
      <div className="my-8 flex justify-center">
        <Image
          src={loginSvg}
          style={{
            width: "70%", // Adjust the width as needed
          }}
          alt="Login banner"
        />
      </div>
      <h1 className="text-3xl text-center">Add your task here</h1>
  
      <form action="#!" onSubmit={handleAddTask} className="mt-4">
        {/* task title */}
        <div className="mb-4">
          <label htmlFor="task_title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#04364A] focus:ring-gray-400-100 border border-[#04364A] text-white"
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
        {/* task content */}
        <div className="mb-4">
          <label htmlFor="task_content" className="block text-sm font-medium">
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
        <div className="mb-4">
          <label htmlFor="task_status" className="block text-sm font-medium">
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
        {/* button actions */}
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 rounded hover:bg-green-400 text-white"
          >
            Add Task
          </button>
          <button
            type="button"
            className="bg-red-600 px-5 py-2 rounded hover:bg-red-800 ms-3 text-white"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AddTask;
