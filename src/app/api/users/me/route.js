import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { getDataFromtoken } from "@/utils/getDataFromtoken";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const userid = await getDataFromtoken(req);
    const user = await User.findOne({ _id: userid }).select("-password");

    if (!user) {
      return NextResponse.json({
        message: "user not found",
      });
    }

    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "user not found",
    });
  }
}
