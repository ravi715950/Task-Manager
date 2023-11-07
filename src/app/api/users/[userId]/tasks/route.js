import { Task } from "@/models/task";
import { NextResponse } from "next/server";

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
