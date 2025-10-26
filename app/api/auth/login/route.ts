import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';

interface bodyType{
    email: string,
    password:string
}

export async function POST(req:NextRequest) { 
    const body = await req.json();
    const formData:bodyType = body.formData
    const sql = neon(process.env.POSTGRES_URL!);
    const isUserExists = await sql`SELECT * FROM users WHERE email =${formData.email}`;
    console.log(isUserExists)
    if(isUserExists.length == 0){
        return NextResponse.json({success:true,message:"User is not registered"})
    }
    const isMatch = await bcrypt.compare(formData.password, isUserExists[0].password);
    if(!isMatch){
       return NextResponse.json({success:true,message:"Entered password is wrong"}) 
    }
    const token = jwt.sign(
         { id: isUserExists[0].id, email: isUserExists[0].email}, 
         process.env.JWT_SECRET!,           
         { expiresIn: "7d" }                 
    );
    const finalResponse = NextResponse.json({ success: true, message: "User registered successfully",data:isUserExists[0]});
    finalResponse.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return finalResponse;

}