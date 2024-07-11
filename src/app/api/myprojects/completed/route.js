import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db.js';
import { CompletedProject, OngoingProject } from '../../../../models/projectSchema.js';
import UserProfile from '../../../../models/userProfileSchema.js';

export async function GET(req) {
    await connectDB();  // Ensure the database connection is established

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const session = await getServerSession({ req });

            if (!session) {
                return resolve(NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 }));
            }

            const searchParams = new URL(req.url).searchParams;
            const userID = searchParams.get('userID'); 
            const status = searchParams.get('status'); 

            console.log("Fetching projects for userID:", userID, "with status:", status);

            let projectIDs = [];

            const currentUser = await UserProfile.findOne({ userID });

            if (!currentUser) {
                return resolve(NextResponse.json({ success: false, message: "User not found" }, { status: 404 }));
            }

            let projectsData;

            if (status === '0') {
                projectIDs = currentUser.ongoingProjects;
                projectsData = await OngoingProject.find({ projectID: { $in: projectIDs } });
            } else {
                projectIDs = currentUser.completedProjects;
                projectsData = await CompletedProject.find({ projectID: { $in: projectIDs } });
            }
            
            return resolve(NextResponse.json({ success: true, projectsData }, { status: 200 }));

        }, 60000000000000);  // Execute immediately
    }).catch(err => {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    });
}
