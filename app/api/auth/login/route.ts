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
    const sql = neon(process.env.POSTGRES_URL!);
    const body = await req.json();
    if(body?.formData?.hospital_id && body?.formData?.hospital_password){
    const adminData = await sql`SELECT * FROM admin`;
    if(!body?.formData?.hospital_id == adminData[0].hospital_id) return NextResponse.json({message:"Admin id is wrong !",success:false},{status:400})
    const isMatch = await bcrypt.compare(body?.formData?.hospital_password, adminData[0].hospital_password);    
    if(!isMatch){
        return NextResponse.json({message:"Admin password is wrong !",success:false},{status:400})
    }
    else{
        const token = jwt.sign(
        { id: adminData[0].id, hospital_id: adminData[0].hospital_id}, 
        process.env.JWT_SECRET!,           
        { expiresIn: "7d" }                 
       );
    const finalResponse = NextResponse.json({ success: true, message: "Admin login successful",data:adminData[0]},{status:200});
    finalResponse.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return finalResponse;
    }
    }
    else{
        if(!body.formData?.email || !body.formData?.password) return NextResponse.json({message:"Please provide email and password !",success:false},{status:400})
    const formData:bodyType = {
        email:body?.formData?.email,
        password:body?.formData?.password}

    const isUserExists = await sql`SELECT * FROM users WHERE email =${formData.email}`;
    if(isUserExists.length>0 && isUserExists[0].provider == 'google'){
     return NextResponse.json({success:false,message:"User exists, Use Google login"},{status:409})
    }
    if(isUserExists.length == 0){
        return NextResponse.json({success:false,message:"User is not registered"},{status:404})
    }
    const isMatch = await bcrypt.compare(formData.password, isUserExists[0].password);
    if(!isMatch){
       return NextResponse.json({success:false,message:"Entered password is wrong"},{status:400}) 
    }
    const token = jwt.sign(
         { id: isUserExists[0].id, email: isUserExists[0].email}, 
         process.env.JWT_SECRET!,           
         { expiresIn: "7d" }                 
    );
    const finalResponse = NextResponse.json({ success: true, message: "User login successful",data:isUserExists[0]},{status:200});
    finalResponse.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return finalResponse;
    }
}