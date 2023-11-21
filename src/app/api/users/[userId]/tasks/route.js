import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


connectDb();

export const GET = async (request, { params }) => {
  const { userId } = params;

  try {
    const task = await Task.find({
      userId: userId,
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({
      message: "failed to find task",
      succuss: false,
    });
  }
};
