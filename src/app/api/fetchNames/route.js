import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import connectDB from "../../../dbConfig/db.js";
import UserProfile from "../../../models/userProfileSchema.js";

await connectDB();

export async function POST(request) {
    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        console.log("Fetching Names");
        const { applicationIDs } = await request.json();

        if (!Array.isArray(applicationIDs)) {
            return NextResponse.error(new Error('Invalid application IDs format.'));
        }

        const userNames = await Promise.all(applicationIDs.map(async (applicationID) => {
            const userProfile = await UserProfile.findOne({ userID: applicationID });
            return userProfile ? userProfile.name : null;
        }));

        console.log("User Names:", userNames);

        return NextResponse.json({ userNames });
    } catch (error) {
        console.error('Error fetching user names:', error);
        return NextResponse.error(new Error('Failed to fetch user names.'));
    }
}
