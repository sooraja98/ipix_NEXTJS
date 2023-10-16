import { connect } from '@/dbconfig/dbConfig'
import Catelog from '@/models/catelog'
import {NextRequest,NextResponse} from 'next/server'
connect()

export async function GET(NextRequest){
try {
    const data=await Catelog.find()
    return NextResponse.json({message:"success",data})

} catch (error) {
    console.log("error from the cateloglist vieweing "+error)
}
}