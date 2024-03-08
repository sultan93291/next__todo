{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-2024
   * description : this is the user schema model file . this file will create a schema. and all it will describe the schema format
   */
}

import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email  is already existed"],
    },
    username: {
      type: String,
      required: [true, " username is required"],
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const user = models.user || model("user", UserSchema);
export default user;
