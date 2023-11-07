import { connectDb } from "@/helper/db";
import { User } from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

connectDb();

export const GET = async (request) => {
  let users = [];

  try {
    users = await User.find().select("-password");
  } catch (error) {
    console.log(error)

    return NextResponse.json({
        message:'failed to get users',
        success:false
        
    })
    
}

return NextResponse.json(users);
};







export const POST = async (request) => {
  const { name, email, password, about } = await request.json();

  const user = new User({
    name,
    email,
    password,
    about,
  });

try {
  user.password = bcrypt.hashSync(user.password, 10)
    await user.save();

 const response = NextResponse.json(user, {
    status:201
 })

return response

} catch (error) {
    console.log(error)
    return NextResponse.json({
        message:'failed to create user'
    })
}

};
