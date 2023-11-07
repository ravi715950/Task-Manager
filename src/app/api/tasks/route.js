import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async (request) => {
 
    let tasks = []
    try {
     tasks = await Task.find() 
    } catch (error) {
        return NextResponse.json({
            message:'failed to get users',
            success:false           
        })
    }

    return NextResponse.json(tasks)

};





export const POST = async (request) => {
  const { title, content, userId } = await request.json();

  const task = new Task({
    title,
    content,
    userId,
  });

  try {

await task.save()

return NextResponse.json({
    message:'task created successfully',
    status:true
})

  } catch (error) {

    return NextResponse.json({
        message:'failed to add task',
        status:false
    })
  }
};
