import { Task } from "@/models/task";
import { NextResponse } from "next/server";


export const GET = async (request, {params})=>{

    const {taskId} = params;

    try {
    const task = await Task.findById(taskId)

    return NextResponse.json(task)

    } catch (error) {
        return NextResponse.json({
            message:'failed to find task',
            succuss:false,

        })
    }

}



export const PUT = async (request, {params})=>{
    const {taskId} = params;
   
    const {title, content, status, userId} = await request.json();

    try {
       const task = await Task.findById(taskId)
       task.title=title;
       task.content=content;
       task.status=status;
       task.userId=userId;

       const updatedTask = await task.save();

       return NextResponse.json(updatedTask)


    } catch (error) {
        return NextResponse.json({
            message:'failed to update task'
        })
    }
    

}




export const DELETE = async (request, {params})=>{

const {taskId} = params;

try {
    await Task.deleteOne({
        _id:taskId
    })

return NextResponse.json({
    message:'task deleted successfully'
})


} catch (error) {
    return NextResponse.json({
        message:'failed to delete task'
    })
}

}
