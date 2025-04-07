import { Types } from "mongoose";
import connect from "../../../../../../lib/db";



export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId || !Types.ObjectId.isValid(userId)) {

            return new Response(JSON.stringify({ message: 'Invalid userID' }), { status: 400 });
        }
        await connect()

    } catch (err) {
        throw new Error((err as Error).message);
    }
}
