import { User } from "@/models/users";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { userId } = params;

  try {
    const user = await User.findById({
      _id: userId,
    }).select("-password");

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "failed to get user",
    });
  }
};



export const PUT = async (request, { params }) => {
  const { userId } = params;
  const { name, password, about, profileURL } = await request.json();

  try {
    const user = await User.findById(userId);

    user.name = name;
    user.password = password;
    user.about = about;
    user.profileURL = profileURL;

    const updatedUser = await user.save();

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({
      message: "failed to update user",
      success: false,
    });
  }
};




export const DELETE = async (request, { params }) => {
  const { userId } = params;

  console.log(userId);

  try {
    await User.deleteOne({
      _id: userId,
    });

    return NextResponse.json({
      message: "user deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to delete",
      success: false,
    });
  }
};
