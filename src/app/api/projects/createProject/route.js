import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { OngoingProject } from '../../../../models/projectSchema.js';
import connectDB from "../../../dbConfig/db.js";

await connectDB();

async function generateRandomID() {
    const timestamp = new Date().getTime().toString();
    const randomComponent = Math.floor(Math.random() * 90000) + 10000;
    const uniqueRandomNumber = parseInt(timestamp.slice(-5) + randomComponent.toString().slice(-2));
    return uniqueRandomNumber;
}

export { generateRandomID };

export async function POST(request, response) {
    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { projectName, description, category, projectDomain, requirements } = reqBody;
        const userID = session.user.id; // Assuming session.user.id contains the user ID

        // Check if the project name already exists for the given user ID
        const existingProject = await OngoingProject.findOne({ projectName, creatorID: userID });
        if (existingProject) {
            return NextResponse.json({ message: 'Project name already exists for this user' });
        }

        // Generate random ID
        const randomID = await generateRandomID();
        console.log(`Generated Random ID: ${randomID}`);
        const projectID = randomID;
        const completedStatus = 0;
        const teammates = null;
        const projectData = {
            projectID,
            projectName,
            description,
            category,
            projectDomain,
            requirements,
            completedStatus,
            teammates,
            creatorID: userID
        };

        // Insert project data into 'projects' collection
        await OngoingProject.create(projectData);

        return NextResponse.json({ message: 'Project created successfully' });
    } catch (error) {
        console.error('MongoDB Error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message });
    }
}
