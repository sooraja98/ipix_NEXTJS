import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function DELETE(NextRequest) {

  try {
    const reqBody=await NextRequest.json()
    const { useremail } = reqBody
    // Find and delete the user by email
    const deletedUser = await User.findOneAndDelete({ email: useremail });

    if (deletedUser) {
      return NextResponse.json({ message: "User deleted successfully" });
    } else {
      return NextResponse.error("User not found or could not be deleted");
    }
  } catch (error) {
    console.error("Error occurred while deleting user:", error);
    return NextResponse.error("An error occurred while deleting the user.");
  }
}
