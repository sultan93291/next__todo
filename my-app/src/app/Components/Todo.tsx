"use client";

import { useState, useEffect } from "react";
import Input from "../Tags/Input";
import axios from "axios";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { config } from "dotenv";

config();

const TodoComponent = () => {
  const [Update, setUpdate] = useState("");
  const [PathName, setPathName] = useState("");
  const [Todo, SetTodo] = useState({
    Todo: "",
    Caption: "",
  });

  const [Error, SetError] = useState({
    Todo: "",
    Caption: "",
  });

  const [Edit, setEdit] = useState({
    todo: "",
    caption:""
  })

  // mounting the router
  const router = useRouter();

  // if pathname equalt to edit route then extract todo id todo tod caption
  const { id } = useParams();
  const Id = id.toString()

  useEffect(() => {
    const queryParams = window.location.search;
    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      const todo = params.get("todo") as string
      const caption = params.get("caption") as string
      setEdit({
        todo: todo,
        caption:caption
      })

    }
  }, []);


  // extracting current path from window location
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  // checking pathname for making conditinal button disable
  useEffect(() => {
    if (PathName.startsWith("/updatetodo/")) {
      setUpdate("!empty");
    } else {
      setUpdate("");
    }
  }, [PathName]);

  const HandleTodo = (e: any) => {
    e.preventDefault();
    const res = axios({
      method: "post",
      url: Update ? "/api/UpdateTodo" : "/api/CreateTodo",
      data: {
        Todo: Todo.Todo,
        caption: Todo.Caption,
        ...(Update ? { id: Id } :{} ),
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        const UserId = res.data.message.UserId;
        if (res.status === 200) {
          router.push(`/profile/${UserId}`);
        }
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.Error === "444"
          // error 444  means inavlid todo signature
        ) {
          SetError({
            Todo: "inavlid todo signature",
            Caption: "",
          });
        }
        if (
          err.response &&
          err.response.data &&
          err.response.data.Error === "555"
          // error 555  means inavlid caption signature
        ) {
          SetError({
            Todo: "",
            Caption: "inavlid caption signature",
          });
        }
      });
  };

  const HandleTodoForm = (e: any) => {
    const { name, value } = e.target;
    SetTodo(prevData => ({ ...prevData, [name]: value }));
    setEdit({
      todo: "",
      caption:""
    })
  };
  return (
    <>
      <div className=" relative h-[100vh] w-[100vw]  flex items-center justify-center ">
        <form
          onSubmit={HandleTodo}
          className=" flex flex-col items-center justify-center h-[500px] w-[300px] md:w-[450px] bg-rgba shadow-2xl absolute gap-5 rounded-[25px] font-nunito "
        >
          {Update ? (
            <LuListTodo className="h-[80px] w-[180px] text-black_rgba hover:text-[rgba(43,171,150,0.5)] transition delay-150 " />
          ) : (
            <MdOutlineTipsAndUpdates className="h-[80px] w-[180px] text-black_rgba hover:text-[rgba(43,171,150,0.5)] transition delay-150 " />
          )}

          <h5 className=" text-black text-[28px] capitalize opacity-[0.6]">
            {" "}
            {Update ? "update todo" : "create todo"}{" "}
          </h5>
          <Input
            Type="text"
            onChange={HandleTodoForm}
            name="Todo"
            Style="  pl-[30px] pr-[50px] border-none outline-none rounded-[15px] bg-rgba text-black placeholder:text-black h-[50px] w-[250px] md:w-[300px] pl-[30px] text-[18px] md:text-[20px] font-[500] opacity-[0.7] capitalize "
            Placeholder={Update ? "update todo" : "create todo"}
            value={Update && Todo.Todo == "" ? Edit.todo : Todo.Todo}
          />
          {Error.Todo && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.Todo}{" "}
            </p>
          )}
          <Input
            Type="text"
            onChange={HandleTodoForm}
            name="Caption"
            Style="  pl-[30px] pr-[50px] border-none outline-none rounded-[15px] bg-rgba text-black placeholder:text-black h-[50px] w-[250px] md:w-[300px] pl-[30px] text-[18px] md:text-[20px] font-[500] opacity-[0.7] capitalize "
            Placeholder={Update ? "update caption" : "create caption"}
            value={Update && Todo.Caption == "" ? Edit.caption : Todo.Caption}
          />
          {Error.Caption && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.Caption}{" "}
            </p>
          )}
          {Todo.Todo && Todo.Caption ? (
            <button
              className=" h-[50px] w-[150px] md:h-[60px] md:w-[180px] bg-black_rgba border-2 border-transparent text-black mt-[20px] hover:bg-transparent hover:border-black hover:border-2 rounded-[15px] opacity-[0.7] font-[400] capitalize text-[18px] "
              type="submit"
            >
              {" "}
              {Update ? "update todo" : "create todo"}{" "}
            </button>
          ) : (
            <button
              className=" h-[50px] w-[150px] md:h-[60px] md:w-[180px] bg-black_rgba border-2 border-transparent text-black mt-[20px] hover:bg-transparent hover:border-black hover:border-2 rounded-[15px] opacity-[0.7] font-[400] capitalize text-[18px] "
              disabled
            >
              disabled
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default TodoComponent;
