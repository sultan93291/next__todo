"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";
import Image from "next/image";

interface Post {
  Caption: string;
  Todo: string;
  _id: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  image: string;
  ProfileCreatedAt: string;
  email: string;
}

const Page = () => {
  const { id } = useParams();
  const [Data, setData] = useState<Post[]>([]);
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

  // extracting user info
  let firstPost;
  if (Data.length > 0) {
    firstPost = Data[0];
    console.log(firstPost);
  }

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
        setData(response.data);
      } catch (e) {}
    };

    FetchPost();
  }, [id, handleDelete]);

  return (
    <div className="py-[50px] px-[60px]">
      <div className="h-[450px] w-[auto] bg-rgba rounded-md    flex items-center px-[50px] ">
        {firstPost?.image && (
          <Image
            src={firstPost.image}
            alt="none"
            height={300}
            width={300}
            className="rounded-[50%] ring-8 ring-black_rgba ml-5 "
          />
        )}
        <div className="flex flex-col">
          <button onClick={handleCreate}>create todo</button>
          <p> {firstPost?.ProfileCreatedAt} </p>
          <p> {firstPost?.UserId} </p>
          <p> {firstPost?.username} </p>
          <p> {firstPost?.email} </p>
        </div>
      </div>
      <div className="flex  gap-4 py-[50px] px-[60px]  justify-center  flex-wrap ">
        {Data.map((post, index) => (
          <div
            key={index}
            className="bg-rgba h-auto w-[400px]  flex flex-col justify-center items-center py-4 rounded-md flex-wrap-reverse "
          >
            <p className="mb-2"> Caption: {post.Caption} </p>
            <p className="mb-2"> Todo: {post.Todo} </p>
            <p className="mb-2"> Todo ID: {post._id} </p>
            <p className="mb-2"> UserID: {post.UserId} </p>
            <p className="mb-2"> Created At: {post.createdAt} </p>
            <p className="mb-2"> Updated At: {post.updatedAt} </p>
            <div className="flex gap-4 ">
              <button
                onClick={() => handleEdit(post._id, post.Todo, post.Caption)}
              >
                edit
              </button>
              <button onClick={() => handleDelete(post._id)}>delete</button>
              {post.image && (
                <Image
                  src={post.image}
                  alt="none"
                  height={100}
                  width={100}
                  className="rounded-[50%]"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
