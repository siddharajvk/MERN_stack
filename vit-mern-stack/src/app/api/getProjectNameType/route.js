import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from "../../../dbConfig/db.js";
import { OngoingProject } from "../../../models/projectSchema";

await connectDB();

export async function POST(request) {
    console.log("Getting name and type");

    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { projectIDs } = reqBody;
        console.log(projectIDs);

        // Find all projects with the given projectIDs
        const projects = await OngoingProject.find({ projectID: { $in: projectIDs } });

        const data = projects.map((project) => ({
            projectName: project.projectName,
            // categoryName: project.categoryName, // Uncomment if needed
        }));

        console.log("Fetched Projects:", data);

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
    }
}
