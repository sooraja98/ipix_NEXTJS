import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function PUT(NextRequest) {
  try {
    const reqBody=await NextRequest.json()
    const  useremail  = reqBody.data.useremail
    // Find the user by email
    const user = await User.findOne({ email: useremail });

    if (!user) {
      return NextResponse.error("User not found");
    }

    // Toggle the role from true to false and false to true
    user.isAdmin = !user.isAdmin;
    // Save the updated user
    const updatedUser = await user.save();

    return NextResponse.json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error occurred while updating user role:", error);
    return NextResponse.error("An error occurred while updating the user role.");
  }
}
