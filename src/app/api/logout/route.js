import { NextResponse } from "next/server"


export const GET = async ()=>{

try {
    const response = NextResponse.json({
        message: "Logout Successful",
        success:true,
    })

    response.cookies.set("authToken", "", {
        httpOnly: true,
        path: "/",        
        maxAge: 0,         
      });
 return response;
} catch (error) {
    
}

}