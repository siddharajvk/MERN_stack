import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import connectDB from "../../../dbConfig/db.js";
import Application from "../../../models/applicationSchema.js"; // Import the Application model
import { OngoingProject } from '../../../models/projectSchema.js';

await connectDB(); // Connect to the database

export async function POST(request) {
    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { applyFor, coverLetter, projectId } = reqBody;

        // Fetch the project details to get creatorID
        const project = await OngoingProject.findOne({ projectID: projectId });
        if (!project) {
            return NextResponse.error(new Error('Project not found'));
        }

        const creatorID = project.creatorID;

        // Check if an application with the given role, project ID, and creator ID already exists
        const existingApplication = await Application.findOne({
            role: applyFor,
            projectID: projectId,
            creatorID: creatorID
        });

        if (existingApplication) {
            // If application already exists, return false
            console.log("Application already exists for this role and project");
            return NextResponse.json({ success: false, message: "Application already exists for this role and project" });
        }

        // Create a new application instance using the Application model
        const newApplication = new Application({
            projectID: projectId,
            applierID: session.user.id, // Assuming session.user.id contains the applier's ID
            creatorID: creatorID,
            role: applyFor,
            coverLetter: coverLetter,
        });

        const savedApplication = await newApplication.save();
        console.log("Application saved:", savedApplication);

        return NextResponse.json({
            success: true,
            message: "Application saved successfully",
            isSaved: true // Indicate that the application is saved
        });
    } catch (error) {
        console.error('Error saving application:', error);
        return NextResponse.error(new Error('Internal Server Error')); // Return error response
    }
}
