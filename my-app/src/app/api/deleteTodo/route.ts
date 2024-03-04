{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-2024
   * description : this file will recive the unique id of todo and check if the id exists then it will delete it
   */
}

// to catch any error easily we are setting some unique code for every error signature

// 000 == invalid password
// 111 == invalid email
// 222 == inavalid credentials

// dependencies
// external imports
import { NextRequest, NextResponse } from "next/server";
import { configDotenv } from "dotenv";
import { NextApiResponse } from "next";

//internal imports
import { ConnectDb } from "@/Database/ConnectDb";
import todo from "@/Models/TodoSchema";

configDotenv();

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    await ConnectDb();

    const { deleteTodoId } = await req.json();

    const ExistedTodo = await todo.findById(deleteTodoId);

    if (!ExistedTodo) {
      return new NextResponse(
        JSON.stringify({ error: "Could not find any todo " }),
        {
          status: 400,
        }
      );
    }

    const deletedTodo = await todo.deleteOne({_id:deleteTodoId})

    if (deletedTodo) {
        return new NextResponse(JSON.stringify({ success: `successfully deleted  todo ${deleteTodoId} ` }), {
          status: 200,
        });
      
    } else {
      return new NextResponse(
        JSON.stringify({
          error: `can't delete todo ${deleteTodoId} `,
        }),
        {
          status: 400,
        }
      );
    }

  
  } catch (error:any) {
    return new NextResponse(
      JSON.stringify({
        error: `Internal server error:${error.message} `,
      }),
      {
        status: 500,
      }
    );
  }
};
