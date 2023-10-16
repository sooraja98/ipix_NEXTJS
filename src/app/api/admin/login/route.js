// Import required modules and dependencies
import { connect } from '@/dbconfig/dbConfig'; // Import your database connection setup
import User from '@/models/user'; // Import the User model
import bcryptjs from 'bcryptjs'; // Import bcrypt for password validation
import { NextRequest, NextResponse } from 'next/server'; // Import Next.js request and response objects
import jwt from 'jsonwebtoken'; // Import JWT for token generation

// Connect to the database
connect();

// Define the POST request handler for this route
export async function POST(NextRequest) {
    try {
        // Parse the JSON request body to get user email and password
        const reqBody = await NextRequest.json();
        const { email, password } = reqBody;    
   

        // Find a user with the given email in the database
        var user = await User.findOne({ email:email });
        console.log(user.isAdmin)
        // If the user does not exist, return an appropriate response
        console.log(user)
        if (!user) {
            return NextResponse.json({ message: "User not found" });
        } else {
            // Compare the provided password with the hashed password in the database
            const validatePassword = await bcryptjs.compare(password, user.password);
            // If the password is incorrect, return an appropriate response
            if (!validatePassword) {
                return NextResponse.json({ message: "Incorrect password" });
            } else {
                if (user.isAdmin) {
                    const tokenData = {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    };
                   
                    // Create a token using the provided secret key and set its expiration

                    const token = jwt.sign(tokenData,process.env.TOKEN_SECERT, {
                        expiresIn: "1d",
                    });
                    // Create a response with a success message and set the token as a cookie
                    const response = NextResponse.json({
                        message: "Login successful",
                        success: true,
                    });
                    response.cookies.set("admintoken", token, { httpOnly: true });

                    // Return the response with the token set as a cookie
                    return response;
                } else {
                    return NextResponse.json({ message: "You are not an admin" });
                }
            }
        }
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);

        // Return an error response to indicate that an error occurred
        return NextResponse.json({ message: "An error occurred" });
    }
}
