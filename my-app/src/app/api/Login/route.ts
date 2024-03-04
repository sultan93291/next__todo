{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-2024
   * description : this file will take form data and check if the data is valid then it will check the email is it registered . if it is then it will match the password . if the password is not okay then it will give error  else it will set the cookies and redirect to the profile page
   */
}

// to catch any error easily we are setting some unique code for every error signature

// 000 == invalid password
// 111 == invalid email 
// 222 == inavalid credentials

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
    const { email, password } = reqBody;

    // validate user information
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PasswordRegex =
      /^(?=.*[!@#$%^&*()_+}{|":?><,./;'[\]\\=-])((?=.*\d)(?=.*[a-z])(?=.*[A-Z]))(?=.{8,32}$)/;

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ Error: `111` }),
        { status: 400 }
      );
    }

    if (!PasswordRegex.test(password)) {
      return new Response(
        JSON.stringify({ Error: `000` }),
        { status: 400 }
      );
    }

    // check if user already exists
    let User = await user.findOne({ email: email });

    if (User) {
      const validPassword = await bcrypt.compare(password, User.password);

      if (!validPassword) {
        return new NextResponse(
          JSON.stringify({ Error: `222` }),
          { status: 400 }
        );
      }

      const tokenUser = {
        email: User.email,
        id: User._id.toString(),
        username: User.username,
      };

      const SecretKey = process.env.SECRET_KEY;
      if (!SecretKey) {
        return new Response(
          JSON.stringify({ message: ` Failed to reach secret key` }),
          { status: 500 }
        );
      }

      const token = jwt.sign(tokenUser, SecretKey);

      const response = new NextResponse(JSON.stringify({ id: tokenUser.id }), {
        status: 200,
      });

      response.cookies.set("token", token);

      return response;
    } else {
      return new Response(JSON.stringify({Error:`222`}), {
        status: 500,
      });
    }
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
    });
  }
};
