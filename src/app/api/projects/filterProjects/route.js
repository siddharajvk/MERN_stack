import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db.js';
import { OngoingProject } from '../../../../models/projectSchema.js';

await connectDB(); // Connect to the database

export async function POST(request) {
    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { projectID, projectName, categoryName, domainName } = reqBody;

        // Construct the query based on incoming parameters
        const query = {};

        if (projectID) {
            query.projectID = projectID;
        } else if (projectName) {
            const regexPattern = new RegExp(`${projectName.split('').join('.*')}`, 'i');
            query.projectName = regexPattern;
        } else {
            if (categoryName.length > 0) query.categoryName = { $in: categoryName };
            if (domainName.length > 0) query.domainName = { $in: domainName };
        }

        console.log("Query:", query);

        // Execute the query to find matching projects
        let projects = [];
        if (Object.keys(query).length !== 0) {
            projects = await OngoingProject.find(query);
        } else {
            projects = await OngoingProject.find();
        }

        console.log("Projects found:", projects);

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
