{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-2024
   * description : this file wil take todo , todo caption and user id  check if the todo is already exist then it will give access to update existing todo . else it will give a error
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
    const { Todo, caption, id } = reqBody;

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

    // extraction cookies from token
    const cookie = req.cookies.get("token")?.value;
    let TokenId;

    if (cookie !== null && cookie !== undefined && cookie) {
      const decode = jwt.decode(cookie);
      TokenId = (decode as JwtPayload)?.id;
    }

    if (!TokenId || !cookie) {
      return new NextResponse(
        JSON.stringify({ Error: "unauthorized requeset" }),
        {
          status: 401,
        }
      );
    }
    const ExistingUser = await user.findById(TokenId);
    if (!ExistingUser) {
      return new NextResponse(JSON.stringify({ Error: `no user ` }), {
        status: 400,
      });
    }

    const existingTodo = await todo.findById(id);

    if (!existingTodo) {
      return new NextResponse(JSON.stringify({ Error: `invalid todo id ` }), {
        status: 500,
      });
    }

    existingTodo.Todo = Todo;
    existingTodo.Caption = caption;

    existingTodo.save();

    return new NextResponse(JSON.stringify({ message: existingTodo }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ Error: error }), { status: 500 });
  }
};
