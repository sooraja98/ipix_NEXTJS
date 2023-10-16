import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function GET(req) {
  try {
    // Fetch all user data
    const users = await User.find();

    // Return the user data as a JSON response
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error occurred while fetching user data:", error);
    // Return an error response
    return NextResponse.error("An error occurred while fetching user data.");
  }
}
