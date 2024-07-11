import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db.js';
import UserProfile from '../../../../models/userProfileSchema.js';

connectDB();

export async function POST(request) {
    console.log("API endpoint hit");

    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { userName, skills, school, department } = reqBody;
        console.log("Request Body:", reqBody);

        // Construct the query based on incoming parameters
        const query = {};

        // If userName is provided, perform a case-insensitive regex search on userName field
        if (userName) {
            const regexPattern = new RegExp(`${userName}`, 'i');
            query.userName = regexPattern;
        }

        // Add additional criteria based on other parameters
        if (school !== '') query.school = school;
        if (department !== '') query.department = department;
        if (skills.length > 1) query.skills = { $in: skills };

        console.log("Query:", query);

        // Execute the query to find matching users
        let users = await UserProfile.find(query);

        console.log("Found Users:", users);

        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.error(new Error('Failed to fetch users'));
    }
}
