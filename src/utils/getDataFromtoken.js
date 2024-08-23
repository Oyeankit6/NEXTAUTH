import { NextRequest, NextResponse } from "next/server";

import { jwt } from "jsonwebtoken";

export const getDataFromtoken = (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedtoken = jwt.verify(token, process.env.TOCKEN_SECREAT);
    return decodedtoken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
