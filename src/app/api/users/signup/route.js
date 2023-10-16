import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(NextRequest){
    try {
        const reqBody = await NextRequest.json()
        const {username, email, password} = reqBody
        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({message: "User already exists"})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
            //save it to the user database
        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})

    }
}