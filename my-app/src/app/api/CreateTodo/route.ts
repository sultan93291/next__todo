{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-2024
   * description : this file wil take todo todo caption and user id  then check if todo & caption is not empty then it will populate the user id then it then it will save the user todo then it will redirect to profile page
   */
}

// to catch any error easily we are setting some unique code for every error signature

// 444 == todo error
// 555 == caption error

// dependencies

// external imports

import { configDotenv } from "dotenv";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

// internal imports

import { ConnectDb } from "@/Database/ConnectDb";
import todo from "@/Models/TodoSchema";
import user from "@/Models/UserSchema";

// configuration of dotenv
configDotenv();

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await ConnectDb();

    const reqBody = await req.json();
    const { Todo, caption } = reqBody;

    // extraction cookies from token
    const cookie = req.cookies.get("token")?.value;
    console.log(cookie);

    let TokenId;

    if (cookie !== null && cookie !== undefined && cookie) {
      const decode = jwt.decode(cookie);
      TokenId = (decode as JwtPayload)?.id;
    }

    const todoPattern = /^[a-zA-Z0-9\s#.,'!?-]{5,}$/;
    const todoCaptionPattern = /^[a-zA-Z0-9\s#.,'!?-]{5,32}$/;

    if (!todoPattern.test(Todo)) {
      return new NextResponse(JSON.stringify({ Error: `444` }), {
        status: 400,
      });
    }

    if (!todoCaptionPattern.test(caption)) {
      return new NextResponse(JSON.stringify({ Error: `555` }), {
        status: 400,
      });
    }

    const ExistingUser = await user.findById(TokenId);

    if (!ExistingUser) {
      return new NextResponse(JSON.stringify({ Error: `no user ` }), {
        status: 400,
      });
    }

    const newTodo = new todo({
      Caption: caption,
      Todo: Todo,
      UserId: ExistingUser._id,
    });

    await newTodo.save();

    return new NextResponse(JSON.stringify({ message: newTodo }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ Error: error.message }), {
      status: 500,
    });
  }
};
