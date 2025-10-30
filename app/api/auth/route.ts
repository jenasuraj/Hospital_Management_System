import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Manual JWT cookie
    const token = req.cookies.get("token")?.value;
    const gtoken = req.cookies?.get("next-auth.session-token")?.value;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.json({
        success: true,
        source: "manual",
        data: decoded,
      },{status:200});
    }
    
    if(gtoken){
      return NextResponse.json(
      { success: true,source:'google',message: "Google auth login successfull"},
      { status: 200 }
    );
    }
    
    // 3️⃣ No session at all
    return NextResponse.json(
      { success: false, message: "No valid session" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
