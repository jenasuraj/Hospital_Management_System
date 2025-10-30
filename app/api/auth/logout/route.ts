import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const token = req.cookies.get("token")?.value;
  if(token){
  try {
    const response = NextResponse.json({ message: "Logged out successfully",success:true },{status:200});
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Immediately expires cookie
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
  }
}


export async function GET(req:NextRequest) {
const token = req.cookies.get("token")?.value;
if(token){
  return NextResponse.json({ message: "mannual logout" }, { status: 200 });
}
else{
  return NextResponse.json({ message: "google logout..." }, { status: 500 });
} 
}

