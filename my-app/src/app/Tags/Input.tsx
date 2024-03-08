import React, { ChangeEventHandler } from "react";
interface InputProps {
  Type: string;
  Style: string;
  Placeholder: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string| undefined ;
  accept?: string;
  id?: string;
}
const Input: React.FC<InputProps> = ({
  Type,
  Style,
  Placeholder,
  onChange,
  name,
  value,
  accept,
  id
}) => {
  return (
    <>
      <input
        type={Type}
        className={Style}
        placeholder={Placeholder}
        onChange={onChange}
        name={name}
        value={value as string}
        accept={accept}
      />
    </>
  );
};

export default Input;
