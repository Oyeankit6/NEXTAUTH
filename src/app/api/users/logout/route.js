import { connect } from "@/dbconfig/dbconfig";

import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const Response = NextResponse.json(
      { message: "Logout Successfully", success: true },
      { status: 500 }
    );

    Response.cookies.set("token", "", {
      httpOnly: true,
      expiresIn: new Date(),
    });

    return Response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
