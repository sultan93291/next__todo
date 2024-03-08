{
  /*
   * author: sultan ahmed sanjar
   * date : 03-03-204
   * description : this is the user schema model file . this file will create a schema. and all it will describe the schema format
   */
}

import  { Schema, model, models } from "mongoose";

const todoSchema = new Schema(
  {
    Caption: {
      type: String,
      required: true,
    },
    Todo: {
      type: String,
      required: true,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const todo = models.todo || model("todo", todoSchema);
export default todo;
