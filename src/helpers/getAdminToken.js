import {NextRequest,NextResponse} from 'next/server'
import jwt from 'jsonwebtoken'
//token decoiding for getting the userid to to get all the detials from the user
export const getDatafromToken=(NextRequest)=>{
    try {
        const token=NextRequest.cookies.get('admintoken')?.value|| ''
        const decodeToken=jwt.verify(token,process.env.TOKEN_SECERT)
        return decodeToken.id
    } catch (error) {
        console.log("error from the getdatafromtoken"+error)

    }   
}