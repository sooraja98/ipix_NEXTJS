import { connect } from '@/dbconfig/dbConfig' //db connect
import { getDatafromToken } from '@/helpers/getDataFromToken' //which give the user id from the token 
import User from '@/models/user' //user model
import {NextRequest,NextResponse} from 'next/server' 
getDatafromToken
connect()//db connect

//getting user data 
export async function GET(NextRequest){
    try {
        const userid=getDatafromToken(NextRequest)
        const user=await User.findOne({_id:userid}).select("-password") //not selecting the password
        if(!user){
            return NextResponse.json({message:"no user your try to hacking"})
        }
        else{
            return NextResponse.json({message:"success",data:user})
        }
        
    } catch (error) {
        console.log("error from the getuser data route"+object)
    }
}