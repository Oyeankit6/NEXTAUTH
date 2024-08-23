import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/newmailer";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();

    const { username, email, password, role } = reqBody;
    console.log(role);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hasedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      role,
      password: hasedPassword,
    });

    const saveduser = await newUser.save();
    console.log(saveduser);

    /// send verification mail

    await sendEmail({ email, emailType: "Verify", userId: saveduser._id });

    return NextResponse.json({
      message: "User Created Successfully",
      data: saveduser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
