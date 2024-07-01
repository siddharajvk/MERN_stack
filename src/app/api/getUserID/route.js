import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db';
import User from "../../../models/userSchema.js";

connectDB();

export async function POST(request) {
    try {
        const session = await getServerSession({ req: request.req });

        if (!session) {
            return NextResponse.error(new Error('Unauthorized'));
        }

        const reqBody = await request.json();
        const { userName } = reqBody;

        const user = await User.findOne({ username: userName });

        if (!user) {
            return NextResponse.error(new Error('User not found'));
        }

        const userID = user._id;
        console.log(userID);

        return NextResponse.json({ success: true, userID }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
    }
}
