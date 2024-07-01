import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { CompletedProject, OngoingProject } from '../../../../models/projectSchema.js';
import UserProfile from '../../../../models/userProfileSchema.js';
import connectDB from "../../../dbConfig/db.js";

await connectDB();

export async function GET(req, res) {
    try {
        const session = await getServerSession({ req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const searchParams = new URLSearchParams(req.url.split('?')[1]);
        const userID = searchParams.get('userID'); 
        const status = searchParams.get('status'); 

        console.log("Fetching projects for userID:", userID, "with status:", status);

        let projectIDs = [];

        const currentUser = await UserProfile.findOne({ userID });

        if (!currentUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        let projectsData;

        if (status === '0') {
            projectIDs = currentUser.ongoingProjects;
            projectsData = await OngoingProject.find({ projectID: { $in: projectIDs } });
        } else {
            projectIDs = currentUser.completedProjects;
            projectsData = await CompletedProject.find({ projectID: { $in: projectIDs } });
        }
        
        return NextResponse.json({ success: true, projectsData }, { status: 200 });

    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
