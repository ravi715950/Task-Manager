import { connectDb } from "@/helper/db";
import { Contact } from "@/models/contact";

import { NextResponse } from "next/server";

connectDb();

export const POST = async (request) => {
    const { name, email, message } = await request.json();
  
    const contact= new Contact({
      name,
      email,
      message,
    });
  
    try {
  
  await contact.save()
  
  return NextResponse.json({
      message:'Submit successfully',
      status:true
  })
  
    } catch (error) {
  
      return NextResponse.json({
          message:'failed to add Query',
          status:false
      })
    }
  };
  

  export const GET = async (request) => {
 
    let contacts = []
    try {
        contacts = await Contact.find() 
    } catch (error) {
        return NextResponse.json({
            message:'failed to get contact query',
            success:false           
        })
    }

    return NextResponse.json(contacts)

};


