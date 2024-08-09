import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/users";
import { connectDb } from "@/helper/db";

connectDb();

export async function GET(request) {
  try {
    // Extract the authToken from the cookies
    const cookies = request.headers.get('cookie');
    
    if (!cookies) {
      throw new Error('No cookies found');
    }
    
    // Extract the authToken specifically
    const authToken = cookies.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];

    if (!authToken) {
      throw new Error('Not authenticated');
    }

    // Verify the token
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    // Fetch the user from the database using the decoded token's _id
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error('User not found');
    }

    // Return the user data
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}
