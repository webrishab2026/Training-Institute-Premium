import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

// GET: Fetch all courses
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'ACTIVE';
    
    const courses = await executeSnowflakeQuery(
      `SELECT * FROM SOURCE.PUBLIC.COURSES 
       WHERE STATUS = ? 
       ORDER BY START_DATE ASC`,
      [status]
    );
    
    return NextResponse.json({ 
      success: true, 
      count: courses.length,
      courses 
    });
    
  } catch (error: any) {
    console.error('Courses API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create new course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await executeSnowflakeQuery(
      `INSERT INTO SOURCE.PUBLIC.COURSES 
       (COURSE_ID, COURSE_NAME, DESCRIPTION, DURATION_HOURS, FEE, 
        INSTRUCTOR, START_DATE, END_DATE, MAX_STUDENTS) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.course_id,
        body.course_name,
        body.description,
        body.duration_hours,
        body.fee,
        body.instructor,
        body.start_date,
        body.end_date,
        body.max_students
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Course created successfully',
      data: result 
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}