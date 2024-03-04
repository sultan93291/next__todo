{
  /*
   * author: sultan ahmed sanjar
   * date : 18-07-2023
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
  },
  {
    timestamps: true,
  }
);

const user = models.user || model("user", UserSchema);
export default user;
