"use client";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type JSXElementConstructor<P> = (props: P) => ReactElement<any, any> | null;
interface From {
  InputComponent: ReactElement<any, string | JSXElementConstructor<any>>[];
  ButtonComponent: ReactElement;
  LinkComponent: ReactElement;
  Data: {
    name?: string;
    email: string;
    password: string;
  };
}
const From: React.FC<From> = ({
  InputComponent,
  ButtonComponent,
  LinkComponent,
  Data,
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
      const res = axios({
        method: "post",
        url: login ? "api/Login" : "api/Auth/",
        data: {
          ...(login ? {} : { name: Data.name }),
          email: Data.email,
          password: Data.password,
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
              });
            }
          }
        });
    } catch (err) {}
  };

  return (
    <>
      <div className=" relative h-[100vh] w-[100vw]  flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center justify-center h-[600px] w-[500px] bg-rgba shadow-2xl absolute gap-5 rounded-[25px] font-nunito "
        >
          <FaUser className="h-[80px] w-[180px] text-black_rgba hover:text-[rgba(43,171,150,0.5)] transition delay-150 " />
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
          (!login && Data.name && Data.email && Data.password) ? (
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
