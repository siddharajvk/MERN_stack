import { connectDB } from "../../../dbConfig/db.js";
import UserProfile from "../../../models/userProfileSchema.js";
import { NextResponse } from "next/server";
await connectDB();

export async function POST(request){
    console.log("Route hit abrakadabar ");
    try{
        const { data,flag,userID}=await request.json();
        console.log(userID);
        console.log("data",data);
        let update;
        if(flag ===0){ //Update links
            update=await UserProfile.updateOne(
                {userID:userID},
                {$set:{links:data}}
            );
        }else{  //Update skills
            update=await UserProfile.updateOne(
                {userID:userID},
                {$set:{skills:data}}
            );
        }

        console.log("Updated successfully",update);
        return NextResponse.json({success:true,message:"UPdated successfule"});
    }catch(err){
        return NextResponse.json({success:false,message:"Update unsuccessful"});
    }
}