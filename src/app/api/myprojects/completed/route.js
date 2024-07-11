import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db.js';
import { CompletedProject, OngoingProject } from '../../../../models/projectSchema.js';
import UserProfile from '../../../../models/userProfileSchema.js';

export async function GET(req) {
    try {
        await connectDB();  // Ensure the database connection is established

        const session = await getServerSession({ req });

        if (!session) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const searchParams = new URL(req.url).searchParams;
        const userID = searchParams.get('userID'); 
        const status = searchParams.get('status'); 

        console.log("Fetching projects for userID:", userID, "with status:", status);

        const currentUser = await UserProfile.findOne({ userID });

        if (!currentUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        let projectsData;

        if (status === '0') {
            const projectIDs = currentUser.ongoingProjects;
            projectsData = await OngoingProject.find({ projectID: { $in: projectIDs } });
        } else {
            const projectIDs = currentUser.completedProjects;
            projectsData = await CompletedProject.find({ projectID: { $in: projectIDs } });
        }

        return NextResponse.json({ success: true, projectsData }, { status: 200 });

    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
