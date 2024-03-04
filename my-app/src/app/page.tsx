"use client";

import Link from "next/link";
import From from "./Components/From";
import { useState } from "react";
import Input from "./Tags/Input";

export default function Home() {
  const [Data, setData] = useState({
    name: "",
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
          <Link className="text-[18px]  opacity-[0.7] " href={"/login"}>
            {" "}
            Already have a account login{" "}
          </Link>
        }
        InputComponent={[
          <Input
            key={"input1"}
            Type="text"
            name="name"
            onChange={handleForm}
            Placeholder="Enter Your Name"
            Style="h-[50px] w-[300px] pl-[30px] pr-[50px] border-none outline-none rounded-[15px] bg-rgba text-black placeholder:text-black text-[20px] font-[500] opacity-[0.7]"
            value={Data.name}
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
          <Input
            key={"input3"}
            Type="email"
            name="email"
            onChange={handleForm}
            Placeholder="Enter Your email "
            Style=" pl-[30px] pr-[50px] border-none outline-none rounded-[15px] bg-rgba text-black placeholder:text-black h-[50px] w-[300px] text-[20px] font-[500] opacity-[0.7] "
            value={Data.email}
          />,
        ]}
        ButtonComponent={
          <button
            type="submit"
            className=" h-[60px] w-[180px] bg-black_rgba border-2 border-transparent text-black mt-[20px] hover:bg-transparent hover:border-black hover:border-2 rounded-[15px] opacity-[0.7] font-[400] capitalize text-[18px] "
          >
            Register
          </button>
        }
      />
    </>
  );
}
