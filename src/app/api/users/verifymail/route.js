import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();
export async function POST(req, res) {
  try {
    let reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);
    const currentDate = Date.now();
    let user = await User.findOne({
      verifyToken: token,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    if (user) {
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;

      await user.save();
    } else {
      throw new Error("User not found");
    }

    return NextResponse.json(
      { message: "User Verified Successfully!", success: true },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
