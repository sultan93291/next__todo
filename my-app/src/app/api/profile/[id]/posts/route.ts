{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-2024
   * description : this file will recive a id and serach todos if any id match this . if match then it will give them that posts and also check which user belongs it also give some information about the user
   */
}

// dependencies
// external imports
import { NextRequest, NextResponse } from "next/server";
import { configDotenv } from "dotenv";

// internal imports
import { ConnectDb } from "@/Database/ConnectDb";
import user from "@/Models/UserSchema";
import todo from "@/Models/TodoSchema";

configDotenv();

export const GET = async (req: NextRequest, { params }: { params: any }) => {
  try {
    await ConnectDb();

    const Todo = await todo.find({ UserId: params.id });

    if (!Todo) {
      return new NextResponse(JSON.stringify({ Error: `not todo` }), {
        status: 400,
      });
    }

    const UserPosts = Todo.map(todo => ({
      Caption: todo.Caption,
      Todo: todo.Todo,
      _id: todo._id,
      UserId: todo.UserId,
      createdAt: new Date(todo.createdAt).toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
      }),
      updatedAt: new Date(todo.updatedAt).toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
      }),
    }));

    return new NextResponse(JSON.stringify(UserPosts), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
