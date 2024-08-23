import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't Exists" },
        { status: 400 }
      );
    }
    console.log("User Exists");

    const isMatch = bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.TOCKEN_SECREAT, {
      expiresIn: "1d",
    });

    const Response = NextResponse.json(
      { message: "User Logged in Successfullly" },
      { success: true }
    );

    Response.cookies.set("token", token, {
      httpOnly: true,
    });
    return Response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
