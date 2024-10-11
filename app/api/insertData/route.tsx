import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { storyID, storySubject, ageGroup, storyType, output, userEmail, userName } = await req.json();
    const result = await db.insert(StoryData).values({
      storyID, 
      storySubject,
      ageGroup,
      storyType,
      output: JSON.parse(output),
      userEmail,
      userName,
    }).returning({ storyID: StoryData.storyID });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error inserting story data:', error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}
