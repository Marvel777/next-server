// import { NextApiResponse } from "next";
import { Types } from "mongoose";
import connect from "../../../../lib/db";
import User from "../../../../lib/modals/user";


export const GET = async () => {
    try {
        await connect()
        const users = await User.find()
        return new Response(JSON.stringify(users), { status: 200 })
    }
    catch (err: unknown) {
        return new Response("Database Error" + (err as Error).message, { status: 500 })
    }
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        await connect()
        const newUser = new User({
            email: body.email,
            username: body.username,
            password: body.password
        });
        await newUser.save();
        return new Response(JSON.stringify({ message: "User is created", user: newUser }), { status: 201 })

    } catch (err: unknown) {
        return new Response("Database Error" + (err as Error).message, { status: 500 })
    }
}

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { userId, newUsername } = body;
        if (!userId || !newUsername) {
            return new Response(JSON.stringify({ message: "ID or New Username not found" }),
                { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new Response(JSON.stringify({ message: "Valid userID" }),
                { status: 400 }
            );
        }

        await connect();

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username: newUsername },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        return new Response(JSON.stringify({
            message: "User updated successfully",
            user: updatedUser
        }),
            { status: 200 }
        );

    } catch (err) {
        throw new Error((err as Error).message)
    }

}


export const DELETE = async (req: Request) => {

    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new Response(
                JSON.stringify({ message: 'User not found' }),
                { status: 400 });
        }
        if (!Types.ObjectId.isValid(userId)) {
            return Response.json({ message: "Invalid userID format" }, { status: 400 });
        }

        await connect()

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return Response.json({ message: 'User not found' }, { status: 400 });
        }

        return Response.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });

    } catch (err) {

        throw new Error((err as Error).message);

    }


}