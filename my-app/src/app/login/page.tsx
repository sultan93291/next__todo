"use client";

import Link from "next/link";
import { useState } from "react";
import React from "react";
import Input from "../Tags/Input";
import From from "../Components/From";

const Page = () => {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <From
        Data={Data}
        LinkComponent={
          <Link className="text-[18px]  opacity-[0.7] " href={"/"}>
            {"Don't have a account signup"}
          </Link>
        }
        InputComponent={[
          <Input
            key={"input3"}
            Type="email"
            name="email"
            onChange={handleForm}
            Placeholder="Enter Your email "
            Style=" pl-[30px] pr-[50px] border-none outline-none rounded-[15px] bg-rgba text-black placeholder:text-black h-[50px] w-[300px] text-[20px] font-[500] opacity-[0.7] "
            value={Data.email}
          />,
          <Input
            key={"input2"}
            Type="password"
            name="password"
            onChange={handleForm}
            Placeholder="Enter Your password"
            Style=" h-[100%] w-[100%] pl-[30px] pr-[50px] border-none outline-none rounded-[15px] bg-rgba text-black placeholder:text-black relative text-[20px] font-[500] opacity-[0.7] "
            value={Data.password}
          />,
        ]}
        ButtonComponent={
          <button
            type="submit"
            className=" h-[60px] w-[180px] bg-black_rgba border-2 border-transparent text-black mt-[20px] hover:bg-transparent hover:border-black hover:border-2 rounded-[15px] opacity-[0.7] font-[400] capitalize text-[18px] "
          >
            Login
          </button>
        }
      />
    </>
  );
};

export default Page;
