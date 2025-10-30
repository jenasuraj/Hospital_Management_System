import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';

interface formDataType {
name: string,
password: string,
email:string,
provider:string
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const sql = neon(process.env.POSTGRES_URL!);
    if(body.formData){
    if(!body.formData?.email || !body.formData?.password || !body.formData?.name) return NextResponse.json({message:"Some of the fields are empty",success:false},{status:400})   
    try {
    const formData:formDataType = {
        name:body?.formData?.name,
        email:body?.formData?.email,
        password:body?.formData?.password,
        provider:'local'
        }

    const isUserExists = await sql`SELECT * FROM users WHERE email =${formData.email}`;
    if(isUserExists.length >0){
      return NextResponse.json({message:"User already exists, Try login",success:false},{status:409})
    }
    const hashedPassword = await bcrypt.hash(formData.password, 10); 
    const response = await sql`
      INSERT INTO users (name, email, password,provider)
      VALUES (${formData.name}, ${formData.email}, ${hashedPassword},${formData.provider})
      RETURNING *;`;
    return NextResponse.json({ success: true, message: "User registered successfully",data:response[0]},{status:201});
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error while registering" }, { status: 502 });
  }
  }
  
  else if(body.sessionData && body.provider){
    const isUserExists = await sql`SELECT * FROM users WHERE email =${body.sessionData.email}`
    if(isUserExists.length == 0){
    const response = await sql`
      INSERT INTO users (name, email,provider,google_id)
      VALUES (${body.sessionData.name}, ${body.sessionData.email}, ${body.provider},${body.sessionData.id})
      RETURNING *;`;  
     return NextResponse.json({ success: true, message: "User registered successfully",data:response[0]},{status:200});
    }
    else if(isUserExists.length>0 && isUserExists[0].provider == 'local'){
      return NextResponse.json({ success: true, message: "Use mannual email password to login"},{status:200});
    }
    else if(isUserExists.length>0 && isUserExists[0].provider == 'google'){
      return NextResponse.json({ success: true, message: "User login successful",data:isUserExists[0]},{status:200});
    }
  }
}