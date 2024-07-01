import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import connectDB from "../../../dbConfig/db.js";
import UserProfile from "../../../models/userProfileSchema.js";

connectDB();

export async function POST(request) {
    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { userID } = reqBody;

        const user = await UserProfile.findOne({ userID });

        if (!user) {
            return NextResponse.error(new Error('User profile not found'));
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch user profile' }, { status: 500 });
    }
}
