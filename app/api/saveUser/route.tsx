import { db } from "@/config/db";
import { User } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userEmail, userName, credit } = await req.json();
    const result = await db.insert(User).values({
      credit,
      userEmail,
      userName,
    }).returning({ userEmail: User.userEmail, userName: User.userName, credit: User.credit});

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error inserting story data:', error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}
