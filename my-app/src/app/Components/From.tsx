"use client";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcAddImage } from "react-icons/fc";
import Image from "next/image";
import Email from "next-auth/providers/email";

type JSXElementConstructor<P> = (props: P) => ReactElement<any, any> | null;
interface From {
  InputComponent: ReactElement<any, string | JSXElementConstructor<any>>[];
  ButtonComponent: ReactElement;
  LinkComponent: ReactElement;
  enctype: string;
  Data: {
    name?: string;
    email: string;
    password: string;
  };
  file?: string;
}
const From: React.FC<From> = ({
  InputComponent,
  ButtonComponent,
  LinkComponent,
  Data,
  enctype,
  file,
}) => {
  const [Hide, setHide] = useState(false);
  const [Type, setType] = useState("password");
  const [PathName, setPathName] = useState("");
  const [login, Setlogin] = useState("");
  const [Error, setError] = useState({
    name: "",
    email: "",
    password: "",
    Credentials: "",
    image: "",
  });

  const router = useRouter();

  // extracting current path from window location
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  // checking pathname for making conditinal button disable
  useEffect(() => {
    if (PathName === "/login") {
      Setlogin("!empty");
    } else {
      Setlogin("");
    }
  }, [PathName]);

  const handleShow = () => {
    setHide(!Hide);
    if (Type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "post",
        url: login ? "api/Login" : "api/Auth/",
        data: {
          email: Data.email,
          password: Data.password,
          ...(login ? {} : { image: file, name: Data.name }),
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          if (res.status === 200) {
            router.push(`/profile/${res.data.id}`);
          }
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            if (
              err.response &&
              err.response.data &&
              err.response.data.Error === "111"
              // error 111 means invalid email signature
            ) {
              setError({
                name: "",
                email: "invalid email signature",
                password: "",
                Credentials: "",
                image: "",
              });
            }
            if (
              err.response &&
              err.response.data &&
              err.response.data.Error === "000"
              // error 000 means invalid password signature
            ) {
              setError({
                name: "",
                email: "",
                password: "invalid password signature ",
                Credentials: "",
                image: "",
              });
            }
            if (
              err.response &&
              err.response.data &&
              err.response.data.Error === "222"
              // error 222 means invalid credentials
            ) {
              setError({
                name: "",
                email: "",
                password: "",
                Credentials: "invalid credentials",
                image: "",
              });
            }
            if (
              err.response &&
              err.response.data &&
              err.response.data.Error === "333"
              // error 333 means invalid name signature
            ) {
              setError({
                name: "invalid name signature ",
                email: "",
                password: "",
                Credentials: "",
                image: "",
              });
            }
            if (
              err.response &&
              err.response.data &&
              err.response.data.Error === "888"
              // error 888 means invalid image signature
            ) {
              setError({
                name: "",
                email: "",
                password: "",
                Credentials: "",
                image: "please provide a valid image ",
              });
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className=" relative h-[100vh] w-[100vw]  flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          encType={enctype}
          method="post"
          action={!login ? "api/Auth" : "api/Login"}
          className=" flex flex-col items-center justify-center h-[600px] w-[500px] bg-rgba shadow-2xl absolute gap-5 rounded-[25px] font-nunito "
        >
          {login ? (
            <FaUser className="h-[80px] w-[50px] text-black_rgba hover:text-[rgba(43,171,150,0.5)] transition delay-150 " />
          ) : (
            <FcAddImage className="h-[80px] w-[180px] text-black_rgba hover:text-[rgba(43,171,150,0.5)] transition delay-150 opacity-[0.5] " />
          )}
          {Error.image && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.image}{" "}
            </p>
          )}
          <div className="  h-[70px] w-[70px] absolute top-0 left-0 mt-[60px] ml-[215px] bg-red  ">
            {InputComponent[3]}
          </div>
          <h1 className=" text-black text-[28px] capitalize opacity-[0.6]  ">
            {" "}
            {Data.name && Data.email && Data.password
              ? "register"
              : "Enter credentials "}
          </h1>
          {InputComponent[0]}
          {Error.name && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.name}{" "}
            </p>
          )}
          {InputComponent[2]}
          {Error.email && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.email}{" "}
            </p>
          )}
          {Error.Credentials && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.Credentials}{" "}
            </p>
          )}

          <div className=" flex h-[50px] w-[300px] relative justify-center  ">
            {React.cloneElement(InputComponent[1], { Type: Type })}
            {Hide ? (
              <AiFillEye
                className="text-[28px] absolute right-0 flex   mt-[25px] translate-y-[-50%] mr-[15px] opacity-[0.7]   "
                onClick={handleShow}
              />
            ) : (
              <AiFillEyeInvisible
                className="text-[28px] absolute right-0 flex   mt-[25px] translate-y-[-50%] mr-[15px] opacity-[0.7]   "
                onClick={handleShow}
              />
            )}
          </div>
          {Error.password && (
            <p className="text-[19px] capitalize text-red-800 font-[600]   ">
              {" "}
              {Error.password}{" "}
            </p>
          )}
          {Error.Credentials && (
            <p className="text-[19px] capitalize text-red-800 font-[600]  ">
              {" "}
              {Error.Credentials}{" "}
            </p>
          )}
          {/* in this condition if user is in login route . then don't need any name . but if he is in any other route like is he is in register route he definitely need to fill the name space  */}
          {(login && Data.email && Data.password) ||
          (!login && Data.name && Data.email && Data.password && file ) ? (
            ButtonComponent
          ) : (
            <button
              className=" h-[60px] w-[180px] bg-black_rgba border-2 border-transparent text-black mt-[20px] hover:bg-transparent hover:border-black hover:border-2 rounded-[15px] opacity-[0.7] font-[400] capitalize text-[18px] "
              disabled
            >
              disabled
            </button>
          )}
          {LinkComponent}
        </form>
      </div>
    </>
  );
};

export default From;
