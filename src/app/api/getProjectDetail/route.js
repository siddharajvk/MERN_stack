import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from '../../../dbConfig/db.js';
import { CompletedProject, OngoingProject } from '../../../models/projectSchema.js';

await connectDB();

export async function GET(req, res) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const session = await getServerSession({ req });

            if (!session) {
                return resolve(NextResponse.error(new Error('Unauthorized')));
            }

            const searchParams = new URLSearchParams(req.url.split('?')[1]);
            const projectID = searchParams.get('projectID');
            const status = searchParams.get('status');

            let projectsData;

            console.log("Getting projects...");
            console.log(projectID);
            console.log(status);
            if (status == '0') {
                projectsData = await OngoingProject.findOne({ projectID });
            } else {
                projectsData = await CompletedProject.findOne({ projectID });
            }

            console.log("Sending data", projectsData);
            return resolve(NextResponse.json({ success: true, projectsData }, { status: 200 }));

        }, 10000);  // Execute immediately
    }).catch(err => {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    });
}
