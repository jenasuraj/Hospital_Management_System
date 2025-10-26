import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';

interface formDataType {
name: string,
password: string,
email:string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData:formDataType = body.formData
    const sql = neon(process.env.POSTGRES_URL!);
    const isUserExists = await sql`SELECT * FROM users WHERE email =${formData.email}`;
    if(isUserExists.length != 0){
      return NextResponse.json({message:"User already exists"},{status:200})
    }
    const hashedPassword = await bcrypt.hash(formData.password, 10); 
    const response = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${formData.name}, ${formData.email}, ${hashedPassword})
      RETURNING *;`;
    return NextResponse.json({ success: true, message: "User registered successfully",data:response[0]});
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}