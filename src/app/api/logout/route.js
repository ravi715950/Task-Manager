import { NextResponse } from "next/server"


export const GET = async ()=>{

try {
    const response = NextResponse.json({
        message: "Logout Successful",
        success:true,
    })

    response.cookies.set("authToken", "", {
        httpOnly: true,
      });
 return response;
} catch (error) {
    
}

}