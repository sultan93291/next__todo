"use client";

import Link from "next/link";
import From from "./Components/From";
import { useState, useEffect } from "react";
import Input from "./Tags/Input";

export default function Home() {
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Image, setImage] = useState(undefined);
  const [buffer, setbuffer] = useState("");
  const handleForm = (e: any) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const newValue = files[0];
      setImage(newValue);
    }

    setData(prevData => ({ ...prevData, [name]: value }));
  };

  if (Image) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (result !== null) {
        setbuffer(result as string);
      }
    };
    reader.readAsDataURL(Image as Blob);
  }
  // Ensure Image is defined and not undefined

  return (
    <>
      <From
        Data={Data}
        file={buffer}
        enctype="multipart/form-data"
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
          <Input
            key={"input4"}
            id="fileInput"
            Type="file"
            name="image"
            accept="image/*"
            onChange={handleForm}
            Placeholder=""
            Style="h-[100%] w-[100%] opacity-0 "
            value={""}
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
