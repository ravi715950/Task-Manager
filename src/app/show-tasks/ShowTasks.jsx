"use client";
import UserContext from "@/context/userContext";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);

const router = useRouter();

  async function loadTasks(userId) {
    try {
      const tasks = await getTasksOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context?.user?.user?._id);
    }
  }, [context.user]);
 
console.log(tasks)
  async function deleteTaskParent(tasksId) {
    try {
      const result = await deleteTask(tasksId);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id != tasksId);
      setTasks(newTasks);
      toast.success("Your task is deleted ");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task !!");
    }
  }

  return (
    <div className="mt-3 mx-auto" style={{maxWidth:'600px'}}>
      <div className="p-3">
        <h1 className="text-3xl mb-3 text-center">Your tasks ( {tasks.length} )</h1>
        <button
            onClick={()=>router.push('/add-task')}
            className="md:w-auto px-5 py-2 bg-green-600 rounded hover:bg-green-400 text-white"
          >
            Add Tasks 
          </button>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
