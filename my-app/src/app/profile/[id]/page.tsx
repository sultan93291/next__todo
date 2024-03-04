"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";

interface Post {
  Caption: string;
  Todo: string;
  _id: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
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
    router.push(`/updatetodo/${todoId}?todo=${todo}&caption=${caption}`);
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
        setData(response.data);
      } catch (e) {}
    };

    FetchPost();
  }, [id, handleDelete]);

  return (
    <div className="py-[50px] px-[60px]">
      <button onClick={handleCreate}>create todo</button>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
