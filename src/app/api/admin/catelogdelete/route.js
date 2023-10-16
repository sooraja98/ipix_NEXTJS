import { connect } from '@/dbconfig/dbConfig';
import Catelog from '@/models/catelog';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

export async function DELETE(NextRequest) {

  try {
    const reqBody=await NextRequest.json()
    console.log(reqBody.itemId)

    // Find and delete the user by email
    const deletCatelog = await Catelog.findOneAndDelete({ _id: reqBody.itemId });

    if (deletCatelog) {
      return NextResponse.json({ message: "User deleted successfully" });
    } else {
      return NextResponse.error("User not found or could not be deleted");
    }
  } catch (error) {
    console.error("Error occurred while deleting user:", error);
    return NextResponse.error("An error occurred while deleting the user.");
  }
}
