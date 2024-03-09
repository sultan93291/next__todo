"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";
import Image from "next/image";

interface Post {
  Caption: string;
  Todo: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  username: string;
  image: string;
  ProfileCreatedAt: string;
  email: string;
  UserId: string;
}

const Page = () => {
  const { id } = useParams();
  const [Data, setData] = useState<Post[]>([]);
  const [User, setUser] = useState<User>();
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/createtodo/${id}`);
  };

  const handleEdit = (todoId: string, todo: string, caption: string) => {
    const encodedTodo = encodeURIComponent(todo);
    const encodedCaption = encodeURIComponent(caption);
    router.push(
      `/updatetodo/${todoId}?todo=${encodedTodo}&caption=${encodedCaption}`
    );
  };

  const handleDelete = useCallback((deleteTodoId: string) => {
    axios({
      method: "delete",
      url: "/api/deleteTodo",
      data: {
        deleteTodoId: deleteTodoId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (res.status === 200) {
          setData(prevData =>
            prevData.filter(post => post._id !== deleteTodoId)
          );
        }
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    const FetchPost = async () => {
      try {
        const response = await axios.get(`/api/profile/${id}/posts`);

        if (!User) {
          setUser(response.data.UserData);
        }
        setData(response.data.UserPost);
      } catch (e) {}
    };

    FetchPost();
  }, [id, handleDelete]);

  return (
    <div className="flex justify-center my-[50px] font-roboto ">
      <div className="  mx-[250px]    ">
        <div className="h-auto w-[1600px] bg-rgba rounded-md flex flex-col py-[30px]  ">
          <p className="text-[32px] mb-5 capitalize  text-black opacity-[0.6] pl-[60px] font-[700] ">
            {" "}
            your profile :{" "}
          </p>

          <div className="flex flex-col items-center   px-[120px] justify-between  ">
            {User?.image && (
              <Image
                src={User?.image}
                alt="none"
                height={250}
                width={250}
                className=" h-[300px] w-[300px] rounded-[50%] ring-[15px] ring-rgba  "
              />
            )}
            <div className="flex flex-col opacity-[0.6] gap-1 my-[25px] items-center ">
              <p className="text-[32px] my-[30px] font-[500] ">
                {" "}
                {User?.username}{" "}
              </p>
              <p className="text-[22px] "> Email : {User?.email} </p>
              <p className="text-[22px] ">User Id : {User?.UserId} </p>
              <p className="text-[22px] ">
                {" "}
                Profile Created At : {User?.ProfileCreatedAt}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[auto]   mt-[30px]  mx-auto items-center py-[15px] gap-6  rounded-md  ">
          <p className="text-[28px]  font-[400] opacity-[0.5] text-center mx-auto rounded-md capitalize">
            {" "}
            {`wanna manage your daily tasks ? `}{" "}
          </p>
          <button
            className="h-[60px] w-[160px] bg-green-600 text-white uppercase   opacity-[0.7] rounded-sm border-2 border-transparent hover:border-white hover:bg-transparent transition delay-150 "
            onClick={handleCreate}
          >
            create todo
          </button>
        </div>
        <div className="flex  gap-4 py-[50px] px-[60px]  justify-center  flex-wrap-reverse ">
          {Data.map((post, index) => (
            <div
              key={index}
              className="bg-rgba h-auto w-[480px]  flex flex-col justify-center px-[30px]  rounded-md  "
            >
              <div className="flex items-center justify-between  ">
                {User?.image && (
                  <Image
                    src={User?.image}
                    alt="none"
                    height={50}
                    width={50}
                    className=" h-[50px] w-[50px] rounded-[50%] ring-[8px] ring-rgba left-0 mt-[25px]  "
                  />
                )}
                <p className="mb-2 text-[20px] mt-[35px] font-[600] opacity-[0.7] ">
                  {" "}
                  Todo ID: {post._id}{" "}
                </p>
              </div>
              <div className="text-[18px] font-[600] mt-[25px] flex flex-col mx-auto  ">
                <p className="mb-2 opacity-[0.6] text-[26px] break-words  text-center  ">
                  {" "}
                  @Todo: {post.Todo}{" "}
                </p>
                <p className="mb-2 opacity-[0.6] text-[22px] text-center ">
                  {" "}
                  #Caption: {post.Caption}{" "}
                </p>
                <p className="mb-2 opacity-[0.5] mt-[15px] text-[16px] text-center ">
                  {" "}
                  Created At: {post.createdAt}{" "}
                </p>
                <p className="mb-2 opacity-[0.5] text-[16px] text-center ">
                  {" "}
                  Updated At: {post.updatedAt}{" "}
                </p>
              </div>
              <div className="flex gap-4 justify-around my-[25px] text-center">
                <button
                  className="h-[50px] w-[120px] bg-blue-600 text-white uppercase rounded-sm text-[16px] opacity-[0.7] border-2 border-transparent hover:border-white hover:bg-transparent transition delay-150 "
                  onClick={() => handleEdit(post._id, post.Todo, post.Caption)}
                >
                  edit
                </button>
                <button
                  className="h-[50px] w-[120px] bg-red-600 text-white uppercase rounded-sm text-[16px] opacity-[0.7] border-2 border-transparent hover:border-white hover:bg-transparent transition delay-150 "
                  onClick={() => handleDelete(post._id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
