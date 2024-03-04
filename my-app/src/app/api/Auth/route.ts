{
  /*
   * author: sultan ahmed sanjar
   * date : 01-03-2024
   * description : this file will take form data and validate it if it's valid data then it will call the  mongo data base and save the user . or if the user is already register then it will give set cookies and let the user create update and delete todos
   */
}

// to catch any error easily we are setting some unique code for every error signature

// 000 == invalid password signature
// 111 == invalid email signature
// 333 == invalid name signature

// dependencies
// external imports
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { NextApiResponse } from "next";

//internal imports
import { ConnectDb } from "@/Database/ConnectDb";
import user from "@/Models/UserSchema";

configDotenv();

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  try {
    //connecting to database
    await ConnectDb();

    // destructuring data from request body
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    // validate user information
    const NameRegex = /^[A-Za-z.]+(?:[ '.-][A-Za-z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PasswordRegex =
      /^(?=.*[!@#$%^&*()_+}{|":?><,./;'[\]\\=-])((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))(?=.{8,32}$)/;

    if (!NameRegex.test(name) || name.length < 3) {
      return new Response(JSON.stringify({ Error: `333` }), {
        status: 400,
      });
    }
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ Error: `111` }), { status: 400 });
    }

    if (!PasswordRegex.test(password)) {
      return new Response(JSON.stringify({ Error: `000` }), { status: 400 });
    }

    // hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // check if user already exists
    let User = await user.findOne({ email: email });

    if (User) {
      return new Response(JSON.stringify({ message: "user ache vai" }), {
        status: 200,
      });
    } else {
      const newUser = new user({
        username: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      const SecretKey = process.env.SECRET_KEY;
      if (!SecretKey) {
        return new Response(
          JSON.stringify({ message: ` Failed to reach secret key` }),
          { status: 500 }
        );
      }
      const tokenUser = {
        email: newUser.email,
        id: newUser._id.toString(),
        username: newUser.username,
      };
      const token = jwt.sign(tokenUser, SecretKey);

      const response = new NextResponse(JSON.stringify({ id: tokenUser.id }), {
        status: 200,
      });

      response.cookies.set("token", token);

      return response;
    }
  } catch (e: any) {
    return new Response(JSON.stringify(e.message), {
      status: 500,
    });
  }
};
